import dayjs from 'dayjs'
import RcGantt from 'rc-gantt'
import React, { useState } from 'react'

interface Data {
  id: number
  name: string
  startDate: string
  endDate: string
}

function createData(len: number) {
  const result: Data[] = []
  for (let i = 0; i < len; i++) {
    result.push({
      id: i,
      name: `任务 ${i + 1}`,
      startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(i, 'day').format('YYYY-MM-DD'),
    })
  }
  return result
}

const App = () => {
  const [data, setData] = useState(createData(20))
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div>
      <button
        type="button"
        onClick={() => setDarkMode(prev => !prev)}
        style={{
          marginBottom: 12,
          padding: '6px 14px',
          borderRadius: 4,
          border: '1px solid #d9d9d9',
          cursor: 'pointer',
        }}
      >
        {darkMode ? '☀️ Modo claro' : '🌙 Modo escuro'}
      </button>
      <div style={{ width: '100%', height: 500 }}>
        <RcGantt<Data>
          data={data}
          darkMode={darkMode}
          columns={[
            {
              name: 'name',
              label: '名称',
              width: 100,
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
      </div>
    </div>
  )
}

export default App
