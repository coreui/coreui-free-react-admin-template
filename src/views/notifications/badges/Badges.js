import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CBadge,
  CRow
} from '@coreui/react-ts'
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
            <CBadge className="mr-1" color="primary" shape="rounded-pill">Primary</CBadge>
            <CBadge className="mr-1" color="secondary" shape="rounded-pill">Secondary</CBadge>
            <CBadge className="mr-1" color="success" shape="rounded-pill">Success</CBadge>
            <CBadge className="mr-1" color="danger" shape="rounded-pill">Danger</CBadge>
            <CBadge className="mr-1" color="warning" shape="rounded-pill">Warning</CBadge>
            <CBadge className="mr-1" color="info" shape="rounded-pill">Info</CBadge>
            <CBadge className="mr-1" color="light" shape="rounded-pill">Light</CBadge>
            <CBadge className="mr-1" color="dark" shape="rounded-pill">Dark</CBadge>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>
            Badges
            <small> square badges</small>
          </CCardHeader>
          <CCardBody>
            <CBadge className="mr-1" color="primary" shape="rounded-0">Primary</CBadge>
            <CBadge className="mr-1" color="secondary" shape="rounded-0">Secondary</CBadge>
            <CBadge className="mr-1" color="success" shape="rounded-0">Success</CBadge>
            <CBadge className="mr-1" color="danger" shape="rounded-0">Danger</CBadge>
            <CBadge className="mr-1" color="warning" shape="rounded-0">Warning</CBadge>
            <CBadge className="mr-1" color="info" shape="rounded-0">Info</CBadge>
            <CBadge className="mr-1" color="light" shape="rounded-0">Light</CBadge>
            <CBadge className="mr-1" color="dark" shape="rounded-0">Dark</CBadge>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Badges
