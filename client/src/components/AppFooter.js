import React from 'react'
import { CCol, CFooter } from '@coreui/react'
import eesa from '../assets/images/eesa-icon.png'

const AppFooter = () => {
  return (
    <>
      <CFooter
        style={{
          backgroundColor: '#002958',
          borderColor: 'transparent',
          color: 'white',
        }}
      >
        <CCol xs={9}>
          國立臺灣大學電機工程學系 系學會 <br />
          <div style={{ fontWeight: '600' }}>
            National Taiwan University Electrical Engineering Department Student Association <br />{' '}
            Email: ntueesa@gmail.com
          </div>
        </CCol>
        <CCol xs={2}>
          <img src={eesa} alt="eesa" className="img-fluid" />
        </CCol>
      </CFooter>
      <CFooter
        className="justify-content-center p-0"
        style={{
          height: '1rem',
          backgroundColor: '#001936',
          borderColor: 'transparent',
          color: 'white',
        }}
      >
        Copyright © 2021 NTUEESA
      </CFooter>
    </>
  )
}

export default React.memo(AppFooter)
