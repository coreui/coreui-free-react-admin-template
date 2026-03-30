import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'

const CustomStyles = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom01">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom01" defaultValue="Mark" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustom02">Email</CFormLabel>
        <CFormInput type="text" id="validationCustom02" defaultValue="Otto" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationCustomUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationCustomUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback invalid>Please choose a username.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationCustom03">City</CFormLabel>
        <CFormInput type="text" id="validationCustom03" required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom04">City</CFormLabel>
        <CFormSelect id="validationCustom04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationCustom05">City</CFormLabel>
        <CFormInput type="text" id="validationCustom05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

const BrowserDefaults = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm className="row g-3 needs-validation" validated={validated} onSubmit={handleSubmit}>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault01">Email</CFormLabel>
        <CFormInput type="text" id="validationDefault01" defaultValue="Mark" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefault02">Email</CFormLabel>
        <CFormInput type="text" id="validationDefault02" defaultValue="Otto" required />
        <CFormFeedback valid>Looks good!</CFormFeedback>
      </CCol>
      <CCol md={4}>
        <CFormLabel htmlFor="validationDefaultUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend02">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationDefaultUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend02"
            required
          />
          <CFormFeedback invalid>Please choose a username.</CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6}>
        <CFormLabel htmlFor="validationDefault03">City</CFormLabel>
        <CFormInput type="text" id="validationDefault03" required />
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationDefault04">City</CFormLabel>
        <CFormSelect id="validationDefault04">
          <option disabled>Choose...</option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
      </CCol>
      <CCol md={3}>
        <CFormLabel htmlFor="validationDefault05">City</CFormLabel>
        <CFormInput type="text" id="validationDefault05" required />
        <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CFormCheck
          type="checkbox"
          id="invalidCheck"
          label="Agree to terms and conditions"
          required
        />
        <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

const Tooltips = () => {
  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <CForm
      className="row g-3 needs-validation"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <CCol md={4} className="position-relative">
        <CFormLabel htmlFor="validationTooltip01">Email</CFormLabel>
        <CFormInput type="text" id="validationTooltip01" defaultValue="Mark" required />
        <CFormFeedback tooltip valid>
          Looks good!
        </CFormFeedback>
      </CCol>
      <CCol md={4} className="position-relative">
        <CFormLabel htmlFor="validationTooltip02">Email</CFormLabel>
        <CFormInput type="text" id="validationTooltip02" defaultValue="Otto" required />
        <CFormFeedback tooltip valid>
          Looks good!
        </CFormFeedback>
      </CCol>
      <CCol md={4} className="position-relative">
        <CFormLabel htmlFor="validationTooltipUsername">Username</CFormLabel>
        <CInputGroup className="has-validation">
          <CInputGroupText id="inputGroupPrepend">@</CInputGroupText>
          <CFormInput
            type="text"
            id="validationTooltipUsername"
            defaultValue=""
            aria-describedby="inputGroupPrepend"
            required
          />
          <CFormFeedback tooltip invalid>
            Please choose a username.
          </CFormFeedback>
        </CInputGroup>
      </CCol>
      <CCol md={6} className="position-relative">
        <CFormLabel htmlFor="validationTooltip03">City</CFormLabel>
        <CFormInput type="text" id="validationTooltip03" required />
        <CFormFeedback tooltip invalid>
          Please provide a valid city.
        </CFormFeedback>
      </CCol>
      <CCol md={3} className="position-relative">
        <CFormLabel htmlFor="validationTooltip04">City</CFormLabel>
        <CFormSelect id="validationTooltip04" required>
          <option disabled defaultValue="">
            Choose...
          </option>
          <option>...</option>
        </CFormSelect>
        <CFormFeedback tooltip invalid>
          Please provide a valid city.
        </CFormFeedback>
      </CCol>
      <CCol md={3} className="position-relative">
        <CFormLabel htmlFor="validationTooltip05">City</CFormLabel>
        <CFormInput type="text" id="validationTooltip05" required />
        <CFormFeedback tooltip invalid>
          Please provide a valid zip.
        </CFormFeedback>
      </CCol>
      <CCol xs={12} className="position-relative">
        <CButton color="primary" type="submit">
          Submit form
        </CButton>
      </CCol>
    </CForm>
  )
}

const Validation = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsComponents href="forms/validation/" />
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Custom styles</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              For custom CoreUI form validation messages, you&#39;ll need to add the{' '}
              <code>noValidate</code> boolean property to your <code>&lt;CForm&gt;</code>. This
              disables the browser default feedback tooltips, but still provides access to the form
              validation APIs in JavaScript. Try to submit the form below; our JavaScript will
              intercept the submit button and relay feedback to you. When attempting to submit,
              you&#39;ll see the <code>:invalid</code> and <code>:valid</code> styles applied to
              your form controls.
            </p>
            <p className="text-body-secondary small">
              Custom feedback styles apply custom colors, borders, focus styles, and background
              icons to better communicate feedback.{' '}
            </p>
            <DocsExample href="forms/validation">{CustomStyles()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Browser defaults</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Not interested in custom validation feedback messages or writing JavaScript to change
              form behaviors? All good, you can use the browser defaults. Try submitting the form
              below. Depending on your browser and OS, you&#39;ll see a slightly different style of
              feedback.
            </p>
            <p className="text-body-secondary small">
              While these feedback styles cannot be styled with CSS, you can still customize the
              feedback text through JavaScript.
            </p>
            <DocsExample href="forms/validation#browser-defaults">{BrowserDefaults()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Server side</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              We recommend using client-side validation, but in case you require server-side
              validation, you can indicate invalid and valid form fields with <code>invalid</code>{' '}
              and <code>valid</code> boolean properties.
            </p>
            <p className="text-body-secondary small">
              For invalid fields, ensure that the invalid feedback/error message is associated with
              the relevant form field using <code>aria-describedby</code> (noting that this
              attribute allows more than one <code>id</code> to be referenced, in case the field
              already points to additional form text).
            </p>
            <DocsExample href="forms/validation#server-side">
              <CForm className="row g-3 needs-validation">
                <CCol md={4}>
                  <CFormLabel htmlFor="validationServer01">Email</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationServer01"
                    defaultValue="Mark"
                    valid
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationServer02">Email</CFormLabel>
                  <CFormInput
                    type="text"
                    id="validationServer02"
                    defaultValue="Otto"
                    valid
                    required
                  />
                  <CFormFeedback valid>Looks good!</CFormFeedback>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationServerUsername">Username</CFormLabel>
                  <CInputGroup className="has-validation">
                    <CInputGroupText id="inputGroupPrepend03">@</CInputGroupText>
                    <CFormInput
                      type="text"
                      id="validationServerUsername"
                      defaultValue=""
                      aria-describedby="inputGroupPrepend03"
                      invalid
                      required
                    />
                    <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationServer03">City</CFormLabel>
                  <CFormInput type="text" id="validationServer03" invalid required />
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="validationServer04">City</CFormLabel>
                  <CFormSelect id="validationServer04" invalid>
                    <option disabled>Choose...</option>
                    <option>...</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
                </CCol>
                <CCol md={3}>
                  <CFormLabel htmlFor="validationServer05">City</CFormLabel>
                  <CFormInput type="text" id="validationServer05" invalid required />
                  <CFormFeedback invalid>Please provide a valid zip.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CFormCheck
                    type="checkbox"
                    id="invalidCheck"
                    label="Agree to terms and conditions"
                    invalid
                    required
                  />
                  <CFormFeedback invalid>You must agree before submitting.</CFormFeedback>
                </CCol>
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    Submit form
                  </CButton>
                </CCol>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Supported elements</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              Validation styles are available for the following form controls and components:
            </p>
            <ul>
              <li>
                <code>&lt;CFormInput&gt;</code>s
              </li>
              <li>
                <code>&lt;CFormSelect&gt;</code>s
              </li>
              <li>
                <code>&lt;CFormCheck&gt;</code>s
              </li>
            </ul>
            <DocsExample href="forms/validation#supported-elements">
              <CForm validated={true}>
                <div className="mb-3">
                  <CFormLabel htmlFor="validationTextarea" className="form-label">
                    Textarea
                  </CFormLabel>
                  <CFormTextarea
                    id="validationTextarea"
                    placeholder="Required example textarea"
                    invalid
                    required
                  ></CFormTextarea>
                  <CFormFeedback invalid>Please enter a message in the textarea.</CFormFeedback>
                </div>
                <CFormCheck
                  className="mb-3"
                  id="validationFormCheck1"
                  label="Check this checkbox"
                  required
                />
                <CFormFeedback invalid>Example invalid feedback text</CFormFeedback>

                <CFormCheck
                  type="radio"
                  name="radio-stacked"
                  id="validationFormCheck2"
                  label="Check this checkbox"
                  required
                />

                <CFormCheck
                  className="mb-3"
                  type="radio"
                  name="radio-stacked"
                  id="validationFormCheck3"
                  label="Or toggle this other radio"
                  required
                />
                <CFormFeedback invalid>More example invalid feedback text</CFormFeedback>

                <div className="mb-3">
                  <CFormSelect required aria-label="select example">
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </CFormSelect>
                  <CFormFeedback invalid>Example invalid select feedback</CFormFeedback>
                </div>

                <div className="mb-3">
                  <CFormInput
                    type="file"
                    id="validationTextarea"
                    aria-label="file example"
                    required
                  />
                  <CFormFeedback invalid>Example invalid form file feedback</CFormFeedback>
                </div>

                <div className="mb-3">
                  <CButton type="submit" color="primary" disabled>
                    Submit form
                  </CButton>
                </div>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Validation</strong> <small>Tooltips</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-body-secondary small">
              If your form layout allows it, you can swap the text for the tooltip to display
              validation feedback in a styled tooltip. Be sure to have a parent with{' '}
              <code>position: relative</code> on it for tooltip positioning. In the example below,
              our column classes have this already, but your project may require an alternative
              setup.
            </p>
            <DocsExample href="forms/validation#tooltips">{Tooltips()}</DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Validation
