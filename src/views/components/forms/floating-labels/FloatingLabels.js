import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormControl,
  CFormLabel,
  CFormFloating,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const FloatingLabels = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Floating Label" href="forms/floating-label" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Wrap a pair of <code>&lt;CFormControl&gt;</code> and <code>&lt;CFormLabel&gt;</code>{' '}
              elements in <code>CFormFloating</code> to enable floating labels with textual form
              fields. A <code>placeholder</code> is required on each{' '}
              <code>&lt;CFormControl&gt;</code> as our method of CSS-only floating labels uses the{' '}
              <code>:placeholder-shown</code> pseudo-element. Also note that the{' '}
              <code>&lt;CFormControl&gt;</code> must come first so we can utilize a sibling selector
              (e.g., <code>~</code>).
            </p>
            <Example href="forms/floating-labels">
              <CFormFloating className="mb-3">
                <CFormControl type="email" id="floatingInput" placeholder="name@example.com" />
                <CFormLabel htmlFor="floatingInput">Email address</CFormLabel>
              </CFormFloating>
              <CFormFloating>
                <CFormControl type="password" id="floatingPassword" placeholder="Password" />
                <CFormLabel htmlFor="exampleFormControlTextarea1">Password</CFormLabel>
              </CFormFloating>
            </Example>
            <p className="text-medium-emphasis small">
              When there&#39;s a <code>value</code> already defined, <code>&lt;CFormLabel&gt;</code>
              s will automatically adjust to their floated position.
            </p>
            <Example href="forms/floating-labels">
              <CFormFloating>
                <CFormControl
                  type="email"
                  id="floatingInputValue"
                  placeholder="name@example.com"
                  defaultValue="test@example.com"
                />
                <CFormLabel htmlFor="floatingInputValue">Input with value</CFormLabel>
              </CFormFloating>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Textareas</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              By default, <code>&lt;CFormControl component=&#34;textarea&#34;&gt;</code>s will be
              the same height as <code>&lt;CFormControl&gt;</code>s.
            </p>
            <Example href="forms/floating-labels#textareas">
              <CFormFloating>
                <CFormControl
                  component="textarea"
                  id="floatingTextarea"
                  placeholder="Leave a comment here"
                ></CFormControl>
                <CFormLabel htmlFor="floatingTextarea">Comments</CFormLabel>
              </CFormFloating>
            </Example>
            <p className="text-medium-emphasis small">
              To set a custom height on your{' '}
              <code>&lt;CFormControl component=&#34;textarea&#34;&gt;</code>, do not use the{' '}
              <code>rows</code> attribute. Instead, set an explicit <code>height</code> (either
              inline or via custom CSS).
            </p>
            <Example href="forms/floating-labels#textareas">
              <CFormFloating>
                <CFormControl
                  component="textarea"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px' }}
                ></CFormControl>
                <CFormLabel htmlFor="floatingTextarea2">Comments</CFormLabel>
              </CFormFloating>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Selects</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Other than <code>&lt;CFormControl&gt;</code>, floating labels are only available on{' '}
              <code>&lt;CFormSelect&gt;</code>s. They work in the same way, but unlike{' '}
              <code>&lt;CFormControl&gt;</code>s, they&#39;ll always show the{' '}
              <code>&lt;CFormLabel&gt;</code> in its floated state.{' '}
              <strong>
                Selects with <code>size</code> and <code>multiple</code> are not supported.
              </strong>
            </p>
            <Example href="forms/floating-labels#selects">
              <CFormFloating>
                <CFormSelect id="floatingSelect" aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
                <CFormLabel htmlFor="floatingSelect">Works with selects</CFormLabel>
              </CFormFloating>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Layout</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              When working with the CoreUI for Bootstrap grid system, be sure to place form elements
              within column classes.
            </p>
            <Example href="forms/floating-labels#layout">
              <CRow xs={{ gutter: 2 }}>
                <CCol md>
                  <CFormFloating>
                    <CFormControl
                      type="email"
                      id="floatingInputGrid"
                      placeholder="name@example.com"
                      defaultValue="email@example.com"
                    />
                    <CFormLabel htmlFor="floatingInputGrid">Email address</CFormLabel>
                  </CFormFloating>
                </CCol>
                <CCol md>
                  <CFormFloating>
                    <CFormSelect id="floatingSelectGrid" aria-label="Floating label select example">
                      <option>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </CFormSelect>
                    <CFormLabel htmlFor="floatingSelectGrid">Works with selects</CFormLabel>
                  </CFormFloating>
                </CCol>
              </CRow>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FloatingLabels
