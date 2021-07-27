/* eslint-disable prettier/prettier */
import React from 'react'
import { CCol, CContainer, CRow } from '@coreui/react'
import PropTypes from 'prop-types'

const HistBlock = ({ people }) => {
  return (
    <CContainer className="align-items-center">
      {/* for desktop and ipad */}
      <CRow className="justify-content-around d-sm-none d-lg-flex">
        {people.map((person) => {
          return (
            <CCol xs={3} key={person.name} align="center" className="justify-content-center mt-2">
              <img
                src={person.img}
                alt=""
                className="img-fluid"
                style={{ boxShadow: '3px 3px 12px gray', padding: '2px', borderRadius: '50%' }}
              />
              <h4 className="mt-2">{person.name}</h4>
            </CCol>
          )
        })}
      </CRow>
      {/* for mobile */}
      <CRow className="justify-content-center d-sm-flex d-lg-none">
        {people.map((person) => {
          return (
            <div key={person.name} style={{ width: '100%' }}>
              <img
                src={person.img}
                alt=""
                className="img-fluid mt-2"
                style={{ boxShadow: '3px 3px 12px gray', padding: '3px', borderRadius: '50%' }}
              />
              <h3 align="center" className="mt-2">
                {person.name}
              </h3>
            </div>
          )
        })}
      </CRow>
    </CContainer>
  )
}
HistBlock.propTypes = {
  people: PropTypes.array,
}
export default HistBlock
