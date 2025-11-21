import { useSize } from 'ahooks'
import type { Dayjs } from 'dayjs'
import React, { useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react'
import Chart from './components/chart'
import Divider from './components/divider'
import ScrollBar from './components/scroll-bar'
import ScrollTop from './components/scroll-top'
import SelectionIndicator from './components/selection-indicator'
import TableBody from './components/table-body'
import TableHeader from './components/table-header'
import TimeAxis from './components/time-axis'
import TimeAxisScaleSelect from './components/time-axis-scale-select'
import TimeIndicator from './components/time-indicator'
import { BAR_HEIGHT, ROW_HEIGHT, TABLE_INDENT } from './constants'
import type { GanttContext } from './context'
import Context from './context'
import './Gantt.less'
import { ptBR } from './locales'
import GanttStore from './store'
import type { DefaultRecordType, Gantt } from './types'

const prefixCls = 'gantt'

const Body: React.FC = ({ children }) => {
  const { store } = useContext(Context)
  const reference = useRef<HTMLDivElement>(null)
  const size = useSize(reference)
  useEffect(() => {
    store.syncSize(size)
  }, [size, store])
  return (
    <div className={`${prefixCls}-body`} ref={reference}>
      {children}
    </div>
  )
}
export interface GanttProps<RecordType = DefaultRecordType> {
  data: Gantt.Record<RecordType>[]
  columns: Gantt.Column[]
  renderCustomHeaderFilter?: GanttContext<RecordType>['renderCustomHeaderFilter']
  dependencies?: Gantt.Dependence[]
  isTimeline?: boolean
  workdays?: 'business_days' | 'all_days'
  durationFn?: (startDate: string, endDate: string) => number
  onUpdate: (record: Gantt.Record<RecordType>, startDate: string, endDate: string) => Promise<boolean>
  startDateKey?: string
  endDateKey?: string
  isRestDay?: (date: string) => boolean
  customEvents?: Gantt.CustomEvent[]
  onCustomEventClick?: (event: Gantt.CustomEvent) => void
  unit?: Gantt.Sight
  rowHeight?: number
  innerRef?: React.MutableRefObject<GanttRef>
  getBarColor?: GanttContext<RecordType>['getBarColor']
  showBackToday?: GanttContext<RecordType>['showBackToday']
  showUnitSwitch?: GanttContext<RecordType>['showUnitSwitch']
  onRow?: GanttContext<RecordType>['onRow']
  tableIndent?: GanttContext<RecordType>['tableIndent']
  expandIcon?: GanttContext<RecordType>['expandIcon']
  renderBar?: GanttContext<RecordType>['renderBar']
  renderGroupBar?: GanttContext<RecordType>['renderGroupBar']
  renderInvalidBar?: GanttContext<RecordType>['renderInvalidBar']
  renderBarThumb?: GanttContext<RecordType>['renderBarThumb']
  onBarClick?: GanttContext<RecordType>['onBarClick']
  tableCollapseAble?: GanttContext<RecordType>['tableCollapseAble']
  scrollTop?: GanttContext<RecordType>['scrollTop']
  disabled?: boolean
  alwaysShowTaskBar?: boolean
  renderLeftText?: GanttContext<RecordType>['renderLeftText']
  renderRightText?: GanttContext<RecordType>['renderLeftText']
  onExpand?: GanttContext<RecordType>['onExpand']
  /**
   * 自定义日期筛选维度
   */
  customSights?: Gantt.SightConfig[]
  locale?: GanttLocale

  /**
   * 隐藏左侧表格
   */
  hideTable?: boolean

  /**
   * Configuração de colunas (visibilidade, ordem, larguras)
   */
  columnConfig?: Gantt.ColumnConfig

  /**
   * Lista de campos customizados disponíveis
   */
  customFields?: Gantt.CustomField[]
}
export interface GanttRef {
  backToday: () => void
  getWidthByDate: (startDate: Dayjs, endDate: Dayjs) => number
}

export interface GanttLocale {
  today: string
  day: string
  days: string
  week: string
  month: string
  quarter: string
  halfYear: string
  firstHalf: string
  secondHalf: string
  majorFormat: {
    day: string
    week: string
    month: string
    quarter: string
    halfYear: string
  }
  minorFormat: {
    day: string
    week: string
    month: string
    quarter: string
    halfYear: string
  }
}

export const defaultLocale: GanttLocale = { ...ptBR }

const GanttComponent = <RecordType extends DefaultRecordType>(props: GanttProps<RecordType>) => {
  const {
    data,
    columns,
    dependencies = [],
    isTimeline,
    onUpdate,
    startDateKey = 'startDate',
    endDateKey = 'endDate',
    isRestDay,
    getBarColor,
    showBackToday = true,
    showUnitSwitch = true,
    unit,
    onRow,
    tableIndent = TABLE_INDENT,
    expandIcon,
    renderBar,
    renderInvalidBar,
    renderGroupBar,
    onBarClick,
    tableCollapseAble = true,
    renderBarThumb,
    scrollTop = true,
    rowHeight = ROW_HEIGHT,
    innerRef,
    disabled = false,
    alwaysShowTaskBar = true,
    renderLeftText,
    renderRightText,
    renderCustomHeaderFilter,
    onExpand,
    customSights = [],
    locale = { ...defaultLocale },
    hideTable = false,
    workdays = 'all_days',
    durationFn,
    customEvents = [],
    onCustomEventClick,
    columnConfig,
    customFields = [],
  } = props

  const store = useMemo(() => new GanttStore({ rowHeight, disabled, customSights, locale }), [rowHeight])
  useEffect(() => {
    store.setData(data, startDateKey, endDateKey)
  }, [data, endDateKey, startDateKey, store])

  useEffect(() => {
    store.setColumns(columns)
  }, [columns, store])

  useEffect(() => {
    store.setColumnConfig(columnConfig)
  }, [columnConfig, store])

  useEffect(() => {
    store.setCustomFields(customFields)
  }, [customFields, store])

  useEffect(() => {
    store.setCustomEvents(customEvents)
  }, [customEvents, store])

  useEffect(() => {
    store.setOnUpdate(onUpdate)
  }, [onUpdate, store])

  useEffect(() => {
    store.setDependencies(dependencies)
  }, [dependencies, store])

  useEffect(() => {
    store.setTimeline(isTimeline)
  }, [isTimeline, store])

  useEffect(() => {
    store.setWorkdays(workdays)
  }, [workdays, store])

  useEffect(() => {
    store.setDurationFn(durationFn)
  }, [durationFn, store])

  useEffect(() => {
    store.setHideTable(hideTable)
  }, [hideTable])

  useEffect(() => {
    if (isRestDay) store.setIsRestDay(isRestDay)
  }, [isRestDay, store])

  useEffect(() => {
    if (unit) store.switchSight(unit)
  }, [unit, store])

  useImperativeHandle(innerRef, () => ({
    backToday: () => store.scrollToToday(),
    getWidthByDate: store.getWidthByDate,
  }))

  const ContextValue = React.useMemo(
    () => ({
      prefixCls,
      store,
      getBarColor,
      showBackToday,
      showUnitSwitch,
      onRow,
      tableIndent,
      customEvents,
      expandIcon,
      renderBar,
      renderInvalidBar,
      renderGroupBar,
      onBarClick,
      tableCollapseAble,
      renderBarThumb,
      scrollTop,
      barHeight: BAR_HEIGHT,
      alwaysShowTaskBar,
      renderLeftText,
      renderRightText,
      renderCustomHeaderFilter,
      onExpand,
      hideTable,
      onCustomEventClick,
    }),
    [
      store,
      getBarColor,
      showBackToday,
      showUnitSwitch,
      onRow,
      tableIndent,
      customEvents,
      expandIcon,
      renderBar,
      renderInvalidBar,
      renderGroupBar,
      onBarClick,
      tableCollapseAble,
      renderBarThumb,
      scrollTop,
      alwaysShowTaskBar,
      renderLeftText,
      renderRightText,
      renderCustomHeaderFilter,
      onExpand,
      hideTable,
      onCustomEventClick,
    ]
  )

  return (
    <Context.Provider value={ContextValue}>
      <Body>
        <header>
          {!hideTable && <TableHeader />}
          <TimeAxis />
        </header>
        <main ref={store.mainElementRef}>
          <SelectionIndicator />
          {!hideTable && <TableBody />}
          <Chart />
        </main>
        {!hideTable && <Divider />}
        {showBackToday && <TimeIndicator />}
        {showUnitSwitch && <TimeAxisScaleSelect />}
        <ScrollBar />
        {scrollTop && <ScrollTop />}
      </Body>
    </Context.Provider>
  )
}
export default GanttComponent
