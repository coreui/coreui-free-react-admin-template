import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CPopover, CRow, CCol } from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'

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
            <DocsExample href="components/popover">
              <CPopover
                title="Popover title"
                content="And here’s some amazing content. It’s very engaging. Right?"
                placement="right"
              >
                <CButton color="danger" size="lg">
                  Click to toggle popover
                </CButton>
              </CPopover>
            </DocsExample>
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
            <DocsExample href="components/popover#four-directions">
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="top"
              >
                <CButton color="secondary">Popover on top</CButton>
              </CPopover>
              <CPopover
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="right"
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
                placement="left"
              >
                <CButton color="secondary">Popover on left</CButton>
              </CPopover>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Popovers
