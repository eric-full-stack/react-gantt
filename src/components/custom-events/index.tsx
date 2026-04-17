import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Context from '../../context'
import './index.less'

const CustomEvents: React.FC = () => {
  const { store, prefixCls, onCustomEventClick } = useContext(Context)
  const { customEvents } = store
  const getTranslateXByDate = store.getTranslateXByDate.bind(store)
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [mouseY, setMouseY] = useState(0)

  const handleEventClick = (event: any) => {
    if (onCustomEventClick)
      onCustomEventClick(event)

  }

  const handleMouseEnter = (eventKey: string) => {
    setHoveredEvent(eventKey)
  }

  const handleMouseLeave = () => {
    setHoveredEvent(null)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMouseY(e.clientY - rect.top - 25)
  }

  return (
    <div className={`${prefixCls}-custom-events`}>
      {customEvents.map((customEvent) => {
        const labelText = customEvent.eventType === 'deliverable' ? 'Entrega' : 'Milestone'
        const labelColor =
          customEvent.eventColor || (customEvent.eventType === 'deliverable' ? '#0d9488' : '#a83000')
        return (
          <div
            key={customEvent.key}
            className={
              `${prefixCls}-custom-event` +
              (customEvent.eventType ? ` gantt-custom-event--${customEvent.eventType}` : '')
            }
            data-event-type={customEvent.eventType || undefined}
            style={{
              transform: `translate(${getTranslateXByDate(customEvent.date)}px)`,
            }}
            onClick={() => handleEventClick(customEvent)}
            onMouseEnter={() => handleMouseEnter(customEvent.key)}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {hoveredEvent === customEvent.key && (
              <div
                className={`${prefixCls}-custom-event_flag`}
                style={{
                  top: Math.max(0, mouseY - 15),
                  background: customEvent.eventColor || undefined,
                  ['--event-color' as any]: customEvent.eventColor || undefined,
                }}
              >
                <span className={`${prefixCls}-custom-event_title`}>
                  {customEvent.content || 'Evento'}
                </span>
              </div>
            )}
            <div
              className={`${prefixCls}-custom-event_line`}
              style={{
                height: store.bodyScrollHeight,
                background: customEvent.eventColor || undefined,
              }}
            >
              {customEvent.showLabel && (
                <div
                  className={`${prefixCls}-custom-event_label`}
                  style={{
                    writingMode: 'vertical-rl',
                    textOrientation: 'mixed',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(180deg)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    opacity: 0.7,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    color: labelColor,
                    textTransform: 'uppercase',
                  }}
                >
                  {labelText}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default observer(CustomEvents)
