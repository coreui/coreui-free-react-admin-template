import React from 'react'
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbRouter,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLink
} from '@coreui/react-ts'
import { DocsLink } from 'src/reusable'
import routes from '../../../routes'

const Breadcrumbs = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>
            Bootstrap Breadcrumb
            <DocsLink name="CBreadcrumb"/>
          </CCardHeader>
          <CCardBody>
            <h6>CBreadcrumbRouter wrapper component</h6>
            <CBreadcrumbRouter routes={routes}/>
            <h6>Manual</h6>
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
              <CBreadcrumbItem active>
                Bootstrap
              </CBreadcrumbItem>
            </CBreadcrumb>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Breadcrumbs
