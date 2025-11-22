import dayjs from 'dayjs'
import type { Gantt } from 'rc-gantt'
import RcGantt from 'rc-gantt'
import React, { useState } from 'react'

interface TaskData {
  id: number
  name: string
  startDate: string
  endDate: string
  progress?: number
  status?: {
    title: string
    color: string
    textColor: string
  }
  priority?: number
  assignee?: {
    name: string
    avatar?: string
  }
  tags?: string[]
  budget?: number
  customFieldValues?: Array<{
    fieldId: string
    field: Gantt.CustomField
    value: any
  }>
}

function createData(len: number): TaskData[] {
  const statuses = [
    { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
    { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
    { title: 'Concluído', color: '#d1fae5', textColor: '#065f46' },
    { title: 'Bloqueado', color: '#fee2e2', textColor: '#991b1b' },
  ]

  const assignees = [
    { name: 'João Silva' },
    { name: 'Maria Santos' },
    { name: 'Pedro Costa' },
    { name: 'Ana Oliveira' },
  ]

  const tagOptions = [
    ['Frontend', 'React'],
    ['Backend', 'API'],
    ['Database', 'Migration'],
    ['Design', 'UI/UX'],
    ['Testing', 'QA'],
  ]

  const result: TaskData[] = []

  for (let i = 0; i < len; i++) {
    const startOffset = Math.floor(Math.random() * 10)
    const duration = Math.floor(Math.random() * 15) + 5

    result.push({
      id: i,
      name: `Tarefa ${i + 1}`,
      startDate: dayjs().add(startOffset, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(startOffset + duration, 'day').format('YYYY-MM-DD'),
      progress: Math.floor(Math.random() * 101),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: Math.floor(Math.random() * 5) + 1,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      tags: tagOptions[Math.floor(Math.random() * tagOptions.length)],
      budget: Math.floor(Math.random() * 50000) + 10000,
      customFieldValues: [
        {
          fieldId: 'department',
          field: {
            id: 'department',
            label: 'Departamento',
            type: 'select',
            options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'],
          },
          value: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'][
            Math.floor(Math.random() * 4)
          ],
        },
        {
          fieldId: 'approved',
          field: {
            id: 'approved',
            label: 'Aprovado',
            type: 'checkbox',
          },
          value: Math.random() > 0.5,
        },
        {
          fieldId: 'documentation',
          field: {
            id: 'documentation',
            label: 'Documentação',
            type: 'url',
          },
          value: i % 3 === 0 ? `https://docs.example.com/task-${i + 1}` : '',
        },
        {
          fieldId: 'contact',
          field: {
            id: 'contact',
            label: 'Email de Contato',
            type: 'email',
          },
          value: `task${i + 1}@example.com`,
        },
      ],
    })
  }
  return result
}

const customFields: Gantt.CustomField[] = [
  {
    id: 'department',
    label: 'Departamento',
    type: 'select',
    options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'],
    description: 'Departamento responsável pela tarefa',
    order: 1,
  },
  {
    id: 'approved',
    label: 'Aprovado',
    type: 'checkbox',
    description: 'Se a tarefa foi aprovada',
    order: 2,
  },
  {
    id: 'documentation',
    label: 'Documentação',
    type: 'url',
    description: 'Link para documentação da tarefa',
    order: 3,
  },
  {
    id: 'contact',
    label: 'Email de Contato',
    type: 'email',
    description: 'Email do responsável',
    order: 4,
  },
]

const App = () => {
  const [data, setData] = useState(createData(25))

  const columns: Gantt.Column<TaskData>[] = [
    {
      name: 'name',
      label: 'Nome da Tarefa',
      width: 200,
      type: 'text',
    },
    {
      name: 'progress',
      label: 'Progresso',
      width: 150,
      type: 'progress',
      align: 'center',
    },
    {
      name: 'status',
      label: 'Status',
      width: 130,
      type: 'status',
      align: 'center',
    },
    {
      name: 'priority',
      label: 'Prioridade',
      width: 120,
      type: 'priority',
      align: 'center',
    },
    {
      name: 'startDate',
      label: 'Data Início',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'endDate',
      label: 'Data Fim',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'tags',
      label: 'Tags',
      width: 180,
      type: 'tags',
    },
    {
      name: 'budget',
      label: 'Orçamento',
      width: 130,
      type: 'currency',
      align: 'right',
    },
    // Colunas customizadas
    {
      name: 'customField_department',
      label: 'Departamento',
      width: 140,
      type: 'custom',
      customFieldId: 'department',
      align: 'center',
    },
    {
      name: 'customField_approved',
      label: 'Aprovado',
      width: 100,
      type: 'custom',
      customFieldId: 'approved',
      align: 'center',
    },
    {
      name: 'customField_documentation',
      label: 'Docs',
      width: 180,
      type: 'custom',
      customFieldId: 'documentation',
    },
    {
      name: 'customField_contact',
      label: 'Email',
      width: 180,
      type: 'custom',
      customFieldId: 'contact',
    },
  ]

  return (
    <div style={{ width: '100%', height: 800 }}>
      <div style={{ marginBottom: 20 }}>
        <h2>Gantt com Colunas Customizáveis</h2>
        <p>
          Este exemplo demonstra o uso completo das colunas customizáveis do React Gantt,
          incluindo:
        </p>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li><strong>Tipos padrão:</strong> texto, data, número, progresso</li>
          <li><strong>Tipos especiais:</strong> status, prioridade, tags, moeda</li>
          <li><strong>Campos customizados:</strong> select, checkbox, url, email</li>
        </ul>
      </div>

      <RcGantt<TaskData>
        data={data}
        columns={columns}
        customFields={customFields}
        onUpdate={async (row, startDate, endDate) => {
          setData(prev => {
            const newList = [...prev]
            const index = newList.findIndex(val => val.id === row.id)
            if (index !== -1) {
              newList[index] = {
                ...row,
                startDate: dayjs(startDate).format('YYYY-MM-DD'),
                endDate: dayjs(endDate).format('YYYY-MM-DD'),
              }
            }
            return newList
          })
          return true
        }}
      />

      <div style={{ marginTop: 30, padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: 15 }}>Tipos de Colunas Disponíveis</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Tipos Padrão</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>text</code> - Texto simples</li>
              <li><code>number</code> - Números formatados</li>
              <li><code>date</code> - Datas formatadas</li>
              <li><code>progress</code> - Barra de progresso</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Tipos Especiais</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>status</code> - Badge de status colorido</li>
              <li><code>priority</code> - Badge de prioridade (1-5)</li>
              <li><code>tags</code> - Lista de tags</li>
              <li><code>currency</code> - Valores monetários (R$)</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Campos Customizados</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>select</code> - Seleção única</li>
              <li><code>multiselect</code> - Múltipla seleção</li>
              <li><code>checkbox</code> - Verdadeiro/Falso</li>
              <li><code>url</code> - Links clicáveis</li>
              <li><code>email</code> - Endereços de email</li>
              <li><code>phone</code> - Números de telefone</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Recursos</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li>Largura customizável por coluna</li>
              <li>Alinhamento (left, center, right)</li>
              <li>Formatadores personalizados</li>
              <li>Renderizadores customizados</li>
              <li>Ordenação de colunas</li>
              <li>Redimensionamento de colunas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
