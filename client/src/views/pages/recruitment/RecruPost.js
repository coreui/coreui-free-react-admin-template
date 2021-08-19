/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import './Recruitment.css'
import Masonry from 'react-masonry-css'
import RecruBlock from './RecruBlock'

const RecruPost = ({ data, setData }) => {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
    500: 1,
  }
  return (
    <>
      <a href="/#/addRecruitment">
        <div className="d-flex justify-content-center add" width="100%">
          +
        </div>
      </a>
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
          <RecruBlock post={post} setData={setData} index={i} key={i} />
        ))}
      </Masonry>
    </>
  )
}
RecruPost.propTypes = {
  data: PropTypes.array,
  setData: PropTypes.func,
}

export default RecruPost
