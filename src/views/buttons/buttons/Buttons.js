import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const Buttons = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Standard Buttons
          <DocsLink name="-Button"/>
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          variant="outline" Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            With <code>outline</code> prop.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" active color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="outline" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          variant="ghost" Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-ghost-*</code> class for variant="ghost" buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block active variant="ghost" color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block variant="ghost" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Square Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-square</code> class for square buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="primary">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="square" color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="square" color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader>
          Pill Buttons
        </CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-pill</code> class for pill buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="primary" className="">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="primary" aria-pressed="true">Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="secondary" aria-pressed="true">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="success" aria-pressed="true">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="warning" aria-pressed="true">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="danger" aria-pressed="true">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="info" aria-pressed="true">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="light" aria-pressed="true">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="dark" aria-pressed="true">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="link" aria-pressed="true">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="primary" disabled>Primary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="secondary" disabled>Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="success" disabled>Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="warning" disabled>Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="danger" disabled>Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="info" disabled>Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="light" disabled>Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="dark" disabled>Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton block shape="pill" color="link" disabled>Link</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          Sizes
        </CCardHeader>
        <CCardBody>
          <p>Fancy larger or smaller buttons? Add <code>size="lg"</code> or <code>size="sm"</code> for additional sizes.</p>
          <CRow className="align-items-center">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Small
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="sm">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="secondary" variant="outline" size="sm">Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton size="sm" variant="ghost" color="ghost">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="sm">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger" size="sm">Pill Button</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="outline" color="secondary" >Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="ghost" color="success">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger">Pill Button</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Large
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="lg">Standard Button</CButton>
            </CCol>
            <CCol col="2"className="mb-3 mb-xl-0 text-center">
              <CButton variant="outline" color="secondary" size="lg">Outline Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton variant="ghost" color="success" size="lg">Ghost Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="lg">Square Button</CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="pill" color="danger" size="lg">Pill Button</CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          With Icons
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center mt-3">
            <CCol col="2" className="text-center mt-3">
              <CButton color="primary">
                Standard Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton color="secondary" variant='outline'>
                <CIcon name="cil-lightbulb" />Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton variant="ghost" color="success">
                <CIcon name="cil-lightbulb" />Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="square" color="warning">
                <CIcon name="cil-lightbulb" />Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="pill" color="danger">
                <CIcon name="cil-lightbulb" />Pill Button
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Block Level Buttons
            </CCardHeader>
            <CCardBody>
              <p>Add prop <code>block</code></p>
              <CButton color="secondary" size="lg" block>Block level button</CButton>
              <CButton color="primary" size="lg" block>Block level button</CButton>
              <CButton color="success" size="lg" block>Block level button</CButton>
              <CButton color="info" size="lg" block>Block level button</CButton>
              <CButton color="warning" size="lg" block>Block level button</CButton>
              <CButton color="danger" size="lg" block>Block level button</CButton>
              <CButton color="link" size="lg" block>Block level button</CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Block Level Buttons
            </CCardHeader>
            <CCardBody>
              <p>Add prop <code>block</code></p>
              <CButton variant="outline" color="secondary" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="primary" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="success" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="info" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="warning" size="lg" block>Block level button</CButton>
              <CButton variant="outline" color="danger" size="lg" block>Block level button</CButton>
              <CButton variant="ghost" color="info" size="lg" block>Block level button</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Buttons
