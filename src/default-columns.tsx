import type { Gantt, DefaultRecordType } from './types'

export const createDefaultColumns = <RecordType extends DefaultRecordType>(): Gantt.Column<RecordType>[] => {
  return [
    {
      name: 'name',
      key: 'name',
      label: 'Tarefa',
      type: 'text',
      minWidth: 200,
      flex: 2,
      align: 'left',
    },
    {
      name: 'prazoInicial',
      key: 'startedAt',
      label: 'Prazo Inicial',
      type: 'date',
      width: 120,
      align: 'center',
    },
    {
      name: 'prazoFinal',
      key: 'deadline',
      label: 'Prazo Final',
      type: 'date',
      width: 120,
      align: 'center',
    },
    {
      name: 'progresso',
      key: 'progress',
      label: 'Progresso',
      type: 'progress',
      width: 120,
      align: 'left',
      render: (record) => {
        const workedHours = (record as any).workedHours || 0
        const totalHours = (record as any).hours || 1
        const progress = (workedHours / totalHours) * 100
        return Math.min(Math.round(progress), 100)
      },
    },
    {
      name: 'horas',
      key: 'hours',
      label: 'Horas',
      type: 'number',
      width: 100,
      align: 'center',
      formatter: (value) => {
        if (!value) return '-'
        return `${value}h`
      },
    },
    {
      name: 'status',
      key: 'status',
      label: 'Status',
      type: 'status',
      width: 120,
      align: 'left',
    },
    {
      name: 'prioridade',
      key: 'priority',
      label: 'Prioridade',
      type: 'priority',
      width: 100,
      align: 'center',
    },
    {
      name: 'responsavel',
      key: 'user',
      label: 'Responsável',
      type: 'user',
      width: 150,
      align: 'left',
      render: (record) => {
        const user = (record as any).user
        if (!user) return null
        return {
          name: user.profile?.name || user.user?.name || '-',
          avatar: user.profile?.picture || null,
        }
      },
    },
    {
      name: 'tags',
      key: 'tags',
      label: 'Tags',
      type: 'tags',
      width: 150,
      align: 'left',
    },
    {
      name: 'custo',
      key: 'cost',
      label: 'Custo',
      type: 'currency',
      width: 120,
      align: 'right',
      render: (record) => {
        const hours = (record as any).hours || 0
        const coefficient = (record as any).billingCoefficient || 0
        return hours * coefficient
      },
    },
  ]
}

export const DEFAULT_VISIBLE_COLUMNS = ['name', 'prazoInicial', 'prazoFinal', 'progresso']

export const DEFAULT_COLUMN_WIDTHS: Record<string, number> = {
  name: 200,
  prazoInicial: 120,
  prazoFinal: 120,
  progresso: 120,
  horas: 100,
  status: 120,
  prioridade: 100,
  responsavel: 150,
  tags: 150,
  custo: 120,
}

export const getVisibleColumns = <RecordType extends DefaultRecordType>(
  allColumns: Gantt.Column<RecordType>[],
  visibleColumnNames?: string[],
  columnOrder?: string[]
): Gantt.Column<RecordType>[] => {
  const visible = visibleColumnNames || DEFAULT_VISIBLE_COLUMNS

  let filteredColumns = allColumns.filter(col => visible.includes(col.name))

  if (columnOrder && columnOrder.length > 0) {
    filteredColumns = filteredColumns.sort((a, b) => {
      const aIndex = columnOrder.indexOf(a.name)
      const bIndex = columnOrder.indexOf(b.name)

      if (aIndex === -1 && bIndex === -1) return 0
      if (aIndex === -1) return 1
      if (bIndex === -1) return -1

      return aIndex - bIndex
    })
  }

  return filteredColumns
}

export const applyColumnWidths = <RecordType extends DefaultRecordType>(
  columns: Gantt.Column<RecordType>[],
  customWidths?: Record<string, number>
): Gantt.Column<RecordType>[] => {
  if (!customWidths) return columns

  return columns.map(col => ({
    ...col,
    width: customWidths[col.name] !== undefined ? customWidths[col.name] : col.width,
  }))
}
