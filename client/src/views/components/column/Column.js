import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'
import { useParams } from 'react-router-dom'

// export default App;
const Column = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    fetch('resumeData.json', {
      headers: {
        ContentType: 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((fetchData) => {
        setData(fetchData.articles.find((article) => article.id === id))
        console.log('this is data:', data)
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
Column.propTypes = {
  id: PropTypes.string,
}
export default Column
