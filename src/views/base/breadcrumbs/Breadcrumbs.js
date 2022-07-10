import React from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Breadcrumbs = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Breadcrumb</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              The breadcrumb navigation provides links back to each previous page the user navigated
              through and shows the current location in a website or an application. You don’t have
              to add separators, because they automatically added in CSS through{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/::before">
                {' '}
                <code>::before</code>
              </a>{' '}
              and{' '}
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/content">
                {' '}
                <code>content</code>
              </a>
              .
            </p>
            <DocsExample href="components/breadcrumb">
              <CBreadcrumb>
                <CBreadcrumbItem>
                  <CLink href="#">Home</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem active>Library</CBreadcrumbItem>
              </CBreadcrumb>
              <CBreadcrumb>
                <CBreadcrumbItem>
                  <CLink href="#">Home</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem>
                  <CLink href="#">Library</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem active>Data</CBreadcrumbItem>
              </CBreadcrumb>
              <CBreadcrumb>
                <CBreadcrumbItem>
                  <CLink href="#">Home</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem>
                  <CLink href="#">Library</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem>
                  <CLink href="#">Data</CLink>
                </CBreadcrumbItem>
                <CBreadcrumbItem active>Bootstrap</CBreadcrumbItem>
              </CBreadcrumb>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Breadcrumbs
