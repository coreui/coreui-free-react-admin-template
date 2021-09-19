/* eslint-disable prettier/prettier */
import { CCol, CImage, CRow } from '@coreui/react'
import React from 'react'
import PropTypes from 'prop-types'

const TeamBlocks = ({ data }) => {
  const minister = data.minister.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <div className="square-img-container">
          <CImage src={person.img} height="200rem" className="img img-fluid" />
        </div>
        <h3 className="mb-4">
          {person.name} {person.part}
        </h3>
      </CCol>
    )
  })
  const front = data.front.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-between">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3 className="mb-4">{person.name}</h3>
      </CCol>
    )
  })
  const back = data.back.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3 className="mb-4">{person.name}</h3>
      </CCol>
    )
  })
  const abroad = data.abroad.map((person) => {
    return (
      <CCol xs={2} key={person.name} align="center" className="justify-content-center">
        <CImage src={person.img} height="200rem" className="img-fluid" />
        <h3 className="mb-4">{person.name}</h3>
      </CCol>
    )
  })
  return (
    <>
      <CCol>
        <CRow className="justify-content-around mt-4 mb-4" style={{ marginBottom: '20rem' }} xs={5}>
          <h3 className="mb-4">負責人：</h3>
          {minister}
        </CRow>
        <CRow className="justify-content-around mt-4 mb-4 " xs={5}>
          <h3 className="mb-4">網頁前端團隊：</h3>
          {front}
        </CRow>
        <CRow className="justify-content-around mt-4 mb-4 " xs={5}>
          <h3 className="mb-4">網頁後端團隊：</h3>
          {back}
        </CRow>
        <CRow className="justify-content-around mt-4 mb-4 " xs={5}>
          <h3 className="mb-4">留學資料蒐集團隊：</h3>
          {abroad}
        </CRow>
      </CCol>
    </>
  )
}
TeamBlocks.propTypes = {
  data: PropTypes.array,
}
export default TeamBlocks
