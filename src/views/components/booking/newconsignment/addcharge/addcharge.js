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
  CListGroupItem,
  CListGroup,
} from '@coreui/react'
function Createconsignor({ formData, setForm, navigation }) {
  const {
    rc,
    hamaili,
    servicecharge,
    statisticalcharge,
    covercharge,
    insurancecharge,
    ddcharge,
    packingcharge,
    othercharge,
    feecharge,
    doordeliverycharges,
  } = formData

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="dark">
                  <strong>Add Charges </strong>
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel>R.C :</CFormLabel>
                  <CFormControl type="number" onChange={setForm} name="rc" value={rc} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Hamali :</CFormLabel>
                  <CFormControl type="number" onChange={setForm} name="hamaili" value={hamaili} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Service Charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="servicecharge"
                    value={servicecharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Statistical charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="statisticalcharge "
                    value={statisticalcharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Cover Charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="covercharge"
                    value={covercharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Insurance charge on invoice (%) :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="insurancecharge"
                    value={insurancecharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>D.D. Charge :</CFormLabel>
                  <CFormControl type="number" onChange={setForm} name="ddcharge" value={ddcharge} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Packing Charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="packingcharge"
                    value={packingcharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Other Charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="othercharge"
                    value={othercharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Fee Charge :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="feecharge"
                    value={feecharge}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Door Delivery Charges :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="doordeliverycharges"
                    value={doordeliverycharges}
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
    </div>
  )
}

export default Createconsignor
Createconsignor.propTypes = {
  formData: PropTypes.any,
  setForm: PropTypes.any,
  navigation: PropTypes.any,
}
