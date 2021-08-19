/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import './Recruitment.css'
import Masonry from 'react-masonry-css'
import RecruBlock from './RecruBlock'

const RecruPost = ({ data }) => {
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 1,
    500: 1,
  }
  return (
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
      {data.map((post) => (
        <RecruBlock post={post} key={post.id} />
      ))}
    </Masonry>
  )
}
RecruPost.propTypes = {
  data: PropTypes.array,
}

export default RecruPost
