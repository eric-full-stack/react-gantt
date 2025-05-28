import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import Context from '../../context'
import './index.less'

const CustomEvents: React.FC = () => {
  const { store, prefixCls, onCustomEventClick } = useContext(Context)
  const { customEvents, sightConfig, getTranslateXByDate } = store
  const minorList = store.getMinorList()
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

  // Só renderiza eventos se estivermos na visualização de dias
  if (sightConfig.type !== 'day') 
    return null
  

  return (
    <div className={`${prefixCls}-custom-events`}>
      {minorList.map((item) => {
        // Verifica se existe um evento customizado para este dia
        const customEvent = customEvents.find(event => event.key === item.key.split(' ')[0])
        if (!customEvent) return null

        return (
          <div
            key={item.key}
            className={`${prefixCls}-custom-event`}
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
                  top: Math.max(0, mouseY - 15)
                }}
              >
                <span className={`${prefixCls}-custom-event_title`}>
                  {customEvent.content || 'Evento'}
                </span>
              </div>
            )}
            <div className={`${prefixCls}-custom-event_line`} style={{
              height: store.bodyScrollHeight,
            }}/>
          </div>
        )
      })}
    </div>
  )
}
export default observer(CustomEvents)
