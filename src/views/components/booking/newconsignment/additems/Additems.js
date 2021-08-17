import React from 'react'
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
function handleSubmit(e) {}
function Additems() {
  return (
    <div>
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
        <CCol xs="12">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton onClick={handleSubmit} type="submit" color="warning">
              Add to Bilty
            </CButton>
          </div>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CListGroup>
                <CListGroupItem color="success">
                  Item <strong>1 </strong>
                  Detail
                </CListGroupItem>
              </CListGroup>
            </CCardHeader>
            <CCardBody>
              <CForm className="row g-3">
                <CCol md="3">
                  <CFormLabel htmlFor="Quantity">Quantity :</CFormLabel>
                  <CFormControl type="number" id="quantity" />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Package Type :</CFormLabel>
                  <CFormControl type="text" id="Package" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Product Details :</CFormLabel>
                  <CFormControl type="text" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Actual Weight :</CFormLabel>
                  <CFormControl type="number" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Gross Weight :</CFormLabel>
                  <CFormControl type="number" />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="weightType">Weight Type :</CFormLabel>
                  <CFormControl type="Text" id="weighttype" />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">GST % :</CFormLabel>
                  <CFormControl type="number" id="gst" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Rate per return :</CFormLabel>
                  <CFormControl type="number" id="" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Rate </CFormLabel>
                  <CFormControl type="number" id="" />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Actual Weight</CFormLabel>
                  <CFormControl type="number" id="" />
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
                    <CButton className="d-grid gap-2 d-md-flex justify-content-md-end">
                      Add Item
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

export default Additems
