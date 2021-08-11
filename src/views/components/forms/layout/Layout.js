import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Layout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Form grid</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              More complex forms can be built using our grid classes. Use these for form layouts
              that require multiple columns, varied widths, and additional alignment options.
            </p>
            <DocsExample href="forms/layout#form-grid">
              <CRow>
                <CCol xs>
                  <CFormInput placeholder="First name" aria-label="First name" />
                </CCol>
                <CCol xs>
                  <CFormInput placeholder="Last name" aria-label="Last name" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Gutters</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              By adding <a href="https://coreui.io/docs/layout/gutters/">gutter modifier classes</a>
              , you can have control over the gutter width in as well the inline as block direction.
            </p>
            <DocsExample href="forms/layout#gutters">
              <CRow className="g-3">
                <CCol xs>
                  <CFormInput placeholder="First name" aria-label="First name" />
                </CCol>
                <CCol xs>
                  <CFormInput placeholder="Last name" aria-label="Last name" />
                </CCol>
              </CRow>
            </DocsExample>
            <p className="text-medium-emphasis small">
              More complex layouts can also be created with the grid system.
            </p>
            <DocsExample href="forms/layout#gutters">
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="inputEmail4">Email</CFormLabel>
                  <CFormInput type="email" id="inputEmail4" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputPassword4">Password</CFormLabel>
                  <CFormInput type="password" id="inputPassword4" />
                </CCol>
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputAddress">Address</CFormLabel>
                  <CFormInput id="inputAddress" placeholder="1234 Main St" />
                </CCol>
                <CCol xs={12}>
                  <CFormLabel htmlFor="inputAddress2">Address 2</CFormLabel>
                  <CFormInput id="inputAddress2" placeholder="Apartment, studio, or floor" />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="inputCity">City</CFormLabel>
                  <CFormInput id="inputCity" />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="inputState">State</CFormLabel>
                  <CFormSelect id="inputState">
                    <option>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                </CCol>
                <CCol md={2}>
                  <CFormLabel htmlFor="inputZip">Zip</CFormLabel>
                  <CFormInput id="inputZip" />
                </CCol>
                <CCol xs={12}>
                  <CFormCheck type="checkbox" id="gridCheck" label="Check me out" />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit">Sign in</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Horizontal form</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create horizontal forms with the grid by adding the <code>.row</code> class to form
              groups and using the <code>.col-*-*</code> classes to specify the width of your labels
              and controls. Be sure to add <code>.col-form-label</code> to your{' '}
              <code>&lt;CFormLabel&gt;</code>s as well so they&#39;re vertically centered with their
              associated form controls.
            </p>
            <p className="text-medium-emphasis small">
              At times, you maybe need to use margin or padding utilities to create that perfect
              alignment you need. For example, we&#39;ve removed the <code>padding-top</code> on our
              stacked radio inputs label to better align the text baseline.
            </p>
            <DocsExample href="forms/layout#horizontal-form">
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="email" id="inputEmail3" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                    Password
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="password" id="inputPassword3" />
                  </CCol>
                </CRow>
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                  <CCol sm={10}>
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                      label="First radio"
                      defaultChecked
                    />
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                      label="Second radio"
                    />
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="option3"
                      label="Third disabled radio"
                      disabled
                    />
                  </CCol>
                </fieldset>
                <CRow className="mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" />
                  </div>
                </CRow>
                <CButton type="submit">Sign in</CButton>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Horizontal form label sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Be sure to use <code>.col-form-label-sm</code> or <code>.col-form-label-lg</code> to
              your <code>&lt;CFormLabel&gt;</code>s or <code>&lt;legend&gt;</code>s to correctly
              follow the size of <code>.form-control-lg</code> and <code>.form-control-sm</code>.
            </p>
            <DocsExample href="forms/layout#horizontal-form-label-sizing">
              <CRow className="mb-3">
                <CFormLabel
                  htmlFor="colFormLabelSm"
                  className="col-sm-2 col-form-label col-form-label-sm"
                >
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="email"
                    className="form-control form-control-sm"
                    id="colFormLabelSm"
                    placeholder="col-form-label-sm"
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CFormLabel htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput type="email" id="colFormLabel" placeholder="col-form-label" />
                </CCol>
              </CRow>
              <CRow>
                <CFormLabel
                  htmlFor="colFormLabelLg"
                  className="col-sm-2 col-form-label col-form-label-lg"
                >
                  Email
                </CFormLabel>
                <CCol sm={10}>
                  <CFormInput
                    type="email"
                    className="form-control form-control-lg"
                    id="colFormLabelLg"
                    placeholder="col-form-label-lg"
                  />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Column sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              As shown in the previous examples, our grid system allows you to place any number of{' '}
              <code>&lt;CCol&gt;</code>s within a <code>&lt;CRow&gt;</code>. They&#39;ll split the
              available width equally between them. You may also pick a subset of your columns to
              take up more or less space, while the remaining <code>&lt;CCol&gt;</code>s equally
              split the rest, with specific column classes like{' '}
              <code>&lt;CCol sm=&#34;7&#34;&gt;</code>.
            </p>
            <DocsExample href="forms/layout#column-sizing">
              <CRow className="g-3">
                <CCol sm={7}>
                  <CFormInput placeholder="City" aria-label="City" />
                </CCol>
                <CCol sm>
                  <CFormInput placeholder="State" aria-label="State" />
                </CCol>
                <CCol sm>
                  <CFormInput placeholder="Zip" aria-label="Zip" />
                </CCol>
              </CRow>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Auto-sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              The example below uses a flexbox utility to vertically center the contents and changes{' '}
              <code>&lt;CCol&gt;</code> to <code>&lt;CCol xs=&#34;auto&#34;&gt;</code> so that your
              columns only take up as much space as needed. Put another way, the column sizes itself
              based on the contents.
            </p>
            <DocsExample href="forms/layout#auto-sizing">
              <CForm className="row gy-2 gx-3 align-items-center">
                <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingInput">
                    Name
                  </CFormLabel>
                  <CFormInput id="autoSizingInput" placeholder="Jane Doe" />
                </CCol>
                <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingInputGroup">
                    Username
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput id="autoSizingInputGroup" placeholder="Username" />
                  </CInputGroup>
                </CCol>
                <CCol xs="auto">
                  <CFormLabel className="visually-hidden" htmlFor="autoSizingSelect">
                    Preference
                  </CFormLabel>
                  <CFormSelect id="autoSizingSelect">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
                <CCol xs="auto">
                  <CFormCheck type="checkbox" id="autoSizingCheck" label="Remember me" />
                </CCol>
                <CCol xs="auto">
                  <CButton type="submit">Submit</CButton>
                </CCol>
              </CForm>
            </DocsExample>
            <p className="text-medium-emphasis small">
              You can then remix that once again with size-specific column classes.
            </p>
            <DocsExample href="forms/layout#auto-sizing">
              <CForm className="row gx-3 gy-2 align-items-center">
                <CCol sm={3}>
                  <CFormLabel className="visually-hidden" htmlFor="specificSizeInputName">
                    Name
                  </CFormLabel>
                  <CFormInput id="specificSizeInputName" placeholder="Jane Doe" />
                </CCol>
                <CCol sm={3}>
                  <CFormLabel className="visually-hidden" htmlFor="specificSizeInputGroupUsername">
                    Username
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput id="specificSizeInputGroupUsername" placeholder="Username" />
                  </CInputGroup>
                </CCol>
                <CCol sm={3}>
                  <CFormLabel className="visually-hidden" htmlFor="specificSizeSelect">
                    Preference
                  </CFormLabel>
                  <CFormSelect id="specificSizeSelect">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
                <CCol xs="auto">
                  <CFormCheck type="checkbox" id="autoSizingCheck2" label="Remember me" />
                </CCol>
                <CCol xs="auto">
                  <CButton type="submit">Submit</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Inline forms</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Use the <code>&lt;CCol xs=&#34;auto&#34;&gt;</code> class to create horizontal
              layouts. By adding{' '}
              <a href="https://coreui.io/docs/layout/gutters/">gutter modifier classes</a>, we will
              have gutters in horizontal and vertical directions. The{' '}
              <code>.align-items-center</code> aligns the form elements to the middle, making the{' '}
              <code>&lt;CFormCheck&gt;</code> align properly.
            </p>
            <DocsExample href="forms/layout#inline-forms">
              <CForm className="row row-cols-lg-auto g-3 align-items-center">
                <CCol xs={12}>
                  <CFormLabel className="visually-hidden" htmlFor="inlineFormInputGroupUsername">
                    Username
                  </CFormLabel>
                  <CInputGroup>
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput id="inlineFormInputGroupUsername" placeholder="Username" />
                  </CInputGroup>
                </CCol>
                <CCol xs={12}>
                  <CFormLabel className="visually-hidden" htmlFor="inlineFormSelectPref">
                    Preference
                  </CFormLabel>
                  <CFormSelect id="inlineFormSelectPref">
                    <option>Choose...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                </CCol>
                <CCol xs={12}>
                  <CFormCheck type="checkbox" id="inlineFormCheck" label="Remember me" />
                </CCol>
                <CCol xs={12}>
                  <CButton type="submit">Submit</CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Layout
