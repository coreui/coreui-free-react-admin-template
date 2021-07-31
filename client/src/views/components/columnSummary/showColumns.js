/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import ColumnSummary from './columnSummary'
const ShowColumns = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('summary.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <div>{data.summary && <ColumnSummary data={data.summary} />}</div>
}

export default ShowColumns
