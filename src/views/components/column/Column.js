import React, { useEffect, useState } from 'react'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'

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
    <div className="column">
      {data.top && <Title data={data.top} />}
      {data.body && <Resume data={data.body} />}
      {data.annotation && <Testimonials data={data.annotation} />}
    </div>
  )
}

export default Column
