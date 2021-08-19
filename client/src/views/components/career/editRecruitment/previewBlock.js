/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand } from '@coreui/react'
import eesa from '../../../../assets/images/eesa-icon.png'

const PreviewBlock = ({ post, experience, requirement, description }) => {
  const [isExpand, setIsExpand] = useState(false)
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem' }}>
        {li}
      </div>
    )
  }
  if (description.length !== 0) {
    return (
      <div className="PreviewBlock" key={post.id}>
        <CWidgetBrand
          className="mb-4 widgetbrand"
          headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
          values={[[post.companyName]]}
        />
        <hr></hr>
        <div className="previewcontent">
          <h3 style={{ 'font-weight': '600' }}>{post.title}</h3>
          <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.salary}</h2>
          <h3>要求學歷：</h3>
          <h4 style={{ 'font-size': '1.39rem' }}>{post.diploma}</h4>
          {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
          {isExpand && (
            <>
              <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h3>
              <h4>{experience.map((exp) => spec(exp))}</h4>
              <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
              <h4>{requirement.map((req) => spec(req))}</h4>
              <h3 style={{ 'font-weight': '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
              <h4>{description.map((des) => spec(des))}</h4>
              <button onClick={() => setIsExpand(false)}>Show less...</button>
            </>
          )}
        </div>
      </div>
    )
  } else {
    return (
      <div className="PreviewBlock" key={post.id}>
        <CWidgetBrand
          className="mb-4 widgetbrand"
          headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
          values={[['~~~~~~~~~~~~~~~~~~']]}
        />
        <div className="previewcontent">
          <h3>
            {post.name} asking for <nobr>{post.desireWorkType}</nobr>
          </h3>
          <h2 style={{ margin: '1rem 0rem' }}>{post.title}</h2>
          <div style={{ 'font-size': '1.39rem' }}>
            <span style={{ color: 'red', 'font-weight': '500' }}>{post.diploma}</span> |{' '}
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
PreviewBlock.propTypes = {
  post: PropTypes.object,
  experience: PropTypes.array,
  requirement: PropTypes.array,
  description: PropTypes.array,
}

export default PreviewBlock
