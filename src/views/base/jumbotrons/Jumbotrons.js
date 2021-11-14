import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { DocsLink } from 'src/components'

const Jumbotrons = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Jumbotron
          <DocsLink name="CJumbotron" />
        </CCardHeader>
        <CCardBody>
          <CContainer className="py-5" fluid>
            <h1 className="display-5 fw-bold">Custom jumbotron</h1>
            <p className="col-md-8 fs-4">
              Using a series of utilities, you can create this jumbotron, just like the one in
              previous versions of Bootstrap. Check out the examples below for how you can remix and
              restyle it to your liking.
            </p>
            <CButton size="lg">Example button</CButton>
          </CContainer>
          <CRow className="align-items-md-stretch">
            <CCol md={6}>
              <div className="h-100 p-5 text-white bg-dark rounded-3">
                <h2>Change the background</h2>
                <p>
                  Swap the background-color utility and add a `.text-*` color utility to mix up the
                  jumbotron look. Then, mix and match with additional component themes and more.
                </p>
                <CButton color="light" variant="outline">
                  DocsExample button
                </CButton>
              </div>
            </CCol>
            <CCol md={6}>
              <div className="h-100 p-5 bg-light border rounded-3">
                <h2>Add borders</h2>
                <p>
                  Or, keep it light and add a border for some added definition to the boundaries of
                  your content. Be sure to look under the hood at the source HTML here as we&#39;ve
                  adjusted the alignment and sizing of both column&#39;s content for equal-height.
                </p>
                <CButton color="secondary" variant="outline">
                  DocsExample button
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Jumbotrons
