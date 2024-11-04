import dayjs from 'dayjs'
import RcGantt, { enUS } from 'rc-gantt'
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
      name: 'Title' + i,
      startDate: dayjs().subtract(-i, 'day').format('YYYY-MM-DD'),
      endDate: dayjs().add(i * 2, 'day').format('YYYY-MM-DD'),
      constructionId: i % 2 == 0 ? "1" : "2",
    })
  }
  return result
}

const App = () => {
  const [data, setData] = useState(createData(20))
 
  return (
    <div style={{ width: '100%', height: 500 }}>
      <RcGantt<Data>
        data={data}
        isTimeline
        renderLeftText={row => ""}
        renderRightText={row => ""}
        disabled
        columns={[
          {
            name: 'name',
            label: 'Custom Title',
            width: 100,
          },
        ]}
        locale={enUS}
        onUpdate={async (row, startDate, endDate) => {
          console.log('update', row, startDate, endDate)
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
  )
}

export default App
