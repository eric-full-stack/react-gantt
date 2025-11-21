import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../../context';
import './index.less';

const TableHeader: React.FC = () => {
  const { store, prefixCls, renderCustomHeaderFilter } = useContext(Context);
  const { tableWidth } = store;
  const columns = store.getVisibleColumns;
  const width = tableWidth;
  const columnsWidth = store.getColumnsWidth;
  const prefixClsTableHeader = `${prefixCls}-table-header`;
  return (
    <div className={prefixClsTableHeader} style={{ width, height: 56 }}>
      <div
        className={`${prefixClsTableHeader}-head`}
        style={{ width, height: 56 }}
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
                ...column.style,
              }}
            >
              <div className={`${prefixClsTableHeader}-head-cell`}>
                <span className={`${prefixClsTableHeader}-ellipsis`}>
                  {column.icon && (
                    <span style={{ marginRight: 4, display: 'inline-flex', alignItems: 'center' }}>
                      {column.icon}
                    </span>
                  )}
                  {column.label}
                </span>
              </div>
            </div>
          ))}
          { renderCustomHeaderFilter ? renderCustomHeaderFilter() : null}
        </div>
      </div>
    </div>
  );
};
export default observer(TableHeader);
