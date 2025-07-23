import React, { HTMLProps } from 'react';
interface DragResizeProps extends Omit<HTMLProps<HTMLDivElement>, 'onResize'> {
    onResize: ({ width, x, y, height }: {
        width: number;
        x: number;
        y: number;
        height: number;
    }) => void;
    onResizeEnd?: ({ width, x, y, height }: {
        width: number;
        x: number;
        y: number;
        height: number;
    }) => void;
    onBeforeResize?: () => void;
    minWidth?: number;
    type: 'left' | 'right' | 'move';
    grid?: number;
    scroller?: HTMLElement;
    defaultSize: {
        width: number;
        x: number;
        y: number;
        height: number;
    };
    autoScroll?: boolean;
    onAutoScroll?: (delta: number) => void;
    reachEdge?: (position: 'left' | 'right') => boolean;
    clickStart?: boolean;
    disabled?: boolean;
}
declare const _default: React.FunctionComponent<DragResizeProps>;
export default _default;
