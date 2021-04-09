import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react-ts'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const Buttons = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Standard Buttons
          <DocsLink name="-Button" />
        </CCardHeader>
        <CCardBody>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton href="#" color="primary">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="secondary">Secondary</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="success">Success</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="warning">Warning</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="danger">Danger</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="info">Info</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="light">Light</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="dark">Dark</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="link">Link</CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="primary" aria-pressed="true">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="secondary" aria-pressed="true">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="success" aria-pressed="true">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="warning" aria-pressed="true">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="danger" aria-pressed="true">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="info" aria-pressed="true">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="light" aria-pressed="true">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="dark" aria-pressed="true">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active color="link" aria-pressed="true">
                Link
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="primary" disabled>
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="secondary" disabled>
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="success" disabled>
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="warning" disabled>
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="danger" disabled>
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="info" disabled>
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="light" disabled>
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="dark" disabled>
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton color="link" disabled>
                Link
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>layout="outline" Buttons</CCardHeader>
        <CCardBody>
          <p>
            With <code>outline</code> prop.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="primary">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="secondary">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="success">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="warning">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="danger">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="info">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="light">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="dark">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="primary" aria-pressed="true">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="secondary" aria-pressed="true">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="success" aria-pressed="true">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="warning" aria-pressed="true">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="danger" aria-pressed="true">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="info" aria-pressed="true">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="light" aria-pressed="true">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" active color="dark" aria-pressed="true">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="primary" disabled>
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="secondary" disabled>
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="success" disabled>
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="warning" disabled>
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="danger" disabled>
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="info" disabled>
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="light" disabled>
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="outline" color="dark" disabled>
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>layout="ghost" Buttons</CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-ghost-*</code> class for layout="ghost" buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="primary">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="secondary">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="success">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="warning">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="danger">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="info">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="light">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="dark">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="primary" aria-pressed="true">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="secondary" aria-pressed="true">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="success" aria-pressed="true">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="warning" aria-pressed="true">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="danger" aria-pressed="true">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="info" aria-pressed="true">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="light" aria-pressed="true">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active layout="ghost" color="dark" aria-pressed="true">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="primary" disabled>
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="secondary" disabled>
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="success" disabled>
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="warning" disabled>
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="danger" disabled>
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="info" disabled>
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="light" disabled>
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton layout="ghost" color="dark" disabled>
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0"></CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Square Buttons</CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-square</code> class for square buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="primary">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="secondary">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="success">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="warning">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="danger">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="info">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="light">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="dark">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="link">
                Link
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="primary" aria-pressed="true">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="secondary" aria-pressed="true">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="success" aria-pressed="true">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="warning" aria-pressed="true">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="danger" aria-pressed="true">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="info" aria-pressed="true">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="light" aria-pressed="true">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="dark" aria-pressed="true">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="square" color="link" aria-pressed="true">
                Link
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="primary" disabled>
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="secondary" disabled>
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="success" disabled>
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="warning" disabled>
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="danger" disabled>
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="info" disabled>
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="light" disabled>
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="dark" disabled>
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="square" color="link" disabled>
                Link
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Pill Buttons</CCardHeader>
        <CCardBody>
          <p>
            Use <code>.btn-pill</code> class for pill buttons.
          </p>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Normal
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="primary">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="secondary">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="success">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="warning">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="danger">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="info">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="light">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="dark">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="link">
                Link
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Active State
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="primary" aria-pressed="true">
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="secondary" aria-pressed="true">
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="success" aria-pressed="true">
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="warning" aria-pressed="true">
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="danger" aria-pressed="true">
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="info" aria-pressed="true">
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="light" aria-pressed="true">
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="dark" aria-pressed="true">
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active shape="rounded-pill" color="link" aria-pressed="true">
                Link
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              Disabled
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="primary" disabled>
                Primary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="secondary" disabled>
                Secondary
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="success" disabled>
                Success
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="warning" disabled>
                Warning
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="danger" disabled>
                Danger
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="info" disabled>
                Info
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="light" disabled>
                Light
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="dark" disabled>
                Dark
              </CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton shape="rounded-pill" color="link" disabled>
                Link
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Sizes</CCardHeader>
        <CCardBody>
          <p>
            Fancy larger or smaller buttons? Add <code>size="lg"</code> or <code>size="sm"</code>{' '}
            for additional sizes.
          </p>
          <CRow className="align-items-center">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Small
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="sm">
                Standard Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="secondary" layout="outline" size="sm">
                Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton size="sm" layout="ghost" color="ghost">
                Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="sm">
                Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="rounded-pill" color="danger" size="sm">
                Pill Button
              </CButton>
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
              <CButton layout="outline" color="secondary">
                Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton layout="ghost" color="success">
                Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning">
                Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="rounded-pill" color="danger">
                Pill Button
              </CButton>
            </CCol>
          </CRow>
          <CRow className="align-items-center mt-3">
            <CCol col="2" xl className="mb-3 mb-xl-0">
              Large
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton color="primary" size="lg">
                Standard Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton layout="outline" color="secondary" size="lg">
                Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton layout="ghost" color="success" size="lg">
                Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="square" color="warning" size="lg">
                Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="mb-3 mb-xl-0 text-center">
              <CButton shape="rounded-pill" color="danger" size="lg">
                Pill Button
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>With Icons</CCardHeader>
        <CCardBody>
          <CRow className="align-items-center mt-3">
            <CCol col="2" className="text-center mt-3">
              <CButton color="primary">Standard Button</CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton color="secondary" layout="outline">
                <CIcon name="cil-lightbulb" />
                Outline Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton layout="ghost" color="success">
                <CIcon name="cil-lightbulb" />
                Ghost Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="square" color="warning">
                <CIcon name="cil-lightbulb" />
                Square Button
              </CButton>
            </CCol>
            <CCol col="2" className="text-center mt-3">
              <CButton shape="rounded-pill" color="danger">
                <CIcon name="cil-lightbulb" />
                Pill Button
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>Level Buttons</CCardHeader>
            <CCardBody>
              <p>
                Add prop <code>block</code>
              </p>
              <CButton color="secondary" size="lg">
                Block level button
              </CButton>
              <CButton color="primary" size="lg">
                Block level button
              </CButton>
              <CButton color="success" size="lg">
                Block level button
              </CButton>
              <CButton color="info" size="lg">
                Block level button
              </CButton>
              <CButton color="warning" size="lg">
                Block level button
              </CButton>
              <CButton color="danger" size="lg">
                Block level button
              </CButton>
              <CButton color="link" size="lg">
                Block level button
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>Level Buttons</CCardHeader>
            <CCardBody>
              <p>
                Add prop <code>block</code>
              </p>
              <CButton layout="outline" color="secondary" size="lg">
                Block level button
              </CButton>
              <CButton layout="outline" color="primary" size="lg">
                Block level button
              </CButton>
              <CButton layout="outline" color="success" size="lg">
                Block level button
              </CButton>
              <CButton layout="outline" color="info" size="lg">
                Block level button
              </CButton>
              <CButton layout="outline" color="warning" size="lg">
                Block level button
              </CButton>
              <CButton layout="outline" color="danger" size="lg">
                Block level button
              </CButton>
              <CButton layout="ghost" color="info" size="lg">
                Block level button
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Buttons
