import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow } from '@coreui/react'
import { Example } from 'src/reusable'

const Select = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Default</small>
          </CCardHeader>
          <CCardBody>
            <Example href="https://coreui.io/react/docs/4.0/forms/select">
              <CFormSelect aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              You may also choose from small and large custom selects to match our similarly sized
              text inputs.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/select#sizing">
              <CFormSelect size="lg" className="mb-3" aria-label="Large select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
              <CFormSelect size="sm" className="mb-3" aria-label="Small select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </Example>
            <p className="text-medium-emphasis small">
              The <code>multiple</code> attribute is also supported:
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/select#sizing">
              <CFormSelect size="lg" multiple aria-label="Multiple select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </Example>
            <p className="text-medium-emphasis small">
              As is the <code>htmlSize</code> property:
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/select#sizing">
              <CFormSelect size="lg" multiple aria-label="Multiple select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>disabled</code> boolean attribute on a select to give it a grayed out
              appearance and remove pointer events.
            </p>
            <Example href="https://coreui.io/react/docs/4.0/forms/select#disabled">
              <CFormSelect aria-label="Disabled select example" disabled>
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      {/* <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small></small>
          </CCardHeader>
          <CCardBody>
            <Example href="https://coreui.io/react/docs/4.0/forms/select">

            </Example>
          </CCardBody>
        </CCard>
      </CCol> */}
    </CRow>
  )
}

export default Select
