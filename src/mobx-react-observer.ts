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

const { useRef, useCallback } = React

type UseSyncExternalStore = <T>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
) => T

// This package is built against @types/react@17 (which predates
// useSyncExternalStore) but always runs inside a React 18/19 host, so reach the
// hook through a cast to stay compatible with the older type definitions.
const useSyncExternalStore: UseSyncExternalStore = (React as any).useSyncExternalStore

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
