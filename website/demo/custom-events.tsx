import dayjs from 'dayjs'
import type { Gantt } from 'rc-gantt'
import RcGantt from 'rc-gantt'
import React, { useState } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
}

interface CustomEvent {
  id: number
  key: string
  content: string
  date: string
}

function createData(len: number) {
  const result: Data[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      id: i,
      name: `Tarefa ${i + 1}`,
      startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(i + 2, 'day').format('YYYY-MM-DD'),
    })
  }
  return result
}

function createCustomEvents(): CustomEvent[] {
  return [
    {
      id: 1,
      key: dayjs().add(3, 'day').format('YYYY-MM-DD'),
      content: 'Reunião Importante',
      date: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    },
    {
      id: 2,
      key: dayjs().add(7, 'day').format('YYYY-MM-DD'),
      content: 'Deadline do Projeto',
      date: dayjs().add(7, 'day').format('YYYY-MM-DD'),
    },
    {
      id: 3,
      key: dayjs().add(10, 'day').format('YYYY-MM-DD'),
      content: 'Apresentação',
      date: dayjs().add(10, 'day').format('YYYY-MM-DD'),
    }
  ]
}

const App = () => {
  const [data, setData] = useState(createData(15))
  const [customEvents] = useState(createCustomEvents())
  
  const handleCustomEventClick = (event: CustomEvent) => {
    alert(`Evento clicado: ${event.content}\nData: ${dayjs(event.date).format('DD/MM/YYYY')}`)
  }

  return (
    <div style={{ width: '100%', height: 800 }}>
      <h3>Gantt com Eventos Customizados Clicáveis</h3>
      <p>Clique nas linhas vermelhas para ver os eventos customizados!</p>
      
      <RcGantt<Data>
        data={data}
        customEvents={customEvents}
        customFields={[{
          id: 'name',
          label: 'Nome da Tarefa2',
          type: 'text',
          icon: 'name',
          required: true,
          description: 'Nome da Tarefa',
          order: 1,
          options: ['name', 'progress', 'startDate', 'endDate'],
        }]}
        onCustomEventClick={handleCustomEventClick}
        columns={[
          {
            name: 'name',
            label: 'Nome da Tarefa',
            width: 150,
          },
        ]}
        onUpdate={async (row, startDate, endDate) => {
          setData(prev => {
            const newList = [...prev]
            const index = newList.findIndex(val => val.id === row.id)
            newList[index] = {
              ...row,
              startDate: dayjs(startDate).format('YYYY-MM-DD'),
              endDate: dayjs(endDate).format('YYYY-MM-DD'),
            }
            return newList
          })
          return true
        }}
      />
      
      <div style={{ marginTop: 20 }}>
        <h4>Eventos Customizados:</h4>
        <ul>
          {customEvents.map(event => (
            <li key={event.id}>
              <strong>{event.content}</strong> - {dayjs(event.key).format('DD/MM/YYYY')}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App 