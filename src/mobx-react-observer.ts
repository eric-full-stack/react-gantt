/**
 * React-19-safe replacement for mobx-react-lite@1.5.2's `observer`.
 *
 * The legacy mobx-react-lite (peer: `react ^16.8`) drives re-renders with a
 * useState-based forceUpdate that loops ("Maximum update depth exceeded")
 * under React 19. This implementation instead subscribes through React 18+'s
 * `useSyncExternalStore` with a snapshot that is stable between renders and
 * only changes when a tracked observable changes — which is loop-proof and
 * tearing-safe.
 *
 * It relies solely on mobx 4's public `Reaction` API (`new Reaction`, `.track`,
 * `.dispose`), so the existing mobx@4 store needs no changes.
 */
import { Reaction } from 'mobx'
import * as React from 'react'

const { useRef, useCallback, useState, useEffect, useLayoutEffect } = React

type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
) => T

/**
 * Backport of `useSyncExternalStore` for React < 18 (e.g. the React 17 host
 * used by the dumi docs site). This is the non-concurrent shim shipped by
 * React itself: it forces an update only when the snapshot actually changed
 * (`Object.is`), so it preserves the loop-proof guarantee this observer relies
 * on. React 18/19 hosts use the built-in implementation instead.
 */
const useSyncExternalStoreShim: UseSyncExternalStore = (subscribe, getSnapshot) => {
  const value = getSnapshot()
  const [{ inst }, forceUpdate] = useState({ inst: { value, getSnapshot } })

  useLayoutEffect(() => {
    inst.value = value
    inst.getSnapshot = getSnapshot
    if (checkIfSnapshotChanged(inst)) forceUpdate({ inst })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe, value, getSnapshot])

  useEffect(() => {
    if (checkIfSnapshotChanged(inst)) forceUpdate({ inst })
    const handleStoreChange = () => {
      if (checkIfSnapshotChanged(inst)) forceUpdate({ inst })
    }
    return subscribe(handleStoreChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscribe])

  return value
}

function checkIfSnapshotChanged<T>(inst: { value: T; getSnapshot: () => T }): boolean {
  const prevValue = inst.value
  try {
    const nextValue = inst.getSnapshot()
    return !Object.is(prevValue, nextValue)
  } catch {
    return true
  }
}

// Prefer React 18+'s native hook; fall back to the shim on React 17.
const useSyncExternalStore: UseSyncExternalStore =
  (React as any).useSyncExternalStore ?? useSyncExternalStoreShim

interface ObserverAdmin {
  reaction: Reaction | null
  onStoreChange: (() => void) | null
  stateVersion: unknown
  name: string
}

function createReaction(adm: ObserverAdmin): Reaction {
  return new Reaction(`observer(${adm.name})`, () => {
    // A tracked observable changed: bump the snapshot and tell React to
    // re-render. Reading observables during render never bumps this, so the
    // snapshot stays stable between renders => no update-depth loop.
    adm.stateVersion = Symbol()
    if (adm.onStoreChange) adm.onStoreChange()
  })
}

export function observer<P extends object>(baseComponent: React.FC<P>): React.FC<P> {
  const baseName = baseComponent.displayName || baseComponent.name || 'Component'

  const ObserverComponent: React.FC<P> = props => {
    const admRef = useRef<ObserverAdmin | null>(null)
    if (!admRef.current) {
      admRef.current = { reaction: null, onStoreChange: null, stateVersion: Symbol(), name: baseName }
    }
    const adm = admRef.current

    const subscribe = useCallback(
      (onStoreChange: () => void) => {
        // The reaction may have been disposed by a previous commit's cleanup
        // (or never created if a prior render was abandoned) — recreate it.
        if (!adm.reaction) {
          adm.reaction = createReaction(adm)
          // An observable may have changed between render and subscribe.
          adm.stateVersion = Symbol()
        }
        adm.onStoreChange = onStoreChange

        return () => {
          adm.onStoreChange = null
          if (adm.reaction) {
            adm.reaction.dispose()
            adm.reaction = null
          }
        }
      },
      [adm]
    )

    const getSnapshot = useCallback(() => adm.stateVersion, [adm])

    useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

    // Ensure a live reaction exists to track this render.
    if (!adm.reaction) adm.reaction = createReaction(adm)

    let rendering: any = null
    let exception: unknown
    adm.reaction.track(() => {
      try {
        rendering = baseComponent(props)
      } catch (error) {
        exception = error
      }
    })
    if (exception) throw exception

    return rendering
  }

  ObserverComponent.displayName = `observer(${baseName})`

  return React.memo(ObserverComponent) as unknown as React.FC<P>
}

export default observer
