/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EditBlock from './editBlock'
const EditRecruitment = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    fetch('recruitmentPosts.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((fetchData) => {
        setData(fetchData.posts.find((post) => post.id === id))
        console.log('this is data:', data)
      })
  }
  useEffect(() => {
    getData()
  }, [])
  return <>{data.id && <EditBlock data={data} />}</>
}

export default EditRecruitment
