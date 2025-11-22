import React from 'react'
import dayjs from 'dayjs'
import type { Gantt, DefaultRecordType } from '../../types'

interface CellRendererProps<RecordType = DefaultRecordType> {
  value: any
  record: Gantt.Record<RecordType>
  column: Gantt.Column<RecordType>
}

export const TextCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  if (value === null || value === undefined) return <span>-</span>
  return <span>{String(value)}</span>
}

export const DateCell = <RecordType extends DefaultRecordType>({
  value,
  column,
}: CellRendererProps<RecordType>) => {
  if (!value) return <span>-</span>

  try {
    const formatted = column.formatter
      ? column.formatter(value)
      : dayjs(value).format('DD/MM/YYYY')
    return <span>{formatted}</span>
  } catch {
    return <span>-</span>
  }
}

export const NumberCell = <RecordType extends DefaultRecordType>({
  value,
  column,
}: CellRendererProps<RecordType>) => {
  if (value === null || value === undefined) return <span>-</span>

  const formatted = column.formatter
    ? column.formatter(value)
    : typeof value === 'number'
      ? value.toLocaleString('pt-BR')
      : value

  return <span>{formatted}</span>
}

export const ProgressCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  const progress = typeof value === 'number' ? value : 0
  const percentage = Math.min(Math.max(progress, 0), 100)

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs text-gray-600 min-w-[3ch]">{percentage}%</span>
    </div>
  )
}

export const StatusCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  if (!value) return <span>-</span>

  const statusObj = typeof value === 'object' ? value : { title: String(value) }
  const { title, color, textColor } = statusObj

  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
      style={{
        backgroundColor: color || '#e5e7eb',
        color: textColor || '#374151',
      }}
    >
      {title || value}
    </span>
  )
}

export const PriorityCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  if (value === null || value === undefined) return <span>-</span>

  const priorityMap: Record<number | string, { label: string; color: string }> = {
    1: { label: 'Muito Baixa', color: '#10b981' },
    2: { label: 'Baixa', color: '#84cc16' },
    3: { label: 'Média', color: '#f59e0b' },
    4: { label: 'Alta', color: '#f97316' },
    5: { label: 'Muito Alta', color: '#ef4444' },
  }

  const priority = priorityMap[value] || { label: String(value), color: '#6b7280' }

  return (
    <span
      className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-white"
      style={{ backgroundColor: priority.color }}
    >
      {priority.label}
    </span>
  )
}

export const UserCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  if (!value) return <span>-</span>

  const userObj = typeof value === 'object' ? value : { name: String(value) }
  const { name, avatar, picture } = userObj
  const userAvatar = avatar || picture

  return (
    <div className="flex items-center gap-2">
      {userAvatar && (
        <img
          src={userAvatar}
          alt={name || 'User'}
          className="w-6 h-6 rounded-full object-cover"
        />
      )}
      {!userAvatar && (
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600">
          {(name || 'U').charAt(0).toUpperCase()}
        </div>
      )}
      <span className="text-sm truncate">{name || value}</span>
    </div>
  )
}

export const TagsCell = <RecordType extends DefaultRecordType>({
  value,
}: CellRendererProps<RecordType>) => {
  if (!value) return <span>-</span>

  let tags: string[] = []
  if (typeof value === 'string') {
    tags = value.split(',').map(t => t.trim()).filter(Boolean)
  } else if (Array.isArray(value)) {
    tags = value
  }

  if (tags.length === 0) return <span>-</span>

  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-700"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export const CurrencyCell = <RecordType extends DefaultRecordType>({
  value,
  column,
}: CellRendererProps<RecordType>) => {
  if (value === null || value === undefined) return <span>-</span>

  const numValue = typeof value === 'number' ? value : parseFloat(value)
  if (isNaN(numValue)) return <span>-</span>

  const formatted = column.formatter
    ? column.formatter(value)
    : new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numValue)

  return <span>{formatted}</span>
}

export const CustomFieldCell = <RecordType extends DefaultRecordType>({
  value,
  record,
  column,
}: CellRendererProps<RecordType>) => {
  if (!column.customFieldId) return <TextCell value={value} record={record} column={column} />

  const customFieldValues = (record as any).customFieldValues
  if (!customFieldValues) return <span>-</span>

  const fieldValue = customFieldValues.find((fv: any) => fv.fieldId === column.customFieldId)
  if (!fieldValue) return <span>-</span>

  const { field, value: fieldVal } = fieldValue

  if (!field || !fieldVal) return <span>-</span>

  switch (field.type) {
    case 'text':
    case 'email':
    case 'phone':
      return <TextCell value={fieldVal} record={record} column={column} />

    case 'number':
      return <NumberCell value={fieldVal} record={record} column={column} />

    case 'date':
      return <DateCell value={fieldVal} record={record} column={column} />

    case 'currency':
      return <CurrencyCell value={fieldVal} record={record} column={column} />

    case 'select':
      return (
        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
          {fieldVal}
        </span>
      )

    case 'multiselect': {
      const values = Array.isArray(fieldVal) ? fieldVal : [fieldVal]
      return <TagsCell value={values} record={record} column={column} />
    }

    case 'checkbox':
      return (
        <span className="inline-flex items-center">
          {fieldVal === 'true' || fieldVal === true ? '✓' : '✗'}
        </span>
      )

    case 'url':
      return (
        <a
          href={fieldVal}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {fieldVal}
        </a>
      )

    default:
      return <TextCell value={fieldVal} record={record} column={column} />
  }
}

export const renderCell = <RecordType extends DefaultRecordType>(
  value: any,
  record: Gantt.Record<RecordType>,
  column: Gantt.Column<RecordType>
): React.ReactNode => {
  if (column.cellRenderer) {
    return column.cellRenderer(value, record)
  }

  if (column.render) {
    return column.render(record)
  }

  const props = { value, record, column }

  switch (column.type) {
    case 'date':
      return <DateCell {...props} />
    case 'number':
      return <NumberCell {...props} />
    case 'progress':
      return <ProgressCell {...props} />
    case 'status':
      return <StatusCell {...props} />
    case 'priority':
      return <PriorityCell {...props} />
    case 'user':
      return <UserCell {...props} />
    case 'tags':
      return <TagsCell {...props} />
    case 'currency':
      return <CurrencyCell {...props} />
    case 'custom':
      return <CustomFieldCell {...props} />
    case 'text':
    default:
      return <TextCell {...props} />
  }
}
