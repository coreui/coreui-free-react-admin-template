import React, { useState, useEffect } from 'react'
import Timeline from './Timeline'
const History = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('historyData.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{data.member && <Timeline data={data} />}</>
}

export default History
