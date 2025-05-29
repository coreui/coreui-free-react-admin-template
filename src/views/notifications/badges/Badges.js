import React from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CBadge, CRow } from '@coreui/react'
import { DocsExample } from 'src/components'

const Badges = () => {
  return (
    <CRow>
      <CCol lg={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Badges</strong> <small>Dismissing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Bootstrap badge scale to suit the size of the parent element by using relative font
              sizing and <code>em</code> units.
            </p>
            <DocsExample href="components/badge">
              <h1>
                Example heading <CBadge color="secondary">New</CBadge>
              </h1>
              <h2>
                Example heading <CBadge color="secondary">New</CBadge>
              </h2>
              <h3>
                Example heading <CBadge color="secondary">New</CBadge>
              </h3>
              <h4>
                Example heading <CBadge color="secondary">New</CBadge>
              </h4>
              <h5>
                Example heading <CBadge color="secondary">New</CBadge>
              </h5>
              <h6>
                Example heading <CBadge color="secondary">New</CBadge>
              </h6>
            </DocsExample>
            <p className="text-medium-emphasis small">
              Badges can be used as part of links or buttons to provide a counter.
            </p>
            <DocsExample href="components/badge">
              <CButton color="primary">
                Notifications <CBadge color="secondary">4</CBadge>
              </CButton>
            </DocsExample>
            <p className="text-medium-emphasis small">
              Remark that depending on how you use them, badges may be complicated for users of
              screen readers and related assistive technologies.
            </p>
            <p className="text-medium-emphasis small">
              Unless the context is clear, consider including additional context with a visually
              hidden piece of additional text.
            </p>
            <DocsExample href="components/badge">
              <CButton color="primary">
                Profile <CBadge color="secondary">9</CBadge>
                <span className="visually-hidden">unread messages</span>
              </CButton>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol lg={6}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Badges</strong> <small>Contextual variations</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add any of the below-mentioned <code>color</code> props to modify the presentation of
              a badge.
            </p>
            <DocsExample href="components/badge#contextual-variations">
              <CBadge color="primary">primary</CBadge>
              <CBadge color="success">success</CBadge>
              <CBadge color="danger">danger</CBadge>
              <CBadge color="warning">warning</CBadge>
              <CBadge color="info">info</CBadge>
              <CBadge color="light">light</CBadge>
              <CBadge color="dark">dark</CBadge>
            </DocsExample>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Badges</strong> <small>Pill badges</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Apply the <code>shape=&#34;rounded-pill&#34;</code> prop to make badges rounded.
            </p>
            <DocsExample href="components/badge#pill-badges">
              <CBadge color="primary" shape="rounded-pill">
                primary
              </CBadge>
              <CBadge color="success" shape="rounded-pill">
                success
              </CBadge>
              <CBadge color="danger" shape="rounded-pill">
                danger
              </CBadge>
              <CBadge color="warning" shape="rounded-pill">
                warning
              </CBadge>
              <CBadge color="info" shape="rounded-pill">
                info
              </CBadge>
              <CBadge color="light" shape="rounded-pill">
                light
              </CBadge>
              <CBadge color="dark" shape="rounded-pill">
                dark
              </CBadge>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Badges
