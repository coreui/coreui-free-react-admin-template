/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecruitmentForm from '../RecruitmentForm'
import axios from 'axios'
const EditRecruitment = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .post('/api/searchRecruitment', { _id: id })
      .then((res) => {
        setData(res.data[0])
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{data._id && <RecruitmentForm data={data} />}</>
}

export default EditRecruitment
