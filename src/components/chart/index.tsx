import { observer } from 'mobx-react-lite'
import React, { memo, useCallback, useContext, useEffect } from 'react'
import Context from '../../context'
import BarList from '../bar-list'
import BarThumbList from '../bar-thumb-list'
import Dependencies from '../dependencies'
import DragPresent from '../drag-present'
import Today from '../today'
import CustomEvents from '../custom-events'
import DragResize from '../drag-resize'
import './index.less'

const Chart: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const { tableWidth, viewWidth, bodyScrollHeight, translateX, translateY, chartElementRef } = store

  const handleResize = useCallback(
    ({ x, y }) => {
      store.handlePanMove(-x, -y)
    },
    [store]
  )
  const handleResizeEnd = useCallback(() => {
    store.handlePanEnd()
  }, [store])
  const minorList = store.getMinorList()
  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.persist()
      store.handleMouseMove(event)
    },
    [store]
  )

  const handleMouseLeave = useCallback(() => {
    store.handleMouseLeave()
  }, [store])
  useEffect(() => {
    const element = chartElementRef.current
    if (element) element.addEventListener('wheel', store.handleWheel)

    return () => {
      if (element) element.removeEventListener('wheel', store.handleWheel)
    }
  }, [chartElementRef, store])
  return (
    <DragResize
      onResize={handleResize}
      onResizeEnd={handleResizeEnd}
      defaultSize={{
        x: -store.translateX,
        y: -store.translateY,
        width: 0,
        height: 0,
      }}
      type='move'
    >
      <div
        ref={chartElementRef}
        className={`${prefixCls}-chart`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          left: tableWidth,
          width: viewWidth,
          height: bodyScrollHeight,
        }}
      >
        <svg
          className={`${prefixCls}-chart-svg-renderer`}
          xmlns='http://www.w3.org/2000/svg'
          version='1.1'
          width={store.width}
          height={bodyScrollHeight}
          style={{
            transform: `translateX(-${translateX}px)`,
          }}
        >
          <defs>
            <pattern
              id='repeat'
              width='4.5'
              height='10'
              patternUnits='userSpaceOnUse'
              patternTransform='rotate(70 50 50)'
            >
              <line stroke='#c6c6c6' strokeWidth='1px' y2='10' />
            </pattern>
          </defs>
          {minorList.map(item =>
            item.isWeek ? (
              <g key={item.key} stroke='#f0f0f0'>
                <path d={`M${item.left},0 L${item.left},${bodyScrollHeight}`} />
                <rect
                  fill='url(#repeat)'
                  opacity='0.5'
                  strokeWidth='0'
                  x={item.left}
                  y={0}
                  width={item.width}
                  height={bodyScrollHeight}
                />
              </g>
            ) : (
              <g key={item.key} stroke='#f0f0f0'>
                <path d={`M${item.left},0 L${item.left},${bodyScrollHeight}`} />
              </g>
            )
          )}
          <DragPresent />
          <Dependencies />
        </svg>
        <div
          className={`${prefixCls}-render-chunk`}
          style={{
            height: bodyScrollHeight,
            transform: `translate(-${translateX}px, -${translateY}px)`,
          }}
        >
          <BarThumbList />
          <BarList />
          <Today />
          <CustomEvents />
        </div>
      </div>
    </DragResize>
  )
}
export default memo(observer(Chart))
