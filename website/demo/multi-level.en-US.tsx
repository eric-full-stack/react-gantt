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
    name: 'Software Development',
    startDate: '2025-11-21',
    endDate: '2025-12-31',
    progress: 45,
    status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
    priority: 5,
    budget: 500000,
    department: 'Development',
    responsible: 'John Smith',
    customFieldValues: [
      {
        fieldId: 'department',
        field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
        value: 'Development',
      },
      {
        fieldId: 'approved',
        field: { id: 'approved', label: 'Approved', type: 'checkbox' },
        value: true,
      },
      {
        fieldId: 'documentation',
        field: { id: 'documentation', label: 'Documentation', type: 'url' },
        value: 'https://docs.example.com/software-dev',
      },
      {
        fieldId: 'contact',
        field: { id: 'contact', label: 'Email', type: 'email' },
        value: 'john.smith@example.com',
      },
    ],
    children: [
      {
        id: 2,
        name: 'Backend Development',
        startDate: '2025-11-21',
        endDate: '2025-12-15',
        progress: 60,
        status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
        priority: 5,
        budget: 200000,
        department: 'Development',
        responsible: 'Mary Johnson',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Development',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: 'https://docs.example.com/backend',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'mary.johnson@example.com',
          },
        ],
        children: [
          {
            id: 3,
            name: 'REST API Development',
            startDate: '2025-11-21',
            endDate: '2025-11-30',
            progress: 80,
            status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
            priority: 5,
            budget: 80000,
            department: 'Development',
            responsible: 'Peter Williams',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: 'https://docs.example.com/api-rest',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'peter.williams@example.com',
              },
            ],
          },
          {
            id: 4,
            name: 'Database Design',
            startDate: '2025-11-25',
            endDate: '2025-12-05',
            progress: 50,
            status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 60000,
            department: 'Development',
            responsible: 'Anna Brown',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'anna.brown@example.com',
              },
            ],
          },
          {
            id: 5,
            name: 'Authentication System',
            startDate: '2025-12-01',
            endDate: '2025-12-15',
            progress: 30,
            status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
            priority: 5,
            budget: 60000,
            department: 'Development',
            responsible: 'Charles Davis',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: 'https://docs.example.com/auth',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'charles.davis@example.com',
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
        status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
        priority: 4,
        budget: 180000,
        department: 'Development',
        responsible: 'Barbara Miller',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Development',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: 'https://docs.example.com/frontend',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'barbara.miller@example.com',
          },
        ],
        children: [
          {
            id: 7,
            name: 'React Components',
            startDate: '2025-11-25',
            endDate: '2025-12-10',
            progress: 50,
            status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 70000,
            department: 'Development',
            responsible: 'Richard Wilson',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: 'https://docs.example.com/react-components',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'richard.wilson@example.com',
              },
            ],
          },
          {
            id: 8,
            name: 'State Management',
            startDate: '2025-12-05',
            endDate: '2025-12-20',
            progress: 20,
            status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 50000,
            department: 'Development',
            responsible: 'Frances Moore',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'frances.moore@example.com',
              },
            ],
          },
          {
            id: 9,
            name: 'UI/UX Implementation',
            startDate: '2025-12-10',
            endDate: '2025-12-31',
            progress: 10,
            status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 60000,
            department: 'Design',
            responsible: 'Grace Taylor',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Design',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: 'https://docs.example.com/ui-ux',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'grace.taylor@example.com',
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
        status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
        priority: 4,
        budget: 120000,
        department: 'Development',
        responsible: 'Henry Anderson',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Development',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: false,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: 'https://docs.example.com/testing',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'henry.anderson@example.com',
          },
        ],
        children: [
          {
            id: 11,
            name: 'Unit Tests',
            startDate: '2025-12-10',
            endDate: '2025-12-20',
            progress: 25,
            status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
            priority: 4,
            budget: 40000,
            department: 'Development',
            responsible: 'Isabel Thomas',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: true,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'isabel.thomas@example.com',
              },
            ],
          },
          {
            id: 12,
            name: 'Integration Tests',
            startDate: '2025-12-15',
            endDate: '2025-12-28',
            progress: 10,
            status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 50000,
            department: 'Development',
            responsible: 'Lucas Jackson',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: 'https://docs.example.com/integration-tests',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'lucas.jackson@example.com',
              },
            ],
          },
          {
            id: 13,
            name: 'E2E Tests',
            startDate: '2025-12-20',
            endDate: '2025-12-31',
            progress: 5,
            status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
            priority: 3,
            budget: 30000,
            department: 'Development',
            responsible: 'Margaret White',
            customFieldValues: [
              {
                fieldId: 'department',
                field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
                value: 'Development',
              },
              {
                fieldId: 'approved',
                field: { id: 'approved', label: 'Approved', type: 'checkbox' },
                value: false,
              },
              {
                fieldId: 'documentation',
                field: { id: 'documentation', label: 'Documentation', type: 'url' },
                value: '',
              },
              {
                fieldId: 'contact',
                field: { id: 'contact', label: 'Email', type: 'email' },
                value: 'margaret.white@example.com',
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
    status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
    priority: 3,
    budget: 300000,
    department: 'Marketing',
    responsible: 'Nancy Harris',
    customFieldValues: [
      {
        fieldId: 'department',
        field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
        value: 'Marketing',
      },
      {
        fieldId: 'approved',
        field: { id: 'approved', label: 'Approved', type: 'checkbox' },
        value: true,
      },
      {
        fieldId: 'documentation',
        field: { id: 'documentation', label: 'Documentation', type: 'url' },
        value: 'https://docs.example.com/marketing',
      },
      {
        fieldId: 'contact',
        field: { id: 'contact', label: 'Email', type: 'email' },
        value: 'nancy.harris@example.com',
      },
    ],
    children: [
      {
        id: 15,
        name: 'Content Creation',
        startDate: '2025-12-01',
        endDate: '2025-12-20',
        progress: 30,
        status: { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
        priority: 3,
        budget: 100000,
        department: 'Marketing',
        responsible: 'Oscar Martin',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: '',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'oscar.martin@example.com',
          },
        ],
      },
      {
        id: 16,
        name: 'Social Media Campaign',
        startDate: '2025-12-10',
        endDate: '2026-01-10',
        progress: 15,
        status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
        priority: 2,
        budget: 150000,
        department: 'Marketing',
        responsible: 'Patricia Garcia',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: false,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: 'https://docs.example.com/social-media',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'patricia.garcia@example.com',
          },
        ],
      },
      {
        id: 17,
        name: 'Launch Event',
        startDate: '2026-01-05',
        endDate: '2026-01-15',
        progress: 5,
        status: { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
        priority: 4,
        budget: 50000,
        department: 'Marketing',
        responsible: 'Quentin Martinez',
        customFieldValues: [
          {
            fieldId: 'department',
            field: { id: 'department', label: 'Department', type: 'select', options: ['Development', 'Design', 'Marketing', 'Sales'] },
            value: 'Marketing',
          },
          {
            fieldId: 'approved',
            field: { id: 'approved', label: 'Approved', type: 'checkbox' },
            value: true,
          },
          {
            fieldId: 'documentation',
            field: { id: 'documentation', label: 'Documentation', type: 'url' },
            value: '',
          },
          {
            fieldId: 'contact',
            field: { id: 'contact', label: 'Email', type: 'email' },
            value: 'quentin.martinez@example.com',
          },
        ],
      },
    ],
  },
]

const customFields: Gantt.CustomField[] = [
  {
    id: 'department',
    label: 'Department',
    type: 'select',
    options: ['Development', 'Design', 'Marketing', 'Sales'],
    description: 'Responsible department',
    order: 1,
  },
  {
    id: 'approved',
    label: 'Approved',
    type: 'checkbox',
    description: 'Approval status',
    order: 2,
  },
  {
    id: 'documentation',
    label: 'Docs',
    type: 'url',
    description: 'Documentation link',
    order: 3,
  },
  {
    id: 'contact',
    label: 'Email',
    type: 'email',
    description: 'Contact email',
    order: 4,
  },
]

const App = () => {
  const [data, setData] = useState(multiLevelData)

  const columns: Gantt.Column<TaskData>[] = [
    {
      name: 'name',
      label: 'Task Name',
      width: 250,
      type: 'text',
    },
    {
      name: 'progress',
      label: 'Progress',
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
      label: 'Priority',
      width: 120,
      type: 'priority',
      align: 'center',
    },
    {
      name: 'startDate',
      label: 'Start',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'endDate',
      label: 'End',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'budget',
      label: 'Budget',
      width: 130,
      type: 'currency',
      align: 'right',
    },
    {
      name: 'customField_department',
      label: 'Department',
      width: 140,
      type: 'custom',
      customFieldId: 'department',
      align: 'center',
    },
    {
      name: 'customField_approved',
      label: 'Approved',
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
        <h2>Multi-Level Gantt with Complete Hierarchy</h2>
        <p>
          This example demonstrates the use of hierarchical structures up to 3 levels
          with all features:
        </p>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li><strong>3 hierarchy levels:</strong> Project → Phase → Task</li>
          <li><strong>Default columns:</strong> name, progress, status, priority, dates, budget</li>
          <li><strong>Custom fields:</strong> department, approval, documentation, email</li>
          <li><strong>Expand/Collapse:</strong> click the arrow to expand/collapse</li>
          <li><strong>Column resize:</strong> drag column borders</li>
          <li><strong>Synchronized scroll:</strong> header and body scroll together</li>
          <li><strong>Resizable divider:</strong> drag the divider to adjust width</li>
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
        <h3 style={{ marginBottom: 15 }}>Hierarchical Structure</h3>

        <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
          <div>📁 <strong>Software Development</strong> (Level 1 - Project)</div>
          <div style={{ paddingLeft: 20 }}>├─ 📂 Backend Development (Level 2 - Phase)</div>
          <div style={{ paddingLeft: 40 }}>│  ├─ 📄 REST API Development (Level 3 - Task)</div>
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
