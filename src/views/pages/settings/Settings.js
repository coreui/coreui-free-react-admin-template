import React from 'react'
import { CCol, CRow, CFormInput, CFormLabel, CFormCheck, CFormSelect } from '@coreui/react'
import { cilSwapHorizontal, cilSync, cilCode } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

export const Settings = () => {
  return (
    <div>
      <h4>System Settings</h4>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Membership
          </CFormLabel>
        </CCol>
        <CCol sm={9} style={{ marginTop: '10px' }}>
          <CFormCheck type="checkbox" id="gridCheck1" label="Anyone can register" />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CFormLabel htmlFor="inputEmail3" className="col-form-label">
            New User Default Role
          </CFormLabel>
        </CCol>
        <CCol sm={4} style={{ marginTop: '10px' }}>
          <CFormLabel className="visually-hidden" htmlFor="inlineFormSelectPref">
            Preference
          </CFormLabel>
          <CFormSelect id="inlineFormSelectPref">
            <option>Choose...</option>
            <option value="Subscriber">Subscriber</option>
            <option value="Customer">Customer</option>
            <option value="Creative">Creative</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CFormLabel htmlFor="inputEmail3" className="col-form-label">
            Site Language
          </CFormLabel>
        </CCol>
        <CCol sm={4} style={{ marginTop: '10px' }}>
          <CFormLabel className="visually-hidden" htmlFor="inlineFormSelectPref">
            Preference
          </CFormLabel>
          <CFormSelect id="inlineFormSelectPref">
            <option>Choose...</option>
            <option value="Subscriber">English (United States)</option>
            <option value="Customer">Customer</option>
            <option value="Creative">Creative</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CFormLabel htmlFor="inputEmail3" className=" col-form-label">
            Timezone
          </CFormLabel>
        </CCol>
        <CCol sm={6} style={{ marginTop: '10px' }}>
          <CFormLabel className="visually-hidden" htmlFor="inlineFormSelectPref">
            Preference
          </CFormLabel>
          <CFormSelect id="inlineFormSelectPref">
            <option>UTC + 0</option>
          </CFormSelect>
          <div style={{ color: 'gray', marginTop: '5px', fontSize: '12px' }}>
            <p>Choose either a city in the same timezone as you or a UTC time offset.</p>
            <p style={{ marginTop: 0 }}>Universal time is 2021 - 11 - 05 06: 30: 00</p>
          </div>
        </CCol>
      </CRow>
      <CRow className="mb-5">
        <CCol sm={6}>
          <CRow>
            <CCol>Date Format</CCol>
            <CCol>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>November 5, 2021</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>2021 - 11 - 05</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>11/05/2021</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>Custom</span>
                </CCol>
              </CRow>
              <CRow>
                <span style={{ color: '#797979' }}>Preview: November 5, 2021</span>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
        <CCol sm={6}>
          <CRow>
            <CCol>Time Format</CCol>
            <CCol>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>6:42 am</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>6:42 am</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>06:42</span>
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol>
                  <CFormCheck type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                  <span style={{ marginLeft: '20px', color: '#797979' }}>Custom</span>
                </CCol>
              </CRow>
              <CRow>
                <span style={{ color: '#797979' }}>Preview: 6:42am</span>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CCol sm={3}>
          <CFormLabel htmlFor="inputEmail3" className=" col-form-label">
            Coin conversion
          </CFormLabel>
        </CCol>
        <CCol md={2}>
          <CFormInput type="email" id="inputEmail4" placeholder="50,000 NAIRA" />
        </CCol>
        <CCol md={1} style={{ marginTop: '8px' }}>
          <CIcon icon={cilSwapHorizontal} size="xl" />
        </CCol>
        <CCol md={2}>
          <CFormInput type="email" id="inputEmail4" placeholder="50,000 COIN" />
        </CCol>
        {/* <CCol sm={9} style={{ marginTop: '10px' }}>
          <CFormCheck type="checkbox" id="gridCheck1" label="Anyone can register" />
        </CCol> */}
      </CRow>
    </div>
  )
}
