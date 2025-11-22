import React, { useCallback, useState } from 'react';
import './resize-handle.less';

interface ResizeHandleProps {
  onResize: (deltaX: number) => void;
  prefixCls: string;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({ onResize, prefixCls }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      const startX = e.clientX;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const deltaX = moveEvent.clientX - startX;
        onResize(deltaX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onResize]
  );

  return (
    <div
      className={`${prefixCls}-resize-handle ${isDragging ? `${prefixCls}-resize-handle-active` : ''}`}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ResizeHandle;
