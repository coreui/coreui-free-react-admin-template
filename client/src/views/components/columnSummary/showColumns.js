/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ColumnSummary from './columnSummary'
const ShowColumns = () => {
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/column/outline')
      .then((res) => {
        console.log(res)
        setData(res.data)
      })
      .catch((err) => {
        console.log(err.response)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <div>{data && <ColumnSummary data={data} />}</div>
}

export default ShowColumns
