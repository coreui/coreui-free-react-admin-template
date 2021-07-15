import React, { useEffect, useState } from 'react'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'
import './css/default.css'
import './css/layout.css'

// export default App;
const Column = () => {
  const [data, setData] = useState([])
  const getData = () => {
    fetch('resumeData.json', {
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
  return (
    <div className="App">
      <Title data={data.top} />
      <Resume data={data.body} />
      <Testimonials data={data.annotation} />
    </div>
  )
}

export default Column
