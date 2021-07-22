import React, { useState, useEffect } from 'react'
import Post from './Post'

const Recruitment = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('recruitmentPosts.json', {
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
  return <div>{data.posts && <Post data={data.posts} />}</div>
}

export default Recruitment
