import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Title from './Title'
import Resume from './Resume'
import Testimonials from './Testimonials'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Column = () => {
  const id = useParams().id
  const [data, setData] = useState([])
  const getData = () => {
    if (id.includes('interview')) {
      axios
        .get(`./${id}.json`)
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {})
    } else {
      axios
        .get('/api/column/detail', { params: { id: id } })
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
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
