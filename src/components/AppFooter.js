import React from 'react'
import { CCol, CFooter, CRow } from '@coreui/react'
import eesa from '../assets/images/eesa-icon.png'
import { cilAlignCenter } from '@coreui/icons'

const AppFooter = () => {
  return (
    <div style={{ backgroundColor: '#002958', color: 'white' }}>
      <CRow
        xs={10}
        style={{
          width: '100%',
        }}
        alignHorizontal="center"
      >
        <CCol
          xs={9}
          style={{
            lineHeight: '1.9rem',
            fontSize: '1rem',
            marginLeft: '0.5rem',
            marginTop: '1rem',
          }}
        >
          國立臺灣大學電機工程學系 系學會 <br />
          <div style={{ fontWeight: '600' }}>
            National Taiwan University Electrical Engineering Department Student Association <br />{' '}
            Email: ntueesa@gmail.com
          </div>
        </CCol>
        <CCol
          xs={2}
          style={{
            margin: '0.5rem 0',
          }}
        >
          <img src={eesa} alt="eesa" className="img-fluid" />
        </CCol>
      </CRow>
      <div
        className="d-flex flex-column align-items-center text-center"
        style={{ backgroundColor: '#001936', width: '100%' }}
      >
        Copyright © 2021 NTUEESA
      </div>
    </div>
  )
}

export default React.memo(AppFooter)
