import React, { useState, useRef, useMemo, HTMLProps } from 'react';
import { createPortal } from 'react-dom';
import { usePersistFn } from 'ahooks';
import { observer } from 'mobx-react-lite';
import AutoScroller from './AutoScroller';

interface DragResizeProps extends Omit<HTMLProps<HTMLDivElement>, 'onResize'> {
  onResize: ({ width, x, y, height }: { width: number; x: number, y:number, height:number }) => void;
  /* 拖拽前的size */
  onResizeEnd?: ({ width, x, y, height }: { width: number; x: number, y:number, height:number }) => void;
  onBeforeResize?: () => void;
  minWidth?: number;
  type: 'left' | 'right' | 'move';
  grid?: number;
  scroller?: HTMLElement;
  defaultSize: {
    width: number;
    x: number;
    y:number;
    height:number
  };
  autoScroll?: boolean;
  onAutoScroll?: (delta: number) => void;
  reachEdge?: (position: 'left' | 'right') => boolean;
  /* 点击就算开始 */
  clickStart?: boolean;
  disabled?: boolean
}
const snap = (n: number, size: number): number => Math.round(n / size) * size;
const DragResize: React.FC<DragResizeProps> = ({
  type,
  onBeforeResize,
  onResize,
  onResizeEnd,
  minWidth = 0,
  grid,
  defaultSize: { x: defaultX, width: defaultWidth, y: defaultY, height: defaultHeight },
  scroller,
  autoScroll: enableAutoScroll = true,
  onAutoScroll,
  reachEdge = () => false,
  clickStart = false,
  children,
  disabled = false,
  ...otherProps
}) => {
  const [resizing, setResizing] = useState(false);
  const handleAutoScroll = usePersistFn((delta: number) => {
    updateSize();
    onAutoScroll(delta);
  });
  // TODO persist reachEdge
  const autoScroll = useMemo(
    () =>
      new AutoScroller({ scroller, onAutoScroll: handleAutoScroll, reachEdge }),
    [handleAutoScroll, scroller, reachEdge]
  );
  const positionRef = useRef({
    clientX: 0,
    clientY: 0,
    width: defaultWidth,
    height: defaultHeight,
    x: defaultX,
    y: defaultY,
  });
  const moveRef = useRef({
    clientX: 0,
    clientY: 0,
  });
  const updateSize = usePersistFn(() => {
    if (disabled) return
    const distance =
      moveRef.current.clientX -
      positionRef.current.clientX +
      autoScroll.autoScrollPos;
    const distanceY =
      moveRef.current.clientY -
      positionRef.current.clientY +
      autoScroll.autoScrollPos;
    switch (type) {
      case 'left': {
        let width = positionRef.current.width - distance;
        if (minWidth !== undefined) {
          width = Math.max(width, minWidth);
        }
        if (grid) {
          width = snap(width, grid);
        }
        const pos = width - positionRef.current.width;
        const x = positionRef.current.x - pos;
        onResize({ width, x, y: positionRef.current.y, height: positionRef.current.height });
        break;
      }
      // 向右，x不变，只变宽度
      case 'right': {
        let width = positionRef.current.width + distance;
        if (minWidth !== undefined) {
          width = Math.max(width, minWidth);
        }
        if (grid) {
          width = snap(width, grid);
        }
        const { x } = positionRef.current;
        onResize({ width, x, y: positionRef.current.y, height: positionRef.current.height });
        break;
      }
      case 'move': {
        const { width, height } = positionRef.current;
        let rightDistance = distance;
        if (grid) {
          rightDistance = snap(distance, grid);
        }
        const x = positionRef.current.x + rightDistance;
        const y = positionRef.current.y + distanceY;
        onResize({ width, x, y, height });
        break;
      }
    }
  });
  const handleMouseMove = usePersistFn((event: MouseEvent) => {
    if (disabled) return
    if (!resizing) {
      setResizing(true);
      if (!clickStart) {
        onBeforeResize && onBeforeResize();
      }
    }
    moveRef.current.clientX = event.clientX;
    moveRef.current.clientY = event.clientY;
    updateSize();
  });

  const handleMouseUp = usePersistFn(() => {
    if (disabled) return
    autoScroll.stop();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    if (resizing) {
      setResizing(false);
      onResizeEnd &&
        onResizeEnd({
          x: positionRef.current.x,
          width: positionRef.current.width,
          y: positionRef.current.y,
          height: positionRef.current.height,
        });
    }
  });
  const handleMouseDown = usePersistFn(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (disabled) return
      event.stopPropagation();
      if (enableAutoScroll && scroller) {
        autoScroll.start();
      }
      if (clickStart) {
        onBeforeResize && onBeforeResize();
        setResizing(true);
      }
      positionRef.current.clientX = event.clientX;
      positionRef.current.clientY = event.clientY;
      positionRef.current.x = defaultX;
      positionRef.current.y = defaultY;
      positionRef.current.width = defaultWidth;
      positionRef.current.height = defaultHeight;
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  );

  return (
    <div role="none" onMouseDown={handleMouseDown} {...otherProps}>
      {resizing &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: 9999,
              cursor: disabled ? 'not-allowed':'col-resize',
            }}
          />,
          document.body
        )}
      {children}
    </div>
  );
};
export default observer(DragResize);
