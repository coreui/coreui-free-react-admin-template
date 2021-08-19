import React, { useState, useEffect } from 'react'
import RecruPost from './RecruPost'
import axios from 'axios'
const OwnRecruitment = () => {
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/recruitment')
      .then((res) => {
        console.log('this is posts:', res.data)
        setData(res.data)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="text-color-black">{data && <RecruPost data={data} setData={setData} />}</div>
  )
}

export default OwnRecruitment
