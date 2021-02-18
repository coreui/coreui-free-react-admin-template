import React from 'react'
import {
  CFade,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CSwitch
} from '@coreui/react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  // CFade,
  CForm,
  CFormCheck,
  CFormControl,
  CFormLabel,
  CFormText,
  CFormSelect,
  // CValidFeedback,
  // CInvalidFeedback,
  // CTextarea,
  // CInput,
  // CInputFile,
  // CInputRadio,
  CInputGroup,
  // CInputGroupAppend,
  // CInputGroupPrepend,
  CInputGroupText,
  // CLabel,
  // CSelect,
  CRow,
  // CSwitch
} from '@coreui/react-ts'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard className="mb-4">
            <CCardHeader>
              Credit Card
              <small> Form</small>
              <DocsLink name="-Input"/>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <div className="mb-3">
                    <CFormLabel htmlFor="name">Name</CFormLabel>
                    <CFormControl id="name" placeholder="Enter your name" required />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <div className="mb-3">
                    <CFormLabel htmlFor="ccnumber">Credit Card Number</CFormLabel>
                    <CFormControl id="ccnumber" placeholder="0000 0000 0000 0000" required />
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <div className="mb-3">
                    <CFormLabel htmlFor="ccmonth">Month</CFormLabel>
                    <CFormSelect custom name="ccmonth" id="ccmonth">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol xs="4">
                  <div className="mb-3">
                    <CFormLabel htmlFor="ccyear">Year</CFormLabel>
                    <CFormSelect custom name="ccyear" id="ccyear">
                      <option>2017</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </CFormSelect>
                  </div>
                </CCol>
                <CCol xs="4">
                  <div className="mb-3">
                    <CFormLabel htmlFor="cvv">CVV/CVC</CFormLabel>
                    <CFormControl id="cvv" placeholder="123" required/>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard className="mb-4">
            <CCardHeader>
              Company
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <CFormLabel htmlFor="company">Company</CFormLabel>
                <CFormControl id="company" placeholder="Enter your company name" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="vat">VAT</CFormLabel>
                <CFormControl id="vat" placeholder="DE1234567890" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="street">Street</CFormLabel>
                <CFormControl id="street" placeholder="Enter street name" />
              </div>
              <CRow>
                <CCol xs="8">
                  <div className="mb-3">
                    <CFormLabel htmlFor="city">City</CFormLabel>
                    <CFormControl id="city" placeholder="Enter your city" />
                  </div>
                </CCol>
                <CCol xs="4">
                  <div className="mb-3">
                    <CFormLabel htmlFor="postal-code">Postal Code</CFormLabel>
                    <CFormControl id="postal-code" placeholder="Postal Code" />
                  </div>
                </CCol>
              </CRow>
              <div className="mb-3">
                <CFormLabel htmlFor="country">Country</CFormLabel>
                <CFormControl id="country" placeholder="Country name" />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>
              Basic Form
              <small> Elements</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel>Static</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">Username</p>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="text-input">Text Input</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl id="text-input" name="text-input" placeholder="Text" />
                    <CFormText>This is a help text</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="email-input">Email Input</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="password-input">Password</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                    <CFormText className="help-block">Please enter a complex password</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="date-input">Date Input</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="disabled-input">Disabled Input</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl id="disabled-input" name="disabled-input" placeholder="Disabled" disabled />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="textarea-input">Textarea</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea
                      name="textarea-input"
                      id="textarea-input"
                      rows="9"
                      placeholder="Content..."
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="select">Select</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom name="select" id="select">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="selectLg">Select Large</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9" size="lg">
                    <CFormSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="selectSm">Select Small</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect custom size="sm" name="selectSm" id="SelectLm">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="4">Option #4</option>
                      <option value="5">Option #5</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="disabledSelect">Disabled Select</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormSelect
                      custom
                      name="disabledSelect"
                      id="disabledSelect"
                      disabled
                      autoComplete="name"
                    >
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol tag="label" sm="3" className="col-form-label">
                    Switch checkboxes
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      className="me-1"
                      color="primary"
                      defaultChecked
                    />
                    <CSwitch
                      className="me-1"
                      color="success"
                      defaultChecked
                      variant="outline"
                    />
                    <CSwitch
                      className="me-1"
                      color="warning"
                      defaultChecked
                      variant="opposite"
                    />
                    <CSwitch
                      className="me-1"
                      color="danger"
                      defaultChecked
                      shape="pill"
                    />
                    <CSwitch
                      className="me-1"
                      color="info"
                      defaultChecked
                      shape="pill"
                      variant="outline"
                    />
                    <CSwitch
                      className="me-1"
                      color="dark"
                      defaultChecked
                      shape="pill"
                      variant="opposite"
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel>Radios</CFormLabel>
                  </CCol>
                  <CCol md="9">
                    <div className="mb-3">
                      <CFormCheck type="radio" id="radio1" name="radios" value="option1" label="Option 1"/>
                    </div>
                    <div className="mb-3">
                      <CFormCheck type="radio" id="radio2" name="radios" value="option2" label="Option 2"/>
                    </div>
                    <div className="mb-3">
                      <CFormCheck type="radio" id="radio3" name="radios" value="option3" label="Option 3"/>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel>Inline Radios</CFormLabel>
                  </CCol>
                  <CCol md="9">
                    <div className="mb-3">
                      <CFormCheck type="radio" inline id="inline-radio1" name="inline-radios" value="option1" label="One"/>
                      <CFormCheck type="radio" inline id="inline-radio2" name="inline-radios" value="option2" label="Two"/>
                      <CFormCheck type="radio" inline id="inline-radio3" name="inline-radios" value="option3" label="Three"/>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3"><CFormLabel>Checkboxes</CFormLabel></CCol>
                  <CCol md="9">
                    <div className="mb-3">
                      <CFormCheck
                        id="checkbox1"
                        name="checkbox1"
                        value="option1"
                        label="Option"
                      />
                    </div>
                    <div className="mb-3">
                      <CFormCheck id="checkbox2" name="checkbox2" value="option2" label="Option 2"/>
                    </div>
                    <div className="mb-3">
                      <CFormCheck id="checkbox3" name="checkbox3" value="option3" label="Option 3"/>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel>Inline Checkboxes</CFormLabel>
                  </CCol>
                  <CCol md="9">
                    <div className="mb-3">
                      <CFormCheck
                        inline
                        id="inline-checkbox1"
                        name="inline-checkbox1"
                        value="option1"
                        label="One"
                      />
                      <CFormCheck inline id="inline-checkbox2" name="inline-checkbox2" value="option2" label="Two"/>
                      <CFormCheck inline id="inline-checkbox3" name="inline-checkbox3" value="option3" label="Three"/>
                    </div>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel col md="3" htmlFor="file-input">File input</CFormLabel>
                  <CCol xs="12" md="9">
                    <CFormControl type="file" id="file-input" name="file-input"/>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel>Multiple File input</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                  <CFormControl type="file"
                      id="file-multiple-input"
                      name="file-multiple-input"
                      multiple
                    />
                    <CFormLabel htmlFor="file-multiple-input" variant="custom-file">
                      Choose Files...
                    </CFormLabel>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel col md={3}>Custom file input</CFormLabel>
                  <CCol xs="12" md="9">
                    <CFormControl type="file" id="custom-file-input"/>
                    <CFormLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CFormLabel>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              Inline
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" inline>
                <div className="pe-1">
                  <CFormLabel htmlFor="exampleInputName2" className="pe-1">Name</CFormLabel>
                  <CFormControl id="exampleInputName2" placeholder="Jane Doe" required />
                </div>
                <div className="pe-1">
                  <CFormLabel htmlFor="exampleInputEmail2" className="pe-1">Email</CFormLabel>
                  <CFormControl type="email" id="exampleInputEmail2" placeholder="jane.doe@example.com" required />
                </div>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>
              Horizontal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-email">Email</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl type="email" id="hf-email" name="hf-email" placeholder="Enter Email..." autoComplete="email" />
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="3">
                    <CFormLabel htmlFor="hf-password">Password</CFormLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CFormControl type="password" id="hf-password" name="hf-password" placeholder="Enter Password..." autoComplete="current-password"/>
                    <CFormText className="help-block">Please enter your password</CFormText>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              Normal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <div className="mb-3">
                  <CFormLabel htmlFor="nf-email">Email</CFormLabel>
                  <CFormControl type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"/>
                  <CFormText className="help-block">Please enter your email</CFormText>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="nf-password">Password</CFormLabel>
                  <CFormControl type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Please enter your password</CFormText>
                </div>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              Input
              <small> Grid</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol sm="3">
                    <CFormControl placeholder=".col-sm-3" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="4">
                    <CFormControl placeholder=".col-sm-4" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="5">
                    <CFormControl placeholder=".col-sm-5" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="6">
                    <CFormControl placeholder=".col-sm-6" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="7">
                    <CFormControl placeholder=".col-sm-7" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="8">
                    <CFormControl placeholder=".col-sm-8" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="9">
                    <CFormControl placeholder=".col-sm-9" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="10">
                    <CFormControl placeholder=".col-sm-10" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="11">
                    <CFormControl placeholder=".col-sm-11" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol sm="12">
                    <CFormControl placeholder=".col-sm-12" />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-user" /> Login</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>
              Input
              <small> Sizes</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CFormLabel sm="5" col="sm" htmlFor="input-small">Small Input</CFormLabel>
                  <CCol sm="6">
                    <CFormControl size="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder=".form-control-sm" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel sm="5" col htmlFor="input-normal">Normal Input</CFormLabel>
                  <CCol sm="6">
                    <CFormControl id="input-normal" name="input-normal" placeholder="Normal" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel sm="5" col="lg" htmlFor="input-large">Large Input</CFormLabel>
                  <CCol sm="6">
                    <CFormControl size="lg" type="text" id="input-large" name="input-large" className="input-lg" placeholder=".form-control-lg" />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard className="mb-4">
            <CCardHeader>
              Form
              <small> validation feedback</small>
            </CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <CFormLabel htmlFor="inputIsValid">Input is valid</CFormLabel>
                <CFormControl valid id="inputIsValid" />
                <CValidFeedback>Cool! Input is valid</CValidFeedback>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="inputIsInvalid">Input is invalid</CFormLabel>
                <CFormControl invalid id="inputIsInvalid" />
                <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard className="mb-4">
            <CCardHeader>
              Validation feedback Form
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated">
                <div className="mb-3">
                  <CFormLabel htmlFor="inputSuccess2i">Non-required input</CFormLabel>
                  <CFormControl className="form-control-success" id="inputSuccess2i" />
                  <CValidFeedback>Non-required</CValidFeedback>
                </div>
                <div className="mb-3">
                  <CFormLabel htmlFor="inputWarning2i">Required input</CFormLabel>
                  <CFormControl className="form-control-warning" id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>
              Icon/Text Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                      <CFormControl id="input1-group1" name="input1-group1" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CFormControl type="email" id="input2-group1" name="input2-group1" placeholder="Email" />
                      <CInputGroupText>
                        <CIcon name="cil-envelope-closed" />
                      </CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon name="cil-euro" />
                      </CInputGroupText>
                      <CFormControl id="input3-group1" name="input3-group1" placeholder=".." />
                      <CInputGroupText>.00</CInputGroupText>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>
              Button Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                      <CFormControl id="input1-group2" name="input1-group2" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CFormControl type="email" id="input2-group2" name="input2-group2" placeholder="Email" />
                      <CButton type="button" color="primary">Submit</CButton>
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CButton type="button" color="primary"><CIcon name="cib-facebook" /></CButton>
                      <CFormControl id="input3-group2" name="input3-group2" placeholder="Search" />
                      <CButton type="button" color="primary"><CIcon name="cib-twitter" /></CButton>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>
              Dropdowns Groups
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CDropdown className="input-group-prepend">
                          <CDropdownToggle caret color="primary">
                            Dropdown
                          </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CFormControl id="input1-group3" name="input1-group3" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CFormControl type="email" id="input2-group3" name="input2-group3" placeholder="Email" />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="12">
                    <CInputGroup className="mb-3">
                      <CDropdown className="input-group-prepend">
                        <CDropdownToggle color="primary">Action</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                      <CFormControl id="input3-group3" name="input3-group3" placeholder=".." />
                      <CDropdown className="input-group-append">
                        <CDropdownToggle caret color="primary">
                          Dropdown
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>Action</CDropdownItem>
                          <CDropdownItem>Another Action</CDropdownItem>
                          <CDropdownItem>Something else here</CDropdownItem>
                          <CDropdownItem divider />
                          <CDropdownItem>Separated link</CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </CInputGroup>
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>
              Use the grid for big devices!
              <small> <code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol md="8">
                    <CFormControl placeholder=".col-md-8" />
                  </CCol>
                  <CCol md="4">
                    <CFormControl placeholder=".col-md-4" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="7">
                    <CFormControl placeholder=".col-md-7" />
                  </CCol>
                  <CCol md="5">
                    <CFormControl placeholder=".col-md-5" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="6">
                    <CFormControl placeholder=".col-md-6" />
                  </CCol>
                  <CCol md="6">
                    <CFormControl placeholder=".col-md-6" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="5">
                    <CFormControl placeholder=".col-md-5" />
                  </CCol>
                  <CCol md="7">
                    <CFormControl placeholder=".col-md-7" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol md="4">
                    <CFormControl placeholder=".col-md-4" />
                  </CCol>
                  <CCol md="8">
                    <CFormControl placeholder=".col-md-8" />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">Action</CButton>
              <CButton size="sm" color="danger">Action</CButton>
              <CButton size="sm" color="warning">Action</CButton>
              <CButton size="sm" color="info">Action</CButton>
              <CButton size="sm" color="success">Action</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard className="mb-4">
            <CCardHeader>
              Input Grid for small devices!
              <small> <code>.col-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CRow className="mb-3">
                  <CCol xs="4">
                    <CFormControl placeholder=".col-4" />
                  </CCol>
                  <CCol xs="8">
                    <CFormControl placeholder=".col-8" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs="5">
                    <CFormControl placeholder=".col-5" />
                  </CCol>
                  <CCol xs="7">
                    <CFormControl placeholder=".col-7" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs="6">
                    <CFormControl placeholder=".col-6" />
                  </CCol>
                  <CCol xs="6">
                    <CFormControl placeholder=".col-6" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs="7">
                    <CFormControl placeholder=".col-5" />
                  </CCol>
                  <CCol xs="5">
                    <CFormControl placeholder=".col-5" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CCol xs="8">
                    <CFormControl placeholder=".col-8" />
                  </CCol>
                  <CCol xs="4">
                    <CFormControl placeholder=".col-4" />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary">Action</CButton>
              <CButton size="sm" color="danger">Action</CButton>
              <CButton size="sm" color="warning">Action</CButton>
              <CButton size="sm" color="info">Action</CButton>
              <CButton size="sm" color="success">Action</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="4">
          <CCard className="mb-4">
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Username</CInputGroupText>
                    <CFormControl type="email" id="username3" name="username3" autoComplete="name"/>
                    <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Email</CInputGroupText>
                    <CFormControl type="email" id="email3" name="email3" autoComplete="username"/>
                    <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Password</CInputGroupText>
                    <CFormControl type="password" id="password3" name="password3" autoComplete="current-password"/>
                    <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="form-actions">
                  <CButton type="submit" size="sm" color="primary">Submit</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard className="mb-4">
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CFormControl id="username2" name="username2" placeholder="Username" autoComplete="name"/>
                    <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CFormControl type="email" id="email2" name="email2" placeholder="Email" autoComplete="username"/>
                    <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CFormControl type="password" id="password2" name="password2" placeholder="Password" autoComplete="current-password"/>
                    <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                  </CInputGroup>
                </div>
                <div className="form-actions">
                  <CButton type="submit" size="sm" color="secondary">Submit</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard className="mb-4">
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    <CFormControl id="username1" name="username1" placeholder="Username" autoComplete="name"/>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    <CFormControl type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
                  </CInputGroup>
                </div>
                <div className="mb-3">
                  <CInputGroup className="mb-3">
                    <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    <CFormControl type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                  </CInputGroup>
                </div>
                <div className="form-actions">
                  <CButton type="submit" size="sm" color="success">Submit</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard className="mb-4">
              <CCardHeader>
                Form Elements
                <div className="card-header-actions">
                  <CButton color="link" className="card-header-action btn-setting">
                    <CIcon name="cil-settings" />
                  </CButton>
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon name={ collapsed ? "cil-arrow-top" : "cil-arrow-bottom"} />
                  </CButton>
                  <CButton
                    color="link"
                    className="card-header-action btn-close"
                    onClick={() => setShowElements(false)}
                  >
                    <CIcon name="cil-x" />
                  </CButton>
                </div>
              </CCardHeader>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CForm className="form-horizontal">
                    <div className="mb-3">
                      <CFormLabel htmlFor="prependedInput">Prepended text</CFormLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupText>@</CInputGroupText>
                          <CFormControl id="prependedInput" size="16" type="text" />
                        </CInputGroup>
                        <p className="help-block">Here's some help text</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="appendedInput">Appended text</CFormLabel>
                      <div className="controls">
                        <CInputGroup className="mb-3">
                          <CFormControl id="appendedInput" size="16" type="text" />
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroup>
                        <span className="help-block">Here's more help text</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="appendedPrependedInput">Append and prepend</CFormLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupText>$</CInputGroupText>
                          <CFormControl id="appendedPrependedInput" size="16" type="text" />
                          <CInputGroupText>.00</CInputGroupText>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="appendedInputButton">Append with button</CFormLabel>
                      <div className="controls">
                        <CInputGroup className="mb-3">
                          <CFormControl id="appendedInputButton" size="16" type="text" />
                          <CButton color="secondary">Go!</CButton>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="appendedInputButtons">Two-button append</CFormLabel>
                      <div className="controls">
                        <CInputGroup className="mb-3">
                          <CFormControl id="appendedInputButtons" size="16" type="text" />
                          <CButton color="secondary">Search</CButton>
                          <CButton color="secondary">Options</CButton>
                        </CInputGroup>
                      </div>
                    </div>
                    <div className="form-actions">
                      <CButton type="submit" color="primary">Save changes</CButton>
                      <CButton color="secondary">Cancel</CButton>
                    </div>
                  </CForm>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  )
}

export default BasicForms
