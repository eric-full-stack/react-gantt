import React, { useCallback, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import classNames from 'classnames'
import DragResize from '../drag-resize'
import Context from '../../context'

import './index.less'

const TimeAxis: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const prefixClsTimeAxis = `${prefixCls}-time-axis`
  const { sightConfig, isToday, customEvents } = store
  const majorList = store.getMajorList()
  const minorList = store.getMinorList()
  const handleResize = useCallback(
    ({ x }) => {
      store.handlePanMove(-x, -store.translateY)
    },
    [store]
  )
  const handleLeftResizeEnd = useCallback(() => {
    store.handlePanEnd()
  }, [store])

  const getIsToday = useCallback(
    item => {
      const { key } = item
      const { type } = sightConfig
      return type === 'day' && isToday(key)
    },
    [sightConfig, isToday]
  )

  const getIsCustomEvent = useCallback(
    item => {
      const { key } = item
      const date = key.split(' ')[0]
      const { type } = sightConfig
      return type === 'day' && customEvents.some(event => event.date === date)
    },
    [sightConfig, customEvents]
  )

  const isDayView = sightConfig.type === 'day'

  const renderLabel = (item) => {
    if (isDayView) {
      // For day view with <br/> in label, extract day of week and day number
      const parts = item.label.split('<br/>')
      const dayOfWeek = parts[0]
      const dayNumber = parts[1]

      return (
        <div 
          className={classNames(`${prefixClsTimeAxis}-minor-label`, {
            [`${prefixClsTimeAxis}-today`]: getIsToday(item),
            [`${prefixClsTimeAxis}-custom-event`]: getIsCustomEvent(item),
            'day-view': isDayView,
          })}
          data-day-of-week={dayOfWeek}
          data-day-number={dayNumber}
        />
      )
    } 
    
    return (
      <div
        className={classNames(`${prefixClsTimeAxis}-minor-label`, {
          [`${prefixClsTimeAxis}-today`]: getIsToday(item),
          [`${prefixClsTimeAxis}-custom-event`]: getIsCustomEvent(item),
          'day-view': isDayView,
        })}
      >
        {item.label}
      </div>
    )
  }

  return (
    <DragResize
      onResize={handleResize}
      onResizeEnd={handleLeftResizeEnd}
      defaultSize={{
        x: -store.translateX,
        y: -store.translateY,
        width: 0,
        height: 0,
      }}
      type='move'
    >
      <div
        className={prefixClsTimeAxis}
        style={{
          left: store.tableWidth,
          width: store.viewWidth,
        }}
      >
        <div
          className={`${prefixClsTimeAxis}-render-chunk`}
          style={{
            transform: `translateX(-${store.translateX}px`,
          }}
        >
          {majorList.map(item => (
            <div key={item.key} className={`${prefixClsTimeAxis}-major`} style={{ width: item.width, left: item.left }}>
              <div className={`${prefixClsTimeAxis}-major-label`}>{item.label}</div>
            </div>
          ))}
          {minorList.map(item => (
            <div
              key={item.key}
              className={classNames(`${prefixClsTimeAxis}-minor`)}
              style={{ width: item.width, left: item.left }}
            >
              {renderLabel(item)}
            </div>
          ))}
        </div>
      </div>
    </DragResize>
  )
}
export default observer(TimeAxis)
