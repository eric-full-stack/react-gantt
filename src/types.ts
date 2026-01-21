import type { Dayjs } from 'dayjs'
import type React from 'react'

export type DefaultRecordType = Record<string, any>
type NativeRecord<K extends keyof any, T> = Record<K, T>
export namespace Gantt {
  export interface CustomEvent {
    key: string
    date: string
    content: string
  }
  export interface Major {
    width: number
    left: number
    label: string
    key: string
  }
  export interface MajorAmp {
    label: string
    startDate: Dayjs
    endDate: Dayjs
  }
  export interface Minor {
    width: number
    left: number
    label: string
    isWeek: boolean
    key: string
  }
  export interface MinorAmp {
    label: string
    startDate: Dayjs
    endDate: Dayjs
  }
  export type Sight = 'day' | 'week' | 'month' | 'quarter' | 'halfYear'
  export type MoveType = 'left' | 'right' | 'move' | 'create'

  export enum ESightValues {
    day = 2880,
    week = 3600,
    month = 14400,
    quarter = 86400,
    halfYear = 115200,
  }

  export interface SightConfig {
    type: Sight
    label: string
    value: ESightValues
  }
  export interface Bar<RecordType = DefaultRecordType> {
    key: React.Key
    label: string
    width: number
    translateX: number
    translateY: number
    stepGesture: string
    invalidDateRange: boolean
    dateTextFormat: (startX: number) => string
    getDateWidth: (startX: number, endX: number) => string
    task: Item<RecordType>
    record: Record<RecordType>
    loading: boolean
    _group?: boolean
    _collapsed: boolean
    _depth: number
    _index?: number
    _childrenCount: number
    _parent?: Item<RecordType>
  }
  export interface Item<RecordType = DefaultRecordType> {
    id?: string
    record: Record<RecordType>
    key: React.Key
    startDate: string | null
    endDate: string | null
    content: string
    collapsed: boolean
    group?: boolean
    children?: Item<RecordType>[]
    children_hidden?: Item<RecordType>[]
    parentId?: string
    _parent?: Item<RecordType>
    _bar?: Bar<RecordType>
    _depth?: number
    _index?: number
  }

  export type Record<RecordType = DefaultRecordType> = RecordType & {
    group?: boolean
    borderColor?: string
    backgroundColor?: string
    collapsed?: boolean
    children?: Record<RecordType>[]
    disabled?: boolean
    /** Se true, a barra do grupo usa suas próprias datas em vez de calcular baseado nos filhos */
    fixedDates?: boolean
  }

  export type ColumnAlign = 'center' | 'right' | 'left'

  export type ColumnType =
    | 'text'
    | 'date'
    | 'number'
    | 'progress'
    | 'status'
    | 'priority'
    | 'user'
    | 'tags'
    | 'currency'
    | 'custom'

  export interface Column<RecordType = DefaultRecordType> {
    width?: number
    minWidth?: number
    maxWidth?: number
    flex?: number
    name: string
    label: string
    style?: Object
    render?: (item: Record<RecordType>) => React.ReactNode
    align?: ColumnAlign
    type?: ColumnType
    key?: string
    formatter?: (value: any, record?: Record<RecordType>) => string
    cellRenderer?: (value: any, record: Record<RecordType>) => React.ReactNode
    icon?: React.ReactNode
    sortable?: boolean
    customFieldId?: string
  }

  export interface ColumnConfig {
    visibleColumns?: string[]
    columnOrder?: string[]
    columnWidths?: NativeRecord<string, number>
  }

  export type CustomFieldType =
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'multiselect'
    | 'currency'
    | 'checkbox'
    | 'url'
    | 'email'
    | 'phone'

  export interface CustomField {
    id: string
    label: string
    type: CustomFieldType
    icon?: string
    options?: string[]
    required?: boolean
    description?: string
    order?: number
  }
  export type DependenceType = 'start_finish' | 'finish_start' | 'start_start' | 'finish_finish'
  export interface Dependence {
    from: string
    to: string
    type: DependenceType
    color?: string
  }
  export type UpdateCallback<RecordType = DefaultRecordType> = (
    record: Record<RecordType>,
    startDate: string,
    endDate: string
  ) => Promise<boolean>
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
