import React, { useState, useEffect } from 'react'
import RecomPost from './RecomPost'
import axios from 'axios'
const OwnRecommendation = () => {
  const [data, setData] = useState([])
  const getData = () => {
    axios
      .get('/api/recommendation/mine')
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
  return <div className="text-color-black">{data && <RecomPost data={data} />}</div>
}

export default OwnRecommendation
