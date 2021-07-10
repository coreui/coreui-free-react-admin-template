import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormControl,
  CFormLabel,
  CRow,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const FormControl = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Form Control" href="forms/form-control" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/form-control">
              <CForm>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
                  <CFormControl
                    type="email"
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
                  <CFormControl
                    component="textarea"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></CFormControl>
                </div>
              </CForm>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Set heights using <code>size</code> property like <code>size=&#34;lg&#34;</code> and{' '}
              <code>size=&#34;sm&#34;</code>.
            </p>
            <Example href="forms/form-control#sizing">
              <CFormControl
                type="text"
                size="lg"
                placeholder="Large input"
                aria-label="lg input example"
              />
              <br />
              <CFormControl
                type="text"
                placeholder="Default input"
                aria-label="default input example"
              />
              <br />
              <CFormControl
                type="text"
                size="sm"
                placeholder="Small input"
                aria-label="sm input example"
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Disabled</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>disabled</code> boolean attribute on an input to give it a grayed out
              appearance and remove pointer events.
            </p>
            <Example href="forms/form-control#disabled">
              <CFormControl
                type="text"
                placeholder="Disabled input"
                aria-label="Disabled input example"
                disabled
              />
              <br />
              <CFormControl
                type="text"
                placeholder="Disabled readonly input"
                aria-label="Disabled input example"
                disabled
                readOnly
              />
              <br />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Readonly</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the <code>readOnly</code> boolean attribute on an input to prevent modification of
              the input&#39;s value. Read-only inputs appear lighter (just like disabled inputs),
              but retain the standard cursor.
            </p>
            <Example href="forms/form-control#readonly">
              <CFormControl
                type="text"
                placeholder="Readonly input here..."
                aria-label="readonly input example"
                readOnly
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Readonly plain text</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              If you want to have <code>&lt;input readonly&gt;</code> elements in your form styled
              as plain text, use the <code>plainText</code> boolean property to remove the default
              form field styling and preserve the correct margin and padding.
            </p>
            <Example href="components/accordion">
              <CRow className="mb-3">
                <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <div className="col-sm-10">
                  <CFormControl
                    type="text"
                    id="staticEmail"
                    defaultValue="email@example.com"
                    readOnly
                    plainText
                  />
                </div>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="inputPassword" className="col-sm-2 col-form-label">
                  Password
                </CFormLabel>
                <div className="col-sm-10">
                  <CFormControl type="password" id="inputPassword" />
                </div>
              </CRow>
            </Example>
            <Example href="components/accordion">
              <CForm className="row g-3">
                <div className="col-auto">
                  <CFormLabel htmlFor="staticEmail2" className="visually-hidden">
                    Email
                  </CFormLabel>
                  <CFormControl
                    type="text"
                    id="staticEmail2"
                    defaultValue="email@example.com"
                    readOnly
                    plainText
                  />
                </div>
                <div className="col-auto">
                  <CFormLabel htmlFor="inputPassword2" className="visually-hidden">
                    Password
                  </CFormLabel>
                  <CFormControl type="password" id="inputPassword2" placeholder="Password" />
                </div>
                <div className="col-auto">
                  <CButton type="submit" className="mb-3">
                    Confirm identity
                  </CButton>
                </div>
              </CForm>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>File input</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/form-control#file-input">
              <div className="mb-3">
                <CFormLabel htmlFor="formFile">Default file input example</CFormLabel>
                <CFormControl type="file" id="formFile" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="formFileMultiple">Multiple files input example</CFormLabel>
                <CFormControl type="file" id="formFileMultiple" multiple />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="formFileDisabled">Disabled file input example</CFormLabel>
                <CFormControl type="file" id="formFileDisabled" disabled />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="formFileSm">Small file input example</CFormLabel>
                <CFormControl type="file" size="sm" id="formFileSm" />
              </div>
              <div>
                <CFormLabel htmlFor="formFileLg">Large file input example</CFormLabel>
                <CFormControl type="file" size="lg" id="formFileLg" />
              </div>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Form Control</strong> <small>Color</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/form-control#color">
              <CFormLabel htmlFor="exampleColorInput">Color picker</CFormLabel>
              <CFormControl
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                title="Choose your color"
              />
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
