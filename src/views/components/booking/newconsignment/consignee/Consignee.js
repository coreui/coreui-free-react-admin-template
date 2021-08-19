import React from 'react'
import PropTypes from 'prop-types'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormControl,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CListGroupItem,
  CListGroup,
} from '@coreui/react'
function Createconsignor({ formData, setForm, navigation }) {
  const {
    consigneename,
    consigneeaddress1,
    consigneeaddress2,
    state,
    city,
    consigneemobile1,
    consigneeamobile,
    email,
    pincode,
    consigneegstno,
  } = formData
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="danger">
                  <strong>Consignee </strong>
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel htmlFor="Quantity">Consignor Name :</CFormLabel>
                  <CFormControl
                    type="text"
                    name="consigneename"
                    onChange={setForm}
                    value={consigneename}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Address 1 :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="consigneeaddress1"
                    value={consigneeaddress1}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Address 2 :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="consigneeaddress2"
                    value={consigneeaddress2}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>State :</CFormLabel>
                  <CFormControl type="number" onChange={setForm} name="state" value={state} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>City :</CFormLabel>
                  <CFormControl type="text" onChange={setForm} name="city" value={city} />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="weightType">Pin Code :</CFormLabel>
                  <CFormControl name="pincode" type="Text" onChange={setForm} value={pincode} />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">Mobile no :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="consigneemobile1"
                    value={consigneemobile1}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">Alternate Mobile :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="consigneeamobile"
                    value={consigneeamobile}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Email</CFormLabel>
                  <CFormControl type="number" onChange={setForm} value={email} name="email" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Consignee Gst No </CFormLabel>
                  <CFormControl
                    type="number"
                    id=""
                    onChange={setForm}
                    value={consigneegstno}
                    name="consigneegstno"
                  />
                </CCol>

                <CCol md="4">
                  <CFormLabel htmlFor="inputState">State</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol>

                <CCol xs="12">
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <CButton
                      onClick={() => navigation.previous()}
                      className="d-grid gap-2 d-md-flex justify-content-md-end"
                    >
                      Back
                    </CButton>
                    <CButton
                      onClick={() => navigation.next()}
                      className="d-grid gap-2 d-md-flex justify-content-md-end"
                    >
                      Submit Consignor
                    </CButton>
                  </div>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCardHeader>Total Items in cart :</CCardHeader>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Class</CTableHeaderCell>
              <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
              <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">1</CTableHeaderCell>
              <CTableDataCell>Mark</CTableDataCell>
              <CTableDataCell>Otsadsadasdsadasdasdadasdadsadsadadasdto</CTableDataCell>
              <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell scope="row">2</CTableHeaderCell>
              <CTableDataCell>Jacob</CTableDataCell>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell>@fat</CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
        {/* <CCol xs="12">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton onClick={() => navigation.next()} type="submit" color="warning">
              Add to Bilty
            </CButton>
          </div>
        </CCol> */}
      </CRow>
    </div>
  )
}

export default Createconsignor
Createconsignor.propTypes = {
  formData: PropTypes.any,
  setForm: PropTypes.any,
  navigation: PropTypes.any,
}
