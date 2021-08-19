import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
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

const Additems = ({ setForm, navigation }) => {
  const [items, setItems] = useState([])
  const [addFormData, setAddFormData] = useState({
    quantity: '',
    packageType: '',
    productDetails: '',
    actualWeight: '',
    grossWeight: '',
    weighttype: '',
    gst: '',
    rateperreturn: '',
    rate: '',
  })

  // const {
  //   quantity,
  //   packagetype,
  //   productdetails,
  //   actualweight,
  //   grossweight,
  //   weighttype,
  //   gst,
  //   rateperreturn,
  //   rate,
  // } = formData
  const handleItems = (event) => {
    event.preventDefault()
    const fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value
    const newFormData = { ...addFormData }
    newFormData[fieldName] = fieldValue
    setAddFormData(newFormData)
  }
  const handleItemsSubmit = (event) => {
    // event.preventDefault()

    const newItem = {
      id: nanoid(),
      quantity: addFormData.quantity,
      packagetype: addFormData.packagetype,
      productdetails: addFormData.productdetails,
      actualweight: addFormData.actualweight,
      grossweight: addFormData.grossweight,
      weighttype: addFormData.weighttype,
      gst: addFormData.gst,
      rateperreturn: addFormData.rateperreturn,
      rate: addFormData.rate,
    }
    const newItems = [...items, newItem]
    setItems(newItems)
  }
  return (
    <div>
      <CRow>
        <CCardHeader>Total Items in cart :</CCardHeader>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">quantity</CTableHeaderCell>
              <CTableHeaderCell scope="col">packagetype</CTableHeaderCell>
              <CTableHeaderCell scope="col">productdetails</CTableHeaderCell>
              <CTableHeaderCell scope="col">actualweight</CTableHeaderCell>
              <CTableHeaderCell scope="col">grossweight</CTableHeaderCell>
              <CTableHeaderCell scope="col">weighttype</CTableHeaderCell>
              <CTableHeaderCell scope="col">gst</CTableHeaderCell>
              <CTableHeaderCell scope="col">rateperreturn</CTableHeaderCell>
              <CTableHeaderCell scope="col">rate</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {items.map((item) => (
              <>
                <CTableRow>
                  <CTableHeaderCell scope="row">{item.quantity}</CTableHeaderCell>
                  <CTableDataCell>{item.packagetype}</CTableDataCell>
                  <CTableDataCell>{item.productdetails}</CTableDataCell>
                  <CTableDataCell>{item.actualweight}</CTableDataCell>
                  <CTableDataCell>{item.grossweight}</CTableDataCell>
                  <CTableDataCell>{item.weighttype}</CTableDataCell>{' '}
                  <CTableDataCell>{item.gst}</CTableDataCell>
                  <CTableDataCell>{item.rateperreturn}</CTableDataCell>{' '}
                  <CTableDataCell>{item.rate}</CTableDataCell>
                  {/* <CTableDataCell>{item.no}</CTableDataCell> */}
                </CTableRow>
              </>
            ))}
          </CTableBody>
        </CTable>
        <CCol xs="12">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton onClick={() => navigation.next()} type="submit" color="warning">
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
                  <CFormControl
                    type="number"
                    name="quantity"
                    onChange={handleItems}
                    // value={quantity}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="Package">Package Type :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={handleItems}
                    name="packagetype"

                    // value={packagetype}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Product Details :</CFormLabel>
                  <CFormControl
                    type="text"
                    onChange={handleItems}
                    name="productdetails"
                    // value={productdetails}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Actual Weight :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={handleItems}
                    name="actualweight"
                    // value={actualweight}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Gross Weight :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={handleItems}
                    name="grossweight"
                    // value={grossweight}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="weightType">Weight Type :</CFormLabel>
                  <CFormControl
                    name="weighttype"
                    type="Text"
                    onChange={handleItems}
                    id="weighttype"
                    // value={weighttype}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel htmlFor="gst">GST % :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={handleItems}
                    id="gst"
                    name="gst"
                    //  value={gst}
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Rate per return :</CFormLabel>
                  <CFormControl
                    type="number"
                    onChange={handleItems}
                    id=""
                    // value={rateperreturn}
                    name="rateperreturn"
                  />
                </CCol>
                <CCol md="3">
                  <CFormLabel>Rate </CFormLabel>
                  <CFormControl
                    type="number"
                    id=""
                    onChange={handleItems}
                    //  value={rate}
                    name="rate"
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
                      onClick={() => handleItemsSubmit()}
                      className="d-grid gap-2 d-md-flex justify-content-md-end"
                    >
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
Additems.propTypes = {
  formData: PropTypes.any,
  setForm: PropTypes.any,
  navigation: PropTypes.any,
}
