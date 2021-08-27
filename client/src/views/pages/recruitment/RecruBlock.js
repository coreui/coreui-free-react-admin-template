/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CWidgetBrand, CRow, CAvatar, CButton } from '@coreui/react'
import eesa from '../../../assets/images/eesa-icon.png'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import parser from 'html-react-parser'

const RecruBlock = ({ post, setData, index }) => {
  const [isExpand, setIsExpand] = useState(false)
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {li}
      </div>
    )
  }
  const DeleteRecruitment = (id) => {
    axios
      .delete('/api/deleteRecruitment', { data: { _id: id } })
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
    <div className="RecruBlock" key={post._id}>
      <CWidgetBrand
        className="mb-4 widgetbrand"
        headerChildren={<img className="eesa" src={eesa} alt="eesa" />}
        values={[[post.title.company_name]]}
      />
      <hr></hr>
      <div className="recrucontent">
        <h3 style={{ 'font-weight': '600' }}>
          {post.title.title}
          <a className="hover-pointer" href={'/#/editRecruitment/' + post._id}>
            <CIcon name="cil-pencil"></CIcon>
          </a>
          <CAvatar className="hover-pointer">
            <CIcon name="cil-trash" onClick={() => DeleteRecruitment(post._id)}></CIcon>
          </CAvatar>
        </h3>
        <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.info.salary}</h2>
        <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h3>
        <div style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>{post.info.diploma}</div>
        {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
        {isExpand && (
          <>
            <h3 style={{ 'font-weight': '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
            <h4>{post.spec.requirement.map((req) => spec(req))}</h4>
            <h3 style={{ 'font-weight': '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
            <h4>{post.spec.description.map((des) => spec(parser(des)))}</h4>
            <button onClick={() => setIsExpand(false)}>Show less...</button>
          </>
        )}
      </div>
    </div>
  )
}
RecruBlock.propTypes = {
  post: PropTypes.object,
  data: PropTypes.array,
  index: PropTypes.object,
  setData: PropTypes.func,
}

export default RecruBlock
