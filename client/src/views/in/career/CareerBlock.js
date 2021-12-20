/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { CWidgetBrand, CAvatar } from '@coreui/react'
import { eesa } from './index'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import parser from 'html-react-parser'

const CareerBlock = ({ post, setData, index }) => {
  const location = useLocation()
  const recru = location.pathname.search('cruitment') > 0 ? true : false
  const recom = location.pathname.search('commendation') > 0 ? true : false
  const own = location.pathname.search('own') > 0 ? true : false
  const [isExpand, setIsExpand] = useState(false)
  const deleteCareer = (id) => {
    if (recru) {
      axios
        .delete('/api/deleteRecruitment', { data: { _id: id } })
        .then((res) => {
          setData((data) => {
            let newData = [...data]
            newData.splice(index, 1)
            return newData
          })
          alert('delete ' + res.data.data)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    } else if (recom) {
      axios
        .delete('/api/recommendation', { data: { _id: id } })
        .then((res) => {
          setData((data) => {
            let newData = [...data]
            newData.splice(index, 1)
            return newData
          })
          alert('delete ' + res.data.title)
        })
        .catch((err) => {
          err.response.data.description && alert('錯誤\n' + err.response.data.description)
        })
    }
  }
  const spec = (li) => {
    return (
      <div key={li} style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>
        {li}
      </div>
    )
  }
  return recru ? (
    <div className="CareerBlock" key={post._id}>
      <Link to={`/profile/${post.account}`}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={post.image ? post.image : eesa} alt="eesa" />
          }
          values={[[`${post.title.company_name} 徵 ${post.title.work_type}`]]}
        />
      </Link>
      <hr></hr>
      <div className="careercontent">
        <h3 style={{ fontWeight: '600' }}>
          {post.title.title}
          {own ? (
            <>
              <Link to={`/edit_recruitment/${post._id}`}>
                <CIcon icon="cil-pencil" name="cil-pencil"></CIcon>
              </Link>
              <CAvatar className="hover-pointer">
                <CIcon
                  icon="cil-trash"
                  name="cil-trash"
                  onClick={() => deleteCareer(post._id)}
                ></CIcon>
              </CAvatar>
            </>
          ) : (
            <></>
          )}
        </h3>
        <h2 style={{ margin: '1rem 0rem', fontWeight: '600', color: 'red' }}>{post.info.salary}</h2>
        <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求學歷：</h3>
        <div style={{ lineHeight: '2.5rem', fontSize: '1.6rem' }}>{post.info.diploma}</div>
        {!isExpand && <button onClick={() => setIsExpand(true)}>Show more...</button>}
        {isExpand && (
          <>
            <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>工作經驗限制：</h3>
            <h4>{post.info.experience.map((exp) => spec(exp))}</h4>
            <h3 style={{ fontWeight: '600', margin: '1.3rem 0 0.1rem' }}>要求條件：</h3>
            <h4>{post.spec.requirement.map((req) => spec(req))}</h4>
            <h3 style={{ fontWeight: '600', margin: '1rem 0 0.1rem' }}>說明：</h3>
            <h4>{parser(post.spec.description)}</h4>
            <button onClick={() => setIsExpand(false)}>Show less...</button>
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="CareerBlock" key={post._id}>
      <Link to={`/profile/${post.account}`}>
        <CWidgetBrand
          className="pt-4 widgetbrand"
          headerChildren={
            <img className="eesa img-fluid" src={post.image ? post.image : eesa} alt="eesa" />
          }
          values={[[post.title.title]]}
        />
      </Link>
      <hr></hr>
      <div className="careercontent">
        <h3>
          {post.title.name} asking for <nobr>{post.title.desire_work_type}</nobr>
          {own ? (
            <>
              <Link to={`/edit_recommendation/${post._id}`}>
                <CIcon icon="cil-pencil" name="cil-pencil"></CIcon>
              </Link>
              <CAvatar className="hover-pointer">
                <CIcon
                  icon="cil-trash"
                  name="cil-trash"
                  onClick={() => deleteCareer(post._id)}
                ></CIcon>
              </CAvatar>
            </>
          ) : (
            <></>
          )}
        </h3>
        <div style={{ fontSize: '1.39rem' }}>
          <span style={{ color: 'red', fontWeight: '500' }}>{post.info.diploma}</span> |{' '}
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
CareerBlock.propTypes = {
  post: PropTypes.object,
  setData: PropTypes.func,
  index: PropTypes.number,
}
export default CareerBlock
