import React from 'react'
import {
  CAlert,
  CAlertHeading,
  CAlertLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Alerts = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Alert</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              React Alert is prepared for any length of text, as well as an optional close button.
              For a styling, use one of the <strong>required</strong> contextual <code>color</code>{' '}
              props (e.g., <code>primary</code>). For inline dismissal, use the{' '}
              <a href="https://coreui.io/react/docs/4.0/components/alert#dismissing">
                dismissing prop
              </a>
              .
            </p>
            <DocsExample href="components/alert">
              <CAlert color="primary">A simple primary alert—check it out!</CAlert>
              <CAlert color="secondary">A simple secondary alert—check it out!</CAlert>
              <CAlert color="success">A simple success alert—check it out!</CAlert>
              <CAlert color="danger">A simple danger alert—check it out!</CAlert>
              <CAlert color="warning">A simple warning alert—check it out!</CAlert>
              <CAlert color="info">A simple info alert—check it out!</CAlert>
              <CAlert color="light">A simple light alert—check it out!</CAlert>
              <CAlert color="dark">A simple dark alert—check it out!</CAlert>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Alert</strong> <small>Link color</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Use the <code>&lt;CAlertLink&gt;</code> component to immediately give matching colored
              links inside any alert.
            </p>
            <DocsExample href="components/alert#link-color">
              <CAlert color="primary">
                A simple primary alert with <CAlertLink href="#">an example link</CAlertLink>. Give
                it a click if you like.
              </CAlert>
              <CAlert color="secondary">
                A simple secondary alert with <CAlertLink href="#">an example link</CAlertLink>.
                Give it a click if you like.
              </CAlert>
              <CAlert color="success">
                A simple success alert with <CAlertLink href="#">an example link</CAlertLink>. Give
                it a click if you like.
              </CAlert>
              <CAlert color="danger">
                A simple danger alert with <CAlertLink href="#">an example link</CAlertLink>. Give
                it a click if you like.
              </CAlert>
              <CAlert color="warning">
                A simple warning alert with <CAlertLink href="#">an example link</CAlertLink>. Give
                it a click if you like.
              </CAlert>
              <CAlert color="info">
                A simple info alert with <CAlertLink href="#">an example link</CAlertLink>. Give it
                a click if you like.
              </CAlert>
              <CAlert color="light">
                A simple light alert with <CAlertLink href="#">an example link</CAlertLink>. Give it
                a click if you like.
              </CAlert>
              <CAlert color="dark">
                A simple dark alert with <CAlertLink href="#">an example link</CAlertLink>. Give it
                a click if you like.
              </CAlert>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Alert</strong> <small>Additional content</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Alert can also incorporate supplementary components &amp; elements like heading,
              paragraph, and divider.
            </p>
            <DocsExample href="components/alert#additional-content">
              <CAlert color="success">
                <CAlertHeading tag="h4">Well done!</CAlertHeading>
                <p>
                  Aww yeah, you successfully read this important alert message. This example text is
                  going to run a bit longer so that you can see how spacing within an alert works
                  with this kind of content.
                </p>
                <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep things nice and
                  tidy.
                </p>
              </CAlert>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Alert</strong> <small>Dismissing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Alerts can also be easily dismissed. Just add the <code>dismissible</code> prop.
            </p>
            <DocsExample href="components/alert#dismissing">
              <CAlert
                color="warning"
                dismissible
                onClose={() => {
                  alert('👋 Well, hi there! Thanks for dismissing me.')
                }}
              >
                <strong>Go right ahead</strong> and click that dimiss over there on the right.
              </CAlert>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Alerts
