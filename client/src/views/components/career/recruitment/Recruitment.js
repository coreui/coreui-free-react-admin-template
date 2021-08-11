import React, { useState, useEffect } from 'react'
import RecruPost from './RecruPost'
import axios from 'axios'
const Recruitment = () => {
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .post('/api/showRecruitment')
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
  return <div className="text-color-black">{data && <RecruPost data={data} />}</div>
}

export default Recruitment
