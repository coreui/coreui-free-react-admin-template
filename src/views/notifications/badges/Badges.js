import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Badges = () => {
  return (
    <CRow>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Badges
            <DocsLink name="CBadge"/>
          </CCardHeader>
          <CCardBody>
            <h1>Example heading <CBadge color="secondary">New</CBadge></h1>
            <h2>Example heading <CBadge color="secondary">New</CBadge></h2>
            <h3>Example heading <CBadge color="secondary">New</CBadge></h3>
            <h4>Example heading <CBadge color="secondary">New</CBadge></h4>
            <h5>Example heading <CBadge color="secondary">New</CBadge></h5>
            <h6>Example heading <CBadge color="secondary">New</CBadge></h6>
          </CCardBody>
          <CCardFooter>
            <CButton color="secondary">
              Notifications <CBadge color="primary" shape="pill" style={{ position: 'static' }}>9</CBadge>
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            Badges
            <small> contextual variations</small>
          </CCardHeader>
          <CCardBody>
            <CBadge className="mr-1" color="primary">Primary</CBadge>
            <CBadge className="mr-1" color="secondary">Secondary</CBadge>
            <CBadge className="mr-1" color="success">Success</CBadge>
            <CBadge className="mr-1" color="danger">Danger</CBadge>
            <CBadge className="mr-1" color="warning">Warning</CBadge>
            <CBadge className="mr-1" color="info">Info</CBadge>
            <CBadge className="mr-1" color="light">Light</CBadge>
            <CBadge className="mr-1" color="dark">Dark</CBadge>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Badges
            <small> pill badges</small>
          </CCardHeader>
          <CCardBody>
            <CBadge className="mr-1" color="primary" shape="pill">Primary</CBadge>
            <CBadge className="mr-1" color="secondary" shape="pill">Secondary</CBadge>
            <CBadge className="mr-1" color="success" shape="pill">Success</CBadge>
            <CBadge className="mr-1" color="danger" shape="pill">Danger</CBadge>
            <CBadge className="mr-1" color="warning" shape="pill">Warning</CBadge>
            <CBadge className="mr-1" color="info" shape="pill">Info</CBadge>
            <CBadge className="mr-1" color="light" shape="pill">Light</CBadge>
            <CBadge className="mr-1" color="dark" shape="pill">Dark</CBadge>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Badges
            <small> links</small>
          </CCardHeader>
          <CCardBody>
            <CBadge className="mr-1" href="#" color="primary">Primary</CBadge>
            <CBadge className="mr-1" href="#" color="secondary">Secondary</CBadge>
            <CBadge className="mr-1" href="#" color="success">Success</CBadge>
            <CBadge className="mr-1" href="#" color="danger">Danger</CBadge>
            <CBadge className="mr-1" href="#" color="warning">Warning</CBadge>
            <CBadge className="mr-1" href="#" color="info">Info</CBadge>
            <CBadge className="mr-1" href="#" color="light">Light</CBadge>
            <CBadge className="mr-1" href="#" color="dark" shape="pill">Dark</CBadge>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Badges
