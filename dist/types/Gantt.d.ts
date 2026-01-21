import type { Dayjs } from 'dayjs';
import React from 'react';
import type { GanttContext } from './context';
import './Gantt.less';
import type { DefaultRecordType, Gantt, GanttLocale } from './types';
export interface GanttProps<RecordType = DefaultRecordType> {
    data: Gantt.Record<RecordType>[];
    columns: Gantt.Column[];
    renderCustomHeaderFilter?: GanttContext<RecordType>['renderCustomHeaderFilter'];
    dependencies?: Gantt.Dependence[];
    isTimeline?: boolean;
    workdays?: 'business_days' | 'all_days';
    durationFn?: (startDate: string, endDate: string) => number;
    onUpdate: Gantt.UpdateCallback<RecordType>;
    startDateKey?: string;
    endDateKey?: string;
    isRestDay?: (date: string) => boolean;
    customEvents?: Gantt.CustomEvent[];
    onCustomEventClick?: (event: Gantt.CustomEvent) => void;
    unit?: Gantt.Sight;
    rowHeight?: number;
    innerRef?: React.MutableRefObject<GanttRef>;
    getBarColor?: GanttContext<RecordType>['getBarColor'];
    showBackToday?: GanttContext<RecordType>['showBackToday'];
    showUnitSwitch?: GanttContext<RecordType>['showUnitSwitch'];
    onRow?: GanttContext<RecordType>['onRow'];
    tableIndent?: GanttContext<RecordType>['tableIndent'];
    expandIcon?: GanttContext<RecordType>['expandIcon'];
    renderBar?: GanttContext<RecordType>['renderBar'];
    renderGroupBar?: GanttContext<RecordType>['renderGroupBar'];
    renderInvalidBar?: GanttContext<RecordType>['renderInvalidBar'];
    renderBarThumb?: GanttContext<RecordType>['renderBarThumb'];
    onBarClick?: GanttContext<RecordType>['onBarClick'];
    tableCollapseAble?: GanttContext<RecordType>['tableCollapseAble'];
    scrollTop?: GanttContext<RecordType>['scrollTop'];
    disabled?: boolean;
    alwaysShowTaskBar?: boolean;
    renderLeftText?: GanttContext<RecordType>['renderLeftText'];
    renderRightText?: GanttContext<RecordType>['renderLeftText'];
    onExpand?: GanttContext<RecordType>['onExpand'];
    /**
     * 自定义日期筛选维度
     */
    customSights?: Gantt.SightConfig[];
    locale?: GanttLocale;
    /**
     * 隐藏左侧表格
     */
    hideTable?: boolean;
    /**
     * Configuração de colunas (visibilidade, ordem, larguras)
     */
    columnConfig?: Gantt.ColumnConfig;
    /**
     * Lista de campos customizados disponíveis
     */
    customFields?: Gantt.CustomField[];
    /**
     * Largura inicial da tabela lateral
     */
    tableWidth?: number;
}
export interface GanttRef {
    backToday: () => void;
    getWidthByDate: (startDate: Dayjs, endDate: Dayjs) => number;
}
declare const GanttComponent: <RecordType extends DefaultRecordType>(props: GanttProps<RecordType>) => JSX.Element;
export default GanttComponent;
