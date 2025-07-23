import { usePersistFn } from 'ahooks'
import { observer } from 'mobx-react-lite'
import React, { memo, useCallback, useContext, useRef, useState } from 'react'
import Context from '../../context'
import DragResize from '../drag-resize'
import './index.less'

const ScrollBar: React.FC = () => {
  const { store, prefixCls } = useContext(Context)
  const { tableWidth, viewWidth } = store
  const width = store.scrollBarWidth
  const prefixClsScrollBar = `${prefixCls}-scroll_bar`
  const handleResize = useCallback(
    ({ x }) => {
      store.setTranslateX(x * (store.scrollWidth / store.viewWidth))
    },
    [store]
  )
  return (
    <div
      role='none'
      className={prefixClsScrollBar}
      style={{ left: tableWidth, width: viewWidth }}
    >
      <DragResize
        className={`${prefixClsScrollBar}-thumb`}
        onResize={handleResize}
        defaultSize={{
          x: 0,
          width,
          y: 0,
          height: 0,
        }}
        style={{
          transform: `translateX(${store.scrollLeft}px)`,
        }}
        type='move'
      />
    </div>
  )
}
export default memo(observer(ScrollBar))
