import React, { useContext, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import ResizeHandle from './ResizeHandle';
import './index.less';
import './resize-handle.less';

const TableHeader: React.FC = () => {
  const { store, prefixCls, renderCustomHeaderFilter } = useContext(Context);
  const columns = store.getVisibleColumns;
  const columnsWidth = store.getColumnsWidth;
  const totalWidth = store.totalColumnWidth;
  const prefixClsTableHeader = `${prefixCls}-table-header`;

  const handleResize = useCallback(
    (columnName: string, initialWidth: number) => {
      return (deltaX: number) => {
        const newWidth = Math.max(initialWidth + deltaX, 50);
        store.setColumnWidth(columnName, newWidth);
      };
    },
    [store]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const tableBody = store.tableBodyRef.current
      if (tableBody && tableBody.scrollLeft !== e.currentTarget.scrollLeft)
        tableBody.scrollLeft = e.currentTarget.scrollLeft
    },
    [store]
  )

  return (
    <div
      ref={store.tableHeaderRef}
      className={prefixClsTableHeader}
      style={{ width: store.tableWidth }}
      onScroll={handleScroll}
    >
      <div
        className={`${prefixClsTableHeader}-head`}
        style={{ width: totalWidth, height: 56 }}
      >
        <div className={`${prefixClsTableHeader}-row`} style={{ height: 56 }}>
          {columns.map((column, index) => (
            <div
              key={column.name}
              className={`${prefixClsTableHeader}-cell`}
              style={{
                width: columnsWidth[index],
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
                textAlign: column.align ? column.align : 'left',
                paddingLeft: index === 0 ? 10 : 12,
                paddingRight: 12,
                height: 56,
                ...column.style,
              }}
            >
              <span className={`${prefixClsTableHeader}-ellipsis`}>
                {column.icon && (
                  <span style={{ marginRight: 4, display: 'inline-flex', alignItems: 'center' }}>
                    {column.icon}
                  </span>
                )}
                {column.label}
              </span>
              <ResizeHandle
                onResize={handleResize(column.name, columnsWidth[index])}
                prefixCls={prefixClsTableHeader}
              />
            </div>
          ))}
          { renderCustomHeaderFilter ? renderCustomHeaderFilter() : null}
        </div>
      </div>
    </div>
  );
};
export default observer(TableHeader);
