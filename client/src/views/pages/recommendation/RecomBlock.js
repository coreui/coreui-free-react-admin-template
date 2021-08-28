/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { CWidgetBrand, CAvatar } from '@coreui/react'
import eesa from '../../../assets/images/eesa-icon.png'
import CIcon from '@coreui/icons-react'

const RecomBlock = ({ post,setData,index }) => {
  const [isExpand, setIsExpand] = useState(false)
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {li}
      </div>
    )
  }
  const DeleteRecommendation = (id) => {
    axios
      .delete('/api/recommendation', { data: { _id: id } })
      .then((res) => {
        setData((data) => {
          let newData = [...data]
          newData.splice(index, 1)
          console.log('this is newData', newData)
          return newData
        })
        alert('delete ' + res.data.data)
      })
      .catch((err) => {
        err.response.data.description && alert('錯誤\n' + err.response.data.description)
      })
  }
  return (
    <div className="RecomBlock" key={post.id}>
      <CWidgetBrand
        className="mb-4 widgetbrand"
        headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
        values={[['~~~~~~~~~~~~~~~~~~~~~~']]}
      />
      <div className="recomcontent">
        <h3>
          {post.title.name} asking for <nobr>{post.title.desire_work_type}</nobr>
          <a className="hover-pointer" href={'/#/editRecommendation/' + post._id}>
            <CIcon name="cil-pencil"></CIcon>
          </a>
          <CAvatar className="hover-pointer">
            <CIcon name="cil-trash" onClick={() => DeleteRecommendation(post._id)}></CIcon>
          </CAvatar>
        </h3>
        <h2 style={{ margin: '1rem 0rem' }}>{post.title.title}</h2>
        <div style={{ 'font-size': '1.39rem' }}>
          <span style={{ color: 'red', 'font-weight': '500' }}>{post.info.diploma}</span> |{' '}
          <nobr>{post.info.contact}</nobr> | <nobr>{post.info.email}</nobr>
        </div>
        {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
        {isExpand && (
          <>
            <h3 style={{ margin: '1.3rem 0 0.1rem' }}>個人簡歷：</h3>
            <h4>{post.spec.experience.map((exp) => spec(exp))}</h4>
            <h3 style={{ margin: '1rem 0 0.1rem' }}>專業技能：</h3>
            <h4>{post.spec.speciality.map((speci) => spec(speci))}</h4>
            <button onClick={() => setIsExpand(false)}>Show less...</button>
          </>
        )}
      </div>
    </div>
  )
}
RecomBlock.propTypes = {
  post: PropTypes.object,
  setData:PropTypes.func,
  index:PropTypes.number,
}

export default RecomBlock
