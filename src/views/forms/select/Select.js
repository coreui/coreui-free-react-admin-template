import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const Select = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="forms/select/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Default</small>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/select">
              <CFormSelect aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              You may also choose from small and large custom selects to match our similarly sized
              text inputs.
            </p>
            <DocsExample href="forms/select#sizing">
              <CFormSelect size="lg" className="mb-3" aria-label="Large select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
              <CFormSelect size="sm" className="mb-3" aria-label="Small select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </DocsExample>
            <p className="text-body-secondary small">
              The <code>multiple</code> attribute is also supported:
            </p>
            <DocsExample href="forms/select#sizing">
              <CFormSelect size="lg" multiple aria-label="Multiple select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </DocsExample>
            <p className="text-body-secondary small">
              As is the <code>htmlSize</code> property:
            </p>
            <DocsExample href="forms/select#sizing">
              <CFormSelect size="lg" multiple aria-label="Multiple select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Select</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add the <code>disabled</code> boolean attribute on a select to give it a grayed out
              appearance and remove pointer events.
            </p>
            <DocsExample href="forms/select#disabled">
              <CFormSelect aria-label="Disabled select example" disabled>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </CFormSelect>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Select
