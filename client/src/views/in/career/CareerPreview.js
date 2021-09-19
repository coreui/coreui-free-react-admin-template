/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand } from '@coreui/react'
import { eesa } from './index'
import parser from 'html-react-parser'

const CareerPreview = ({ post, experience, requirement }) => {
  const [isExpand, setIsExpand] = useState(false)
  const [previewURL, setPreviewURL] = useState(post.file)
  if (post.file && typeof post.file === 'object') {
    let reader = new FileReader()
    reader.onloadend = () => {
      setPreviewURL(reader.result)
    }
    reader.readAsDataURL(post.file)
  }
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {li}
      </div>
    )
  }
  if (typeof post.description === 'string') {
    return (
      <div className="CareerBlock" key={post.id}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={previewURL ? previewURL : eesa} alt="eesa" />
          }
          values={[[`${post.companyName} 徵 ${post.workType}`]]}
        />
        <hr></hr>
        <div className="careercontent">
          <h3 style={{ fontWeight: '600' }}>{post.title}</h3>
          <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.salary}</h2>
          <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h3>
          <h4 style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>{post.diploma}</h4>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h3>
              <h4>{experience.map((exp) => spec(exp))}</h4>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
              <h4>{requirement.map((req) => spec(req))}</h4>
              <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>說明：</h3>
              <h4>{parser(post.description)}</h4>
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="CareerBlock" key={post.id}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={previewURL ? previewURL : eesa} alt="eesa" />
          }
          values={[[post.title]]}
        />
        <hr></hr>
        <div className="careercontent">
          <h3>
            {post.name} asking for <nobr>{post.desireWorkType}</nobr>
          </h3>
          <div style={{ 'font-size': '1.39rem' }}>
            <span style={{ color: 'red', fontWeight: '500' }}>{post.diploma}</span> |{' '}
            <nobr>{post.contact}</nobr> | <nobr>{post.email}</nobr>
          </div>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ margin: '1.3rem 0 0.1rem' }}>個人簡歷：</h3>
              <h4>{experience.map((exp) => spec(exp))}</h4>
              <h3 style={{ margin: '1rem 0 0.1rem' }}>專業技能：</h3>
              <h4>{requirement.map((speci) => spec(speci))}</h4>
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  }
}
CareerPreview.propTypes = {
  post: PropTypes.object,
  experience: PropTypes.array,
  requirement: PropTypes.array,
}

export default CareerPreview
