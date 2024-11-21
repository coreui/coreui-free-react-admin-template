import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormFloating,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const FloatingLabels = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Wrap a pair of <code>&lt;CFormInput&gt;</code> and <code>&lt;CFormLabel&gt;</code>{' '}
              elements in <code>CFormFloating</code> to enable floating labels with textual form
              fields. A <code>placeholder</code> is required on each <code>&lt;CFormInput&gt;</code>{' '}
              as our method of CSS-only floating labels uses the <code>:placeholder-shown</code>{' '}
              pseudo-element. Also note that the <code>&lt;CFormInput&gt;</code> must come first so
              we can utilize a sibling selector (e.g., <code>~</code>).
            </p>
            <DocsExample href="forms/floating-labels">
              <CFormFloating className="mb-3">
                <CFormInput type="email" id="floatingInput" placeholder="name@example.com" />
                <CFormLabel htmlFor="floatingInput">Email address</CFormLabel>
              </CFormFloating>
              <CFormFloating>
                <CFormInput type="password" id="floatingPassword" placeholder="Password" />
                <CFormLabel htmlFor="floatingPassword">Password</CFormLabel>
              </CFormFloating>
            </DocsExample>
            <p className="text-body-secondary small">
              When there&#39;s a <code>value</code> already defined, <code>&lt;CFormLabel&gt;</code>
              s will automatically adjust to their floated position.
            </p>
            <DocsExample href="forms/floating-labels">
              <CFormFloating>
                <CFormInput
                  type="email"
                  id="floatingInputValue"
                  placeholder="name@example.com"
                  defaultValue="test@example.com"
                />
                <CFormLabel htmlFor="floatingInputValue">Input with value</CFormLabel>
              </CFormFloating>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Textareas</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              By default, <code>&lt;CFormTextarea&gt;</code>s will be the same height as{' '}
              <code>&lt;CFormInput&gt;</code>s.
            </p>
            <DocsExample href="forms/floating-labels#textareas">
              <CFormFloating>
                <CFormTextarea
                  id="floatingTextarea"
                  placeholder="Leave a comment here"
                ></CFormTextarea>
                <CFormLabel htmlFor="floatingTextarea">Comments</CFormLabel>
              </CFormFloating>
            </DocsExample>
            <p className="text-body-secondary small">
              To set a custom height on your <code>&lt;CFormTextarea;&gt;</code>, do not use the{' '}
              <code>rows</code> attribute. Instead, set an explicit <code>height</code> (either
              inline or via custom CSS).
            </p>
            <DocsExample href="forms/floating-labels#textareas">
              <CFormFloating>
                <CFormTextarea
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: '100px' }}
                ></CFormTextarea>
                <CFormLabel htmlFor="floatingTextarea2">Comments</CFormLabel>
              </CFormFloating>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Selects</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Other than <code>&lt;CFormInput&gt;</code>, floating labels are only available on{' '}
              <code>&lt;CFormSelect&gt;</code>s. They work in the same way, but unlike{' '}
              <code>&lt;CFormInput&gt;</code>s, they&#39;ll always show the{' '}
              <code>&lt;CFormLabel&gt;</code> in its floated state.{' '}
              <strong>
                Selects with <code>size</code> and <code>multiple</code> are not supported.
              </strong>
            </p>
            <DocsExample href="forms/floating-labels#selects">
              <CFormFloating>
                <CFormSelect id="floatingSelect" aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
                <CFormLabel htmlFor="floatingSelect">Works with selects</CFormLabel>
              </CFormFloating>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels</strong> <small>Layout</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              When working with the CoreUI for Bootstrap grid system, be sure to place form elements
              within column classes.
            </p>
            <DocsExample href="forms/floating-labels#layout">
              <CRow xs={{ gutter: 2 }}>
                <CCol md>
                  <CFormFloating>
                    <CFormInput
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
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FloatingLabels
