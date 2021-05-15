import React, { useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CCollapse, CRow } from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Collapses = () => {
  const [visible, setVisible] = useState(false)
  const [visibleA, setVisibleA] = useState(false)
  const [visibleB, setVisibleB] = useState(false)

  return (
    <CRow>
      <CCol xl="6">
        <CCard className="mb-4">
          <CCardHeader>
            Collapse
            <DocsLink name="CCollapse" />
          </CCardHeader>
          <CCardBody>
            <CButton
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setVisible(!visible)
              }}
            >
              Link
            </CButton>
            <CButton onClick={() => setVisible(!visible)}>Button</CButton>
            <CCollapse visible={visible}>
              <CCard className="mt-3">
                <CCardBody>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                  richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson
                  cred nesciunt sapiente ea proident.
                </CCardBody>
              </CCard>
            </CCollapse>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xl="6">
        <CCard className="mb-4">
          <CCardHeader>
            Collapse
            <small> multi target</small>
          </CCardHeader>
          <CCardBody>
            <CButton onClick={() => setVisibleA(!visibleA)}>Toggle first element</CButton>
            <CButton onClick={() => setVisibleB(!visibleB)}>Toggle second element</CButton>
            <CButton
              onClick={() => {
                setVisibleA(!visibleA)
                setVisibleB(!visibleB)
              }}
            >
              Toggle both elements
            </CButton>
            <CRow>
              <CCol xs="6">
                <CCollapse visible={visibleA}>
                  <CCard className="mt-3">
                    <CCardBody>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                      richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                      anderson cred nesciunt sapiente ea proident.
                    </CCardBody>
                  </CCard>
                </CCollapse>
              </CCol>
              <CCol xs="6">
                <CCollapse visible={visibleB}>
                  <CCard className="mt-3">
                    <CCardBody>
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                      richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes
                      anderson cred nesciunt sapiente ea proident.
                    </CCardBody>
                  </CCard>
                </CCollapse>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Collapses
