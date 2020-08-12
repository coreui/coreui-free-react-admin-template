import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

const BasicForms = () => {
  const [collapsed, setCollapsed] = React.useState(true)
  const [showElements, setShowElements] = React.useState(true)

  return (
    <>
      <CRow>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              Credit Card
              <small> Form</small>
              <DocsLink name="-Input"/>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput id="name" placeholder="Enter your name" required />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12">
                  <CFormGroup>
                    <CLabel htmlFor="ccnumber">Credit Card Number</CLabel>
                    <CInput id="ccnumber" placeholder="0000 0000 0000 0000" required />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Month</CLabel>
                    <CSelect custom name="ccmonth" id="ccmonth">
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
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="ccyear">Year</CLabel>
                    <CSelect custom name="ccyear" id="ccyear">
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
                    </CSelect>
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="cvv">CVV/CVC</CLabel>
                    <CInput id="cvv" placeholder="123" required/>
                  </CFormGroup>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              Company
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="company">Company</CLabel>
                <CInput id="company" placeholder="Enter your company name" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="vat">VAT</CLabel>
                <CInput id="vat" placeholder="DE1234567890" />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="street">Street</CLabel>
                <CInput id="street" placeholder="Enter street name" />
              </CFormGroup>
              <CFormGroup row className="my-0">
                <CCol xs="8">
                  <CFormGroup>
                    <CLabel htmlFor="city">City</CLabel>
                    <CInput id="city" placeholder="Enter your city" />
                  </CFormGroup>
                </CCol>
                <CCol xs="4">
                  <CFormGroup>
                    <CLabel htmlFor="postal-code">Postal Code</CLabel>
                    <CInput id="postal-code" placeholder="Postal Code" />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="country">Country</CLabel>
                <CInput id="country" placeholder="Country name" />
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Basic Form
              <small> Elements</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Static</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <p className="form-control-static">Username</p>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Text Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Text" />
                    <CFormText>This is a help text</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="password-input">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                    <CFormText className="help-block">Please enter a complex password</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Date Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="disabled-input">Disabled Input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="disabled-input" name="disabled-input" placeholder="Disabled" disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="textarea-input">Textarea</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CTextarea 
                      name="textarea-input" 
                      id="textarea-input" 
                      rows="9"
                      placeholder="Content..." 
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Select</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="select" id="select">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="selectLg">Select Large</CLabel>
                  </CCol>
                  <CCol xs="12" md="9" size="lg">
                    <CSelect custom size="lg" name="selectLg" id="selectLg">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="selectSm">Select Small</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom size="sm" name="selectSm" id="SelectLm">
                      <option value="0">Please select</option>
                      <option value="1">Option #1</option>
                      <option value="2">Option #2</option>
                      <option value="3">Option #3</option>
                      <option value="4">Option #4</option>
                      <option value="5">Option #5</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="disabledSelect">Disabled Select</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect 
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
                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol tag="label" sm="3" className="col-form-label">
                    Switch checkboxes
                  </CCol>
                  <CCol sm="9">
                    <CSwitch
                      className="mr-1"
                      color="primary"
                      defaultChecked
                    />
                    <CSwitch
                      className="mr-1"
                      color="success"
                      defaultChecked
                      variant="outline"
                    />
                    <CSwitch
                      className="mr-1"
                      color="warning"
                      defaultChecked
                      variant="opposite"
                    />
                    <CSwitch
                      className="mr-1"
                      color="danger"
                      defaultChecked
                      shape="pill"
                    />
                    <CSwitch
                      className="mr-1"
                      color="info"
                      defaultChecked
                      shape="pill"
                      variant="outline"
                    />
                    <CSwitch
                      className="mr-1"
                      color="dark"
                      defaultChecked
                      shape="pill"
                      variant="opposite"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Radios</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="radio1" name="radios" value="option1" />
                      <CLabel variant="checkbox" htmlFor="radio1">Option 1</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="radio2" name="radios" value="option2" />
                      <CLabel variant="checkbox" htmlFor="radio2">Option 2</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox">
                      <CInputRadio className="form-check-input" id="radio3" name="radios" value="option3" />
                      <CLabel variant="checkbox" htmlFor="radio3">Option 3</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Inline Radios</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio1" name="inline-radios" value="option1" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio1">One</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio2" name="inline-radios" value="option2" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Two</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio custom id="inline-radio3" name="inline-radios" value="option3" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-radio3">Three</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3"><CLabel>Checkboxes</CLabel></CCol>
                  <CCol md="9">
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CInputCheckbox 
                        id="checkbox1" 
                        name="checkbox1" 
                        value="option1" 
                      />
                      <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox1">Option 1</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CInputCheckbox id="checkbox2" name="checkbox2" value="option2" />
                      <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox2">Option 2</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CInputCheckbox id="checkbox3" name="checkbox3" value="option3" />
                      <CLabel variant="checkbox" className="form-check-label" htmlFor="checkbox3">Option 3</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Inline Checkboxes</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox 
                        custom 
                        id="inline-checkbox1" 
                        name="inline-checkbox1" 
                        value="option1" 
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">One</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">Two</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">Three</CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="file-input">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="file-input" name="file-input"/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Multiple File input</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInputFile 
                      id="file-multiple-input" 
                      name="file-multiple-input" 
                      multiple
                      custom
                    />
                    <CLabel htmlFor="file-multiple-input" variant="custom-file">
                      Choose Files...
                    </CLabel>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md={3}>Custom file input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile custom id="custom-file-input"/>
                    <CLabel htmlFor="custom-file-input" variant="custom-file">
                      Choose file...
                    </CLabel>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard>
            <CCardHeader>
              Inline
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" inline>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">Name</CLabel>
                  <CInput id="exampleInputName2" placeholder="Jane Doe" required />
                </CFormGroup>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">Email</CLabel>
                  <CInput type="email" id="exampleInputEmail2" placeholder="jane.doe@example.com" required />
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              Horizontal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="email" id="hf-email" name="hf-email" placeholder="Enter Email..." autoComplete="email" />
                    <CFormText className="help-block">Please enter your email</CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Password</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput type="password" id="hf-password" name="hf-password" placeholder="Enter Password..." autoComplete="current-password"/>
                    <CFormText className="help-block">Please enter your password</CFormText>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard>
            <CCardHeader>
              Normal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"/>
                  <CFormText className="help-block">Please enter your email</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Please enter your password</CFormText>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard>
            <CCardHeader>
              Input
              <small> Grid</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol sm="3">
                    <CInput placeholder=".col-sm-3" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="4">
                    <CInput placeholder=".col-sm-4" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="5">
                    <CInput placeholder=".col-sm-5" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="6">
                    <CInput placeholder=".col-sm-6" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="7">
                    <CInput placeholder=".col-sm-7" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="8">
                    <CInput placeholder=".col-sm-8" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="9">
                    <CInput placeholder=".col-sm-9" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="10">
                    <CInput placeholder=".col-sm-10" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="11">
                    <CInput placeholder=".col-sm-11" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol sm="12">
                    <CInput placeholder=".col-sm-12" />
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary"><CIcon name="cil-user" /> Login</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <CCard>
            <CCardHeader>
              Input
              <small> Sizes</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CLabel sm="5" col="sm" htmlFor="input-small">Small Input</CLabel>
                  <CCol sm="6">
                    <CInput size="sm" type="text" id="input-small" name="input-small" className="input-sm" placeholder=".form-control-sm" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel sm="5" col htmlFor="input-normal">Normal Input</CLabel>
                  <CCol sm="6">
                    <CInput id="input-normal" name="input-normal" placeholder="Normal" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel sm="5" col="lg" htmlFor="input-large">Large Input</CLabel>
                  <CCol sm="6">
                    <CInput size="lg" type="text" id="input-large" name="input-large" className="input-lg" placeholder=".form-control-lg" />
                  </CCol>
                </CFormGroup>
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
          <CCard>
            <CCardHeader>
              Form
              <small> validation feedback</small>
            </CCardHeader>
            <CCardBody>
              <CFormGroup>
                <CLabel htmlFor="inputIsValid">Input is valid</CLabel>
                <CInput valid id="inputIsValid" />
                <CValidFeedback>Cool! Input is valid</CValidFeedback>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="inputIsInvalid">Input is invalid</CLabel>
                <CInput invalid id="inputIsInvalid" />
                <CInvalidFeedback>Houston, we have a problem...</CInvalidFeedback>
              </CFormGroup>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="6">
          <CCard>
            <CCardHeader>
              Validation feedback Form
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="inputSuccess2i">Non-required input</CLabel>
                  <CInput className="form-control-success" id="inputSuccess2i" />
                  <CValidFeedback>Non-required</CValidFeedback>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Required input</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required />
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Icon/Text Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input1-group1" name="input1-group1" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group1" name="input2-group1" placeholder="Email" />
                      <CInputGroupAppend>
                        <CInputGroupText>
                          <CIcon name="cil-envelope-closed" />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-euro" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput id="input3-group1" name="input3-group1" placeholder=".." />
                      <CInputGroupAppend>
                        <CInputGroupText>.00</CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Button Groups
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cil-magnifying-glass" /> Search</CButton>
                      </CInputGroupPrepend>
                      <CInput id="input1-group2" name="input1-group2" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group2" name="input2-group2" placeholder="Email" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary">Submit</CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CButton type="button" color="primary"><CIcon name="cib-facebook" /></CButton>
                      </CInputGroupPrepend>
                      <CInput id="input3-group2" name="input3-group2" placeholder="Search" />
                      <CInputGroupAppend>
                        <CButton type="button" color="primary"><CIcon name="cib-twitter" /></CButton>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Submit</CButton>
              <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              Dropdowns Groups
            </CCardHeader>
            <CCardBody>
              <CForm className="form-horizontal">
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
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
                      <CInput id="input1-group3" name="input1-group3" placeholder="Username" />
                    </CInputGroup>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
                      <CInput type="email" id="input2-group3" name="input2-group3" placeholder="Email" />
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
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="12">
                    <CInputGroup>
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
                      <CInput id="input3-group3" name="input3-group3" placeholder=".." />
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
                </CFormGroup>
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
          <CCard>
            <CCardHeader>
              Use the grid for big devices!
              <small> <code>.col-lg-*</code> <code>.col-md-*</code> <code>.col-sm-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="8">
                    <CInput placeholder=".col-md-8" />
                  </CCol>
                  <CCol md="4">
                    <CInput placeholder=".col-md-4" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="7">
                    <CInput placeholder=".col-md-7" />
                  </CCol>
                  <CCol md="5">
                    <CInput placeholder=".col-md-5" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="6">
                    <CInput placeholder=".col-md-6" />
                  </CCol>
                  <CCol md="6">
                    <CInput placeholder=".col-md-6" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="5">
                    <CInput placeholder=".col-md-5" />
                  </CCol>
                  <CCol md="7">
                    <CInput placeholder=".col-md-7" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="4">
                    <CInput placeholder=".col-md-4" />
                  </CCol>
                  <CCol md="8">
                    <CInput placeholder=".col-md-8" />
                  </CCol>
                </CFormGroup>
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
          <CCard>
            <CCardHeader>
              Input Grid for small devices!
              <small> <code>.col-*</code></small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post" className="form-horizontal">
                <CFormGroup row>
                  <CCol xs="4">
                    <CInput placeholder=".col-4" />
                  </CCol>
                  <CCol xs="8">
                    <CInput placeholder=".col-8" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="5">
                    <CInput placeholder=".col-5" />
                  </CCol>
                  <CCol xs="7">
                    <CInput placeholder=".col-7" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="6">
                    <CInput placeholder=".col-6" />
                  </CCol>
                  <CCol xs="6">
                    <CInput placeholder=".col-6" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="7">
                    <CInput placeholder=".col-5" />
                  </CCol>
                  <CCol xs="5">
                    <CInput placeholder=".col-5" />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="8">
                    <CInput placeholder=".col-8" />
                  </CCol>
                  <CCol xs="4">
                    <CInput placeholder=".col-4" />
                  </CCol>
                </CFormGroup>
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
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Username</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="username3" name="username3" autoComplete="name"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Email</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="email3" name="email3" autoComplete="username"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText>Password</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password3" name="password3" autoComplete="current-password"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="primary">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInput id="username2" name="username2" placeholder="Username" autoComplete="name"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInput type="email" id="email2" name="email2" placeholder="Email" autoComplete="username"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInput type="password" id="password2" name="password2" placeholder="Password" autoComplete="current-password"/>
                    <CInputGroupAppend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupAppend>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="secondary">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="4">
          <CCard>
            <CCardHeader>
              Example Form
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-user" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput id="username1" name="username1" placeholder="Username" autoComplete="name"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-envelope-closed" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" id="email1" name="email1" placeholder="Email" autoComplete="username"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup>
                  <CInputGroup>
                    <CInputGroupPrepend>
                      <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                  </CInputGroup>
                </CFormGroup>
                <CFormGroup className="form-actions">
                  <CButton type="submit" size="sm" color="success">Submit</CButton>
                </CFormGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
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
                    <CFormGroup>
                      <CLabel htmlFor="prependedInput">Prepended text</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>@</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput id="prependedInput" size="16" type="text" />
                        </CInputGroup>
                        <p className="help-block">Here's some help text</p>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInput">Appended text</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInput" size="16" type="text" />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                        <span className="help-block">Here's more help text</span>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedPrependedInput">Append and prepend</CLabel>
                      <div className="controls">
                        <CInputGroup className="input-prepend">
                          <CInputGroupPrepend>
                            <CInputGroupText>$</CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput id="appendedPrependedInput" size="16" type="text" />
                          <CInputGroupAppend>
                            <CInputGroupText>.00</CInputGroupText>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInputButton">Append with button</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInputButton" size="16" type="text" />
                          <CInputGroupAppend>
                            <CButton color="secondary">Go!</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="appendedInputButtons">Two-button append</CLabel>
                      <div className="controls">
                        <CInputGroup>
                          <CInput id="appendedInputButtons" size="16" type="text" />
                          <CInputGroupAppend>
                            <CButton color="secondary">Search</CButton>
                            <CButton color="secondary">Options</CButton>
                          </CInputGroupAppend>
                        </CInputGroup>
                      </div>
                    </CFormGroup>
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
