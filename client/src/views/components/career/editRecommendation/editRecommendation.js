/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditBlock from './editBlock'
import axios from 'axios'
const EditRecommendation = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/recommendation', { params: { _id: id } })
      .then((res) => {
        console.log('this is posts:', res.data[0])
        setData(res.data[0])
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{data._id && <EditBlock data={data} />}</>
}

export default EditRecommendation
