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
  children?: TaskData[]
  budget?: number
  department?: string
  responsible?: string
  customFieldValues?: Array<{
    fieldId: string
    field: Gantt.CustomField
    value: any
  }>
}

const multiLevelData: TaskData[] = [
  {
    id: 1,
    name: 'Desenvolvimento de Software',
    startDate: '2025-11-21',
    endDate: '2025-12-31',
    progress: 45,
    status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
    priority: 5,
    budget: 500000,
    department: 'Desenvolvimento',
    responsible: 'João Silva',
    customFieldValues: [
      {
        fieldId: 'department',
        field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
        value: 'Desenvolvimento',
      },
      {
        fieldId: 'approved',
        field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
        value: true,
      },
      {
        fieldId: 'documentation',
        field: { id: 'documentation', label: 'Documentação', type: 'url' },
        value: 'https://docs.example.com/software-dev',
      },
      {
        fieldId: 'contact',
        field: { id: 'contact', label: 'Email', type: 'email' },
        value: 'joao.silva@example.com',
      },
    ],
    children: [
      {
        id: 2,
        name: 'Backend Development',
        startDate: '2025-11-21',
        endDate: '2025-12-15',
        progress: 60,
        status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
        priority: 5,
        budget: 200000,
        department: 'Desenvolvimento',
        responsible: 'Maria Santos',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Desenvolvimento',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: 'https://docs.example.com/backend',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'maria.santos@example.com',
          },
        ],
        children: [
          {
            id: 3,
            name: 'API REST Development',
            startDate: '2025-11-21',
            endDate: '2025-11-30',
            progress: 80,
            status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
            priority: 5,
            budget: 80000,
            department: 'Desenvolvimento',
            responsible: 'Pedro Costa',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: 'https://docs.example.com/api-rest',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'pedro.costa@example.com',
              },
            ],
          },
          {
            id: 4,
            name: 'Database Design',
            startDate: '2025-11-25',
            endDate: '2025-12-05',
            progress: 50,
            status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 60000,
            department: 'Desenvolvimento',
            responsible: 'Ana Oliveira',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'ana.oliveira@example.com',
              },
            ],
          },
          {
            id: 5,
            name: 'Authentication System',
            startDate: '2025-12-01',
            endDate: '2025-12-15',
            progress: 30,
            status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
            priority: 5,
            budget: 60000,
            department: 'Desenvolvimento',
            responsible: 'Carlos Pereira',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: 'https://docs.example.com/auth',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'carlos.pereira@example.com',
              },
            ],
          },
        ],
      },
      {
        id: 6,
        name: 'Frontend Development',
        startDate: '2025-11-25',
        endDate: '2025-12-31',
        progress: 35,
        status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
        priority: 4,
        budget: 180000,
        department: 'Desenvolvimento',
        responsible: 'Beatriz Lima',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Desenvolvimento',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: 'https://docs.example.com/frontend',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'beatriz.lima@example.com',
          },
        ],
        children: [
          {
            id: 7,
            name: 'React Components',
            startDate: '2025-11-25',
            endDate: '2025-12-10',
            progress: 50,
            status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 70000,
            department: 'Desenvolvimento',
            responsible: 'Ricardo Souza',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: 'https://docs.example.com/react-components',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'ricardo.souza@example.com',
              },
            ],
          },
          {
            id: 8,
            name: 'State Management',
            startDate: '2025-12-05',
            endDate: '2025-12-20',
            progress: 20,
            status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 50000,
            department: 'Desenvolvimento',
            responsible: 'Fernanda Alves',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'fernanda.alves@example.com',
              },
            ],
          },
          {
            id: 9,
            name: 'UI/UX Implementation',
            startDate: '2025-12-10',
            endDate: '2025-12-31',
            progress: 10,
            status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 60000,
            department: 'Design',
            responsible: 'Gabriela Rocha',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Design',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: 'https://docs.example.com/ui-ux',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'gabriela.rocha@example.com',
              },
            ],
          },
        ],
      },
      {
        id: 10,
        name: 'Testing & QA',
        startDate: '2025-12-10',
        endDate: '2025-12-31',
        progress: 15,
        status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
        priority: 4,
        budget: 120000,
        department: 'Desenvolvimento',
        responsible: 'Hugo Martins',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Desenvolvimento',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: false,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: 'https://docs.example.com/testing',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'hugo.martins@example.com',
          },
        ],
        children: [
          {
            id: 11,
            name: 'Unit Tests',
            startDate: '2025-12-10',
            endDate: '2025-12-20',
            progress: 25,
            status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 40000,
            department: 'Desenvolvimento',
            responsible: 'Isabela Fernandes',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'isabela.fernandes@example.com',
              },
            ],
          },
          {
            id: 12,
            name: 'Integration Tests',
            startDate: '2025-12-15',
            endDate: '2025-12-28',
            progress: 10,
            status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 50000,
            department: 'Desenvolvimento',
            responsible: 'Lucas Carvalho',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: 'https://docs.example.com/integration-tests',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'lucas.carvalho@example.com',
              },
            ],
          },
          {
            id: 13,
            name: 'E2E Tests',
            startDate: '2025-12-20',
            endDate: '2025-12-31',
            progress: 5,
            status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 30000,
            department: 'Desenvolvimento',
            responsible: 'Mariana Dias',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
                value: 'Desenvolvimento',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentação', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'mariana.dias@example.com',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 14,
    name: 'Marketing & Launch',
    startDate: '2025-12-01',
    endDate: '2026-01-15',
    progress: 20,
    status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
    priority: 3,
    budget: 300000,
    department: 'Marketing',
    responsible: 'Natália Ribeiro',
    customFieldValues: [
      {
        fieldId: 'department',
        field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
        value: 'Marketing',
      },
      {
        fieldId: 'approved',
        field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
        value: true,
      },
      {
        fieldId: 'documentation',
        field: { id: 'documentation', label: 'Documentação', type: 'url' },
        value: 'https://docs.example.com/marketing',
      },
      {
        fieldId: 'contact',
        field: { id: 'contact', label: 'Email', type: 'email' },
        value: 'natalia.ribeiro@example.com',
      },
    ],
    children: [
      {
        id: 15,
        name: 'Content Creation',
        startDate: '2025-12-01',
        endDate: '2025-12-20',
        progress: 30,
        status: { title: 'Em Andamento', color: '#dbeafe', textColor: '#1e40af' },
        priority: 3,
        budget: 100000,
        department: 'Marketing',
        responsible: 'Otávio Gomes',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: '',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'otavio.gomes@example.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Social Media Campaign',
        startDate: '2025-12-10',
        endDate: '2026-01-10',
        progress: 15,
        status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
        priority: 2,
        budget: 150000,
        department: 'Marketing',
        responsible: 'Paula Azevedo',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: false,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: 'https://docs.example.com/social-media',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'paula.azevedo@example.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Launch Event',
        startDate: '2026-01-05',
        endDate: '2026-01-15',
        progress: 5,
        status: { title: 'A Fazer', color: '#e5e7eb', textColor: '#374151' },
        priority: 4,
        budget: 50000,
        department: 'Marketing',
        responsible: 'Quintino Barbosa',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Departamento', type: 'select', options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Aprovado', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentação', type: 'url' },
            value: '',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'quintino.barbosa@example.com',
          },
        ],
      },
    ],
  },
]

const customFields: Gantt.CustomField[] = [
  {
    id: 'department',
    label: 'Departamento',
    type: 'select',
    options: ['Desenvolvimento', 'Design', 'Marketing', 'Vendas'],
    description: 'Departamento responsável',
    order: 1,
  },
  {
    id: 'approved',
    label: 'Aprovado',
    type: 'checkbox',
    description: 'Status de aprovação',
    order: 2,
  },
  {
    id: 'documentation',
    label: 'Docs',
    type: 'url',
    description: 'Link da documentação',
    order: 3,
  },
  {
    id: 'contact',
    label: 'Email',
    type: 'email',
    description: 'Email do responsável',
    order: 4,
  },
]

const App = () => {
  const [data, setData] = useState(multiLevelData)

  const columns: Gantt.Column<TaskData>[] = [
    {
      name: 'name',
      label: 'Nome da Tarefa',
      width: 250,
      type: 'text',
    },
    {
      name: 'progress',
      label: 'Progresso',
      width: 120,
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
      label: 'Início',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'endDate',
      label: 'Fim',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'budget',
      label: 'Orçamento',
      width: 130,
      type: 'currency',
      align: 'right',
    },
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
      width: 200,
      type: 'custom',
      customFieldId: 'documentation',
    },
    {
      name: 'customField_contact',
      label: 'Email',
      width: 200,
      type: 'custom',
      customFieldId: 'contact',
    },
  ]

  return (
    <div style={{ width: '100%', height: 800 }}>
      <div style={{ marginBottom: 20 }}>
        <h2>Gantt Multi-Level com Hierarquia Completa</h2>
        <p>
          Este exemplo demonstra o uso de estruturas hierárquicas de até 3 níveis
          com todas as funcionalidades:
        </p>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li><strong>3 níveis de hierarquia:</strong> Projeto → Fase → Tarefa</li>
          <li><strong>Colunas padrão:</strong> nome, progresso, status, prioridade, datas, orçamento</li>
          <li><strong>Custom fields:</strong> departamento, aprovação, documentação, email</li>
          <li><strong>Expand/Collapse:</strong> clique na seta para expandir/colapsar</li>
          <li><strong>Resize de colunas:</strong> arraste as bordas das colunas</li>
          <li><strong>Scroll sincronizado:</strong> header e body scrollam juntos</li>
          <li><strong>Divider redimensionável:</strong> arraste o divisor para ajustar largura</li>
        </ul>
      </div>

      <RcGantt<TaskData>
        data={data}
        columns={columns}
        customFields={customFields}
        onUpdate={async (row, startDate, endDate) => {
          setData(prev => {
            const updateTask = (tasks: TaskData[]): TaskData[] => {
              return tasks.map(task => {
                if (task.id === row.id) {
                  return {
                    ...task,
                    startDate: dayjs(startDate).format('YYYY-MM-DD'),
                    endDate: dayjs(endDate).format('YYYY-MM-DD'),
                  }
                }
                if (task.children) {
                  return {
                    ...task,
                    children: updateTask(task.children),
                  }
                }
                return task
              })
            }
            return updateTask(prev)
          })
          return true
        }}
      />

      <div style={{ marginTop: 30, padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <h3 style={{ marginBottom: 15 }}>Estrutura Hierárquica</h3>

        <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
          <div>📁 <strong>Desenvolvimento de Software</strong> (Nível 1 - Projeto)</div>
          <div style={{ paddingLeft: 20 }}>├─ 📂 Backend Development (Nível 2 - Fase)</div>
          <div style={{ paddingLeft: 40 }}>│  ├─ 📄 API REST Development (Nível 3 - Tarefa)</div>
          <div style={{ paddingLeft: 40 }}>│  ├─ 📄 Database Design</div>
          <div style={{ paddingLeft: 40 }}>│  └─ 📄 Authentication System</div>
          <div style={{ paddingLeft: 20 }}>├─ 📂 Frontend Development</div>
          <div style={{ paddingLeft: 40 }}>│  ├─ 📄 React Components</div>
          <div style={{ paddingLeft: 40 }}>│  ├─ 📄 State Management</div>
          <div style={{ paddingLeft: 40 }}>│  └─ 📄 UI/UX Implementation</div>
          <div style={{ paddingLeft: 20 }}>└─ 📂 Testing & QA</div>
          <div style={{ paddingLeft: 40 }}>   ├─ 📄 Unit Tests</div>
          <div style={{ paddingLeft: 40 }}>   ├─ 📄 Integration Tests</div>
          <div style={{ paddingLeft: 40 }}>   └─ 📄 E2E Tests</div>
          <div style={{ marginTop: 10 }}>📁 <strong>Marketing & Launch</strong></div>
          <div style={{ paddingLeft: 20 }}>├─ 📂 Content Creation</div>
          <div style={{ paddingLeft: 20 }}>├─ 📂 Social Media Campaign</div>
          <div style={{ paddingLeft: 20 }}>└─ 📂 Launch Event</div>
        </div>
      </div>
    </div>
  )
}

export default App
