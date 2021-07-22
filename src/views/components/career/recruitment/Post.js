/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand } from '@coreui/react'
import eesa from '../../../../assets/images/eesa-icon.png'
import './Recruitment.css'
import Masonry from 'react-masonry-css'

const Post = ({ data }) => {
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem' }}>
        {li}
      </div>
    )
  }
  const posts = data.map((post) => {
    return (
      <div className="RecruBlock" key={post.id}>
        <CWidgetBrand
          className="mb-4 widgetbrand"
          headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
          values={[[post.title.company_name]]}
        />
        <hr></hr>
        <div className="recrucontent">
          <h3 style={{ 'font-weight': '600' }}>{post.title.title}</h3>
          <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>
            {post.info.salary}
          </h2>
          <h2 style={{ 'font-size': '1.39rem' }}>
            | {post.info.experience} | {post.info.diploma}
          </h2>
          <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
          <h4>{post.spec.requirement.map((req) => spec(req))}</h4>
          <h3 style={{ 'font-weight': '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
          <h4>{post.spec.description.map((des) => spec(des))}</h4>
        </div>
      </div>
    )
  })
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
      {posts}
    </Masonry>
  )
}
Post.propTypes = {
  data: PropTypes.array,
}

export default Post
