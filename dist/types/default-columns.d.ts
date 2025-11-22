import type { Gantt, DefaultRecordType } from './types';
export declare const createDefaultColumns: <RecordType extends DefaultRecordType>() => Gantt.Column<RecordType>[];
export declare const DEFAULT_VISIBLE_COLUMNS: string[];
export declare const DEFAULT_COLUMN_WIDTHS: Record<string, number>;
export declare const getVisibleColumns: <RecordType extends DefaultRecordType>(allColumns: Gantt.Column<RecordType>[], visibleColumnNames?: string[], columnOrder?: string[]) => Gantt.Column<RecordType>[];
export declare const applyColumnWidths: <RecordType extends DefaultRecordType>(columns: Gantt.Column<RecordType>[], customWidths?: Record<string, number>) => Gantt.Column<RecordType>[];
