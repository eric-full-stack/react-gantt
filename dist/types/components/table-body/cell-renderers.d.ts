import React from 'react';
import type { Gantt, DefaultRecordType } from '../../types';
interface CellRendererProps<RecordType = DefaultRecordType> {
    value: any;
    record: Gantt.Record<RecordType>;
    column: Gantt.Column<RecordType>;
}
export declare const TextCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const DateCell: <RecordType extends DefaultRecordType>({ value, column, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const NumberCell: <RecordType extends DefaultRecordType>({ value, column, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const ProgressCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const StatusCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const PriorityCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const UserCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const TagsCell: <RecordType extends DefaultRecordType>({ value, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const CurrencyCell: <RecordType extends DefaultRecordType>({ value, column, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const CustomFieldCell: <RecordType extends DefaultRecordType>({ value, record, column, }: CellRendererProps<RecordType>) => React.JSX.Element;
export declare const renderCell: <RecordType extends DefaultRecordType>(value: any, record: Gantt.Record<RecordType>, column: Gantt.Column<RecordType>) => React.ReactNode;
export {};
