import React from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CProgress,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Alerts = () => {
  const [visible, setVisible] = React.useState(10)

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Alerts
              <DocsLink name="CAlert"/>
            </CCardHeader>
            <CCardBody>
              <CAlert color="primary">
                This is a primary alert — check it out!
              </CAlert>
              <CAlert color="secondary">
                This is a secondary alert — check it out!
              </CAlert>
              <CAlert color="success">
                This is a success alert — check it out!
              </CAlert>
              <CAlert color="danger">
                This is a danger alert — check it out!
              </CAlert>
              <CAlert color="warning">
                This is a warning alert — check it out!
              </CAlert>
              <CAlert color="info">
                This is a info alert — check it out!
              </CAlert>
              <CAlert color="light">
                This is a light alert — check it out!
              </CAlert>
              <CAlert color="dark">
                This is a dark alert — check it out!
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Alerts
              <small> use <code>.alert-link</code> to provide links</small>
            </CCardHeader>
            <CCardBody>
              <CAlert color="primary">
                {/*eslint-disable-next-line*/}
                This is a primary alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="secondary">
                {/*eslint-disable-next-line*/}
                This is a secondary alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="success">
                {/*eslint-disable-next-line*/}
                This is a success alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="danger">
                {/*eslint-disable-next-line*/}
                This is a danger alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="warning">
                {/*eslint-disable-next-line*/}
                This is a warning alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="info">
                {/*eslint-disable-next-line*/}
                This is a info alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="light">
                {/*eslint-disable-next-line*/}
                This is a light alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="dark">
                {/*eslint-disable-next-line*/}
                This is a dark alert with&nbsp;
                <CLink className="alert-link">an example link</CLink>.
                Give it a click if you like.
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Alerts
              <small> additional content</small>
            </CCardHeader>
            <CCardBody>
              <CAlert color="success">
                <h4 className="alert-heading">Well done!</h4>
                <p>
                  Aww yeah, you successfully read this important alert message. This example text is going
                  to run a bit longer so that you can see how spacing within an alert works with this kind
                  of content.
                </p>
                <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                </p>
              </CAlert>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Alerts
              <small> dismissing</small>
            </CCardHeader>
            <CCardBody>
              <CAlert
                color="info"
                closeButton
              >
                I am an dismissible alert!
              </CAlert>
              <CAlert
                color="warning"
                show={visible}
                closeButton
                onShowChange={setVisible}
              >
                I will be closed in {visible} seconds!
                <CProgress
                  striped
                  color="warning"
                  value={Number(visible) * 10}
                  size="xs"
                  className="mb-3"
                />
              </CAlert>

              <CButton color="primary" onClick={() => setVisible(10)}>
                Reset timer
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Alerts
