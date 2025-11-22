import React from 'react';
import './resize-handle.less';
interface ResizeHandleProps {
    onResize: (deltaX: number) => void;
    prefixCls: string;
}
declare const ResizeHandle: React.FC<ResizeHandleProps>;
export default ResizeHandle;
