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
  CFormCheck,
} from '@coreui/react'
function Createconsignor({ formData, setForm, navigation }) {
  const {
    consignmentbookingdate,
    biltytype,
    bookingrefference,
    brokerdetails,
    billdate,
    billno,
    taxpaidby,
    from,
    valueofgoods,
    to,
    packingsize,
    partymark,
    brokernote,
    shippingrisk,
    ewaybillno,
    ewaybilldate,
    distancelevel,
  } = formData
  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="dark">
                  <strong>Consignment Summary </strong>
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel htmlFor="Quantity">Consignment Booking Date :</CFormLabel>
                  <CFormControl
                    type="text"
                    name="consignmentbookingdate"
                    onChange={setForm}
                    value={consignmentbookingdate}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Bilty Type :</CFormLabel>
                  <CFormControl type="text" onChange={setForm} name="biltytype" value={biltytype} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Booking refference :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="bookingrefference"
                    value={bookingrefference}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Broker Details :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="brokerdetails"
                    value={brokerdetails}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Bill Date :</CFormLabel>
                  <CFormControl type="text" onChange={setForm} name="billdate" value={billdate} />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="weightType">Bill no. :</CFormLabel>
                  <CFormControl name="billno" type="Text" onChange={setForm} value={billno} />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">Value of Goods (Rs.) :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="valueofgoods"
                    value={valueofgoods}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">Tax Paid by :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="taxpaidby"
                    value={taxpaidby}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>From</CFormLabel>
                  <CFormControl type="number" onChange={setForm} value={from} name="from" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>To </CFormLabel>
                  <CFormControl type="number" id="" onChange={setForm} value={to} name="to" />
                </CCol>

                <CCol md="4">
                  <CFormLabel htmlFor="inputState">payment Terms</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>To Pay</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="info">
                  <strong>Packing Summary </strong>
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel htmlFor="Quantity">Packing Size :</CFormLabel>
                  <CFormControl
                    type="text"
                    name="packingsize"
                    onChange={setForm}
                    value={packingsize}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Private/Party Mark :</CFormLabel>
                  <CFormControl type="text" onChange={setForm} name="partymark" value={partymark} />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Remarks/Broker Note :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="brokernote"
                    value={brokernote}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Shipping Risk :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="shippingrisk"
                    value={shippingrisk}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>E-way Bill no :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="ewaybillno"
                    value={ewaybillno}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="weightType">E-way bill date :</CFormLabel>
                  <CFormControl
                    name="ewaybilldate"
                    type="Text"
                    onChange={setForm}
                    value={ewaybilldate}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">Distance Level(Km) :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={setForm}
                    name="distancelevel"
                    value={distancelevel}
                  />
                </CCol>

                <CCol md="4">
                  <CFormLabel htmlFor="inputState">payment Terms</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>To Pay</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="info">
                  <strong>Shipping Address</strong>
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CRow className="mb-3">
              <div className="col-sm-10 offset-sm-2">
                <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" />
              </div>
            </CRow>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel htmlFor="Quantity">Packing Size :</CFormLabel>
                  <CFormControl
                    type="text"
                    name="packingsize"
                    onChange={setForm}
                    value={formData.packingsize}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Private/Party Mark :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="partymark"
                    value={formData.partymark}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Remarks/Broker Note :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={setForm}
                    name="brokernote"
                    value={formData.brokernote}
                  />
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
                      Next
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
