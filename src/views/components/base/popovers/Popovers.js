import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CPopover, CRow, CCol } from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const Popovers = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Popover" href="components/popover" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Popover</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <Example href="components/popover">
              <CPopover
                title="Popover title"
                content="And here’s some amazing content. It’s very engaging. Right?"
                placement="end"
              >
                <CButton color="danger" size="lg">
                  Click to toggle popover
                </CButton>
              </CPopover>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Popover</strong> <small>Four directions</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Four options are available: top, right, bottom, and left aligned. Directions are
              mirrored when using CoreUI for React in RTL.
            </p>
            <Example href="components/popover#four-directions">
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="top"
              >
                <CButton color="secondary">Popover on top</CButton>
              </CPopover>
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="end"
              >
                <CButton color="secondary">Popover on right</CButton>
              </CPopover>
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="bottom"
              >
                <CButton color="secondary">Popover on bottom</CButton>
              </CPopover>
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="start"
              >
                <CButton color="secondary">Popover on left</CButton>
              </CPopover>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Popovers
