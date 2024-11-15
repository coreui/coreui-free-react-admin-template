import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CSpinner, CRow } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const Spinners = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="components/spinner/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Spinner</strong> <small>Border</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use the border spinners for a lightweight loading indicator.
            </p>
            <DocsExample href="components/spinner">
              <CSpinner />
            </DocsExample>
            <p className="text-body-secondary small">
              The border spinner uses <code>currentColor</code> for its <code>border-color</code>.
              You can use any of our text color utilities on the standard spinner.
            </p>
            <DocsExample href="components/spinner#colors">
              <CSpinner color="primary" />
              <CSpinner color="secondary" />
              <CSpinner color="success" />
              <CSpinner color="danger" />
              <CSpinner color="warning" />
              <CSpinner color="info" />
              <CSpinner color="light" />
              <CSpinner color="dark" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Spinner</strong> <small>Growing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If you don&#39;tfancy a border spinner, switch to the grow spinner. While it
              doesn&#39;t technically spin, it does repeatedly grow!
            </p>
            <DocsExample href="components/spinner#growing-spinner">
              <CSpinner variant="grow" />
            </DocsExample>
            <p className="text-body-secondary small">
              Once again, this spinner is built with <code>currentColor</code>, so you can easily
              change its appearance. Here it is in blue, along with the supported variants.
            </p>
            <DocsExample href="components/spinner#growing-spinner">
              <CSpinner color="primary" variant="grow" />
              <CSpinner color="secondary" variant="grow" />
              <CSpinner color="success" variant="grow" />
              <CSpinner color="danger" variant="grow" />
              <CSpinner color="warning" variant="grow" />
              <CSpinner color="info" variant="grow" />
              <CSpinner color="light" variant="grow" />
              <CSpinner color="dark" variant="grow" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Spinner</strong> <small>Size</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Add <code>size=&#34;sm&#34;</code> property to make a smaller spinner that can quickly
              be used within other components.
            </p>
            <DocsExample href="components/spinner#size">
              <CSpinner size="sm" />
              <CSpinner size="sm" variant="grow" />
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Spinner</strong> <small>Buttons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Use spinners within buttons to indicate an action is currently processing or taking
              place. You may also swap the text out of the spinner element and utilize button text
              as needed.
            </p>
            <DocsExample href="components/spinner#buttons">
              <CButton color="primary" disabled>
                <CSpinner as="span" size="sm" aria-hidden="true" />
              </CButton>
              <CButton color="primary" disabled>
                <CSpinner as="span" size="sm" aria-hidden="true" />
                Loading...
              </CButton>
            </DocsExample>
            <DocsExample href="components/spinner#buttons">
              <CButton color="primary" disabled>
                <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
              </CButton>
              <CButton color="primary" disabled>
                <CSpinner as="span" size="sm" variant="grow" aria-hidden="true" />
                Loading...
              </CButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Spinners
