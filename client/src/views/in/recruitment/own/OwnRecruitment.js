import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import CareerBlock from '../../career/CareerBlock'
import axios from 'axios'

const OwnRecruitment = () => {
  const [data, setData] = useState([])
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
    500: 1,
  }
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
    <div className="text-color-black">
      <Link to="/add_recruitment">
        <div className="d-flex justify-content-center add" width="100%">
          +
        </div>
      </Link>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        columnAttrs={{
          className: 'should be overridden',
          'data-test': '',
          style: { '--test': 'test' },
        }}
        style={{ display: 'flex' }}
      >
        {data.map((post, i) => (
          <CareerBlock post={post} setData={setData} index={i} key={i} />
        ))}
      </Masonry>
    </div>
  )
}

export default OwnRecruitment
