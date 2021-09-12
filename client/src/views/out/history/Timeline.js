/* eslint-disable prettier/prettier */
import React from 'react'
import { Chrono } from 'react-chrono'
import HistBlock from './HistBlock'
import PropTypes from 'prop-types'
import { CCol, CContainer, CImage, CRow } from '@coreui/react'
import { history_icon } from '.'

const Timeline = ({ data }) => {
  const items = data.history.map((year) => {
    return {
      title: year.grade,
      cardTitle: year.title,
    }
  })
  const setIcons = () => {
    for (let i = 0; i < data.history.length; i++) {
      return
    }
  }

  return (
    <div style={{ width: '100%' }} className="text-color-black">
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        slideShow
        slideItemDuration={4500}
        theme={{ cardBgColor: 'azure', primary: '#0000e3a3' }}
      >
        <div className="chrono-icons">
          {data.history.map((year) => (
            <img
              src={history_icon}
              alt="icon"
              key={year.grade}
              style={{ backgroundColor: '#0000e3a3', borderRadius: '50%', height: '100%' }}
            />
          ))}
        </div>
        {data.history.map((year) => {
          return <HistBlock people={year.people} key={year.grade} />
        })}
      </Chrono>
      <br />
      <CContainer style={{ color: 'white' }}>
        <CRow className="justify-content-center align-items-center">
          <CCol xs={6} className="justify-content-center">
            <CImage src={data.allImg} alt="" className="img-fluid" style={{ margin: 'shadow' }} />
          </CCol>
          <CCol xs={4}>
            <h3>今年部員:</h3>
            {data.member.map((person) => {
              return (
                <span key={person} style={{ fontSize: '1.3rem' }}>
                  {person}{' '}
                </span>
              )
            })}
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
Timeline.propTypes = {
  data: PropTypes.array,
}

export default Timeline
