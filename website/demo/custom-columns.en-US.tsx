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
    { title: 'To Do', color: '#e5e7eb', textColor: '#374151' },
    { title: 'In Progress', color: '#dbeafe', textColor: '#1e40af' },
    { title: 'Completed', color: '#d1fae5', textColor: '#065f46' },
    { title: 'Blocked', color: '#fee2e2', textColor: '#991b1b' },
  ]

  const assignees = [
    { name: 'John Doe' },
    { name: 'Jane Smith' },
    { name: 'Peter Johnson' },
    { name: 'Anna Williams' },
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
      name: `Task ${i + 1}`,
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
            label: 'Department',
            type: 'select',
            options: ['Development', 'Design', 'Marketing', 'Sales'],
          },
          value: ['Development', 'Design', 'Marketing', 'Sales'][
            Math.floor(Math.random() * 4)
          ],
        },
        {
          fieldId: 'approved',
          field: {
            id: 'approved',
            label: 'Approved',
            type: 'checkbox',
          },
          value: Math.random() > 0.5,
        },
        {
          fieldId: 'documentation',
          field: {
            id: 'documentation',
            label: 'Documentation',
            type: 'url',
          },
          value: i % 3 === 0 ? `https://docs.example.com/task-${i + 1}` : '',
        },
        {
          fieldId: 'contact',
          field: {
            id: 'contact',
            label: 'Contact Email',
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
    label: 'Department',
    type: 'select',
    options: ['Development', 'Design', 'Marketing', 'Sales'],
    description: 'Department responsible for the task',
    order: 1,
  },
  {
    id: 'approved',
    label: 'Approved',
    type: 'checkbox',
    description: 'Whether the task has been approved',
    order: 2,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    type: 'url',
    description: 'Link to task documentation',
    order: 3,
  },
  {
    id: 'contact',
    label: 'Contact Email',
    type: 'email',
    description: 'Email of the person responsible',
    order: 4,
  },
]

const App = () => {
  const [data, setData] = useState(createData(25))

  const columns: Gantt.Column<TaskData>[] = [
    {
      name: 'name',
      label: 'Task Name',
      width: 200,
      type: 'text',
    },
    {
      name: 'progress',
      label: 'Progress',
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
      label: 'Priority',
      width: 120,
      type: 'priority',
      align: 'center',
    },
    {
      name: 'startDate',
      label: 'Start Date',
      width: 110,
      type: 'date',
      align: 'center',
    },
    {
      name: 'endDate',
      label: 'End Date',
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
      label: 'Budget',
      width: 130,
      type: 'currency',
      align: 'right',
    },
    // Custom field columns
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
        <h2>Gantt with Custom Columns</h2>
        <p>
          This example demonstrates the full use of React Gantt custom columns,
          including:
        </p>
        <ul style={{ marginTop: 10, paddingLeft: 20 }}>
          <li><strong>Standard types:</strong> text, date, number, progress</li>
          <li><strong>Special types:</strong> status, priority, tags, currency</li>
          <li><strong>Custom fields:</strong> select, checkbox, url, email</li>
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
        <h3 style={{ marginBottom: 15 }}>Available Column Types</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Standard Types</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>text</code> - Plain text</li>
              <li><code>number</code> - Formatted numbers</li>
              <li><code>date</code> - Formatted dates</li>
              <li><code>progress</code> - Progress bar</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Special Types</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>status</code> - Colored status badge</li>
              <li><code>priority</code> - Priority badge (1-5)</li>
              <li><code>tags</code> - List of tags</li>
              <li><code>currency</code> - Monetary values</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Custom Fields</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li><code>select</code> - Single selection</li>
              <li><code>multiselect</code> - Multiple selection</li>
              <li><code>checkbox</code> - True/False</li>
              <li><code>url</code> - Clickable links</li>
              <li><code>email</code> - Email addresses</li>
              <li><code>phone</code> - Phone numbers</li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: 10, color: '#374151' }}>Features</h4>
            <ul style={{ paddingLeft: 20, lineHeight: '1.8' }}>
              <li>Customizable column width</li>
              <li>Alignment (left, center, right)</li>
              <li>Custom formatters</li>
              <li>Custom renderers</li>
              <li>Column sorting</li>
              <li>Column resizing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
