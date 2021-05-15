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
import { DocsLink } from 'src/reusable'

const Breadcrumbs = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard className="mb-4">
          <CCardHeader>
            Bootstrap Breadcrumb
            <DocsLink name="CBreadcrumb" />
          </CCardHeader>
          <CCardBody>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Breadcrumbs
