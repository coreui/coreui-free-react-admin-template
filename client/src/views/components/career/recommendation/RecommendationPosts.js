/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import RecomBlock from './RecomBlock'
import Masonry from 'react-masonry-css'

const RecomPosts = ({ data }) => {
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
        style: { '--test': 'test', color: 'black' },
      }}
      style={{ display: 'flex' }}
    >
      {data.map((post) => (
        <RecomBlock post={post} key={post._id} />
      ))}
    </Masonry>
  )
}
RecomPosts.propTypes = {
  data: PropTypes.array,
}

export default RecomPosts
