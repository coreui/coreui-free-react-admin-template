import React, { useState, useEffect } from 'react'
import CareerBlock from '../../career/CareerBlock'
import { Link } from 'react-router-dom'
import Masonry from 'react-masonry-css'
import axios from 'axios'
import { Spinner } from './index'
const OwnRecommendation = () => {
  const [isPending, setIsPending] = useState(true)
  const [data, setData] = useState([])
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    500: 1,
  }
  const getData = () => {
    axios
      .get('/api/recommendation/mine')
      .then((res) => {
        setData(res.data)
        setIsPending(false)
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
      <Link to="/add_recommendation">
        <div className="d-flex justify-content-center add" width="100%">
          +
        </div>
      </Link>
      {isPending ? (
        <Spinner />
      ) : (
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
      )}
    </div>
  )
}

export default OwnRecommendation
