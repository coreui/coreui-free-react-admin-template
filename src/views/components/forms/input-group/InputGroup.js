import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormCheck,
  CFormControl,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsCallout, Example } from 'src/reusable'

const Select = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <DocsCallout name="Input Group" href="forms/input-group" />
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Basic example</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Place one add-on or button on either side of an input. You may also place one on both
              sides of an input. Remember to place <code>&lt;CFormLabel&gt;</code>s outside the
              input group.
            </p>
            <Example href="forms/input-group">
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon1">@</CInputGroupText>
                <CFormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormControl
                  placeholder="Recipient&#39;s username"
                  aria-label="Recipient&#39;s username"
                  aria-describedby="basic-addon2"
                />
                <CInputGroupText id="basic-addon2">@example.com</CInputGroupText>
              </CInputGroup>
              <CFormLabel htmlFor="basic-url">Your vanity URL</CFormLabel>
              <CInputGroup className="mb-3">
                <CInputGroupText id="basic-addon3">https://example.com/users/</CInputGroupText>
                <CFormControl id="basic-url" aria-describedby="basic-addon3" />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText>$</CInputGroupText>
                <CFormControl aria-label="Amount (to the nearest dollar)" />
                <CInputGroupText>.00</CInputGroupText>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormControl placeholder="Username" aria-label="Username" />
                <CInputGroupText>@</CInputGroupText>
                <CFormControl placeholder="Server" aria-label="Server" />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText>With textarea</CInputGroupText>
                <CFormControl component="textarea" aria-label="With textarea"></CFormControl>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Wrapping</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Input groups wrap by default via <code>flex-wrap: wrap</code> in order to accommodate
              custom form field validation within an input group. You may disable this with{' '}
              <code>.flex-nowrap</code>.
            </p>
            <Example href="forms/input-group#wrapping">
              <CInputGroup className="flex-nowrap">
                <CInputGroupText id="addon-wrapping">@</CInputGroupText>
                <CFormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="addon-wrapping"
                />
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Sizing</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Add the relative form sizing classes to the <code>&lt;CInputGroup&gt;</code> itself
              and contents within will automatically resize—no need for repeating the form control
              size classes on each element.
            </p>
            <p className="text-medium-emphasis small">
              <strong>Sizing on the individual input group elements isn&#39;tsupported.</strong>
            </p>
            <Example href="forms/input-group#sizing">
              <CInputGroup size="sm" className="mb-3">
                <CInputGroupText id="inputGroup-sizing-sm">Small</CInputGroupText>
                <CFormControl
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CInputGroupText id="inputGroup-sizing-default">Default</CInputGroupText>
                <CFormControl
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </CInputGroup>
              <CInputGroup size="lg">
                <CInputGroupText id="inputGroup-sizing-lg">Large</CInputGroupText>
                <CFormControl
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-lg"
                />
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Checkboxes and radios</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Place any checkbox or radio option within an input group&#39;s addon instead of text.
            </p>
            <Example href="forms/input-group#checkboxes-and-radios">
              <CInputGroup className="mb-3">
                <CInputGroupText>
                  <CFormCheck
                    type="checkbox"
                    value=""
                    aria-label="Checkbox for following text input"
                  />
                </CInputGroupText>
                <CFormControl aria-label="Text input with checkbox" />
              </CInputGroup>
              <CInputGroup>
                <CInputGroupText>
                  <CFormCheck
                    type="radio"
                    value=""
                    aria-label="Radio button for following text input"
                  />
                </CInputGroupText>
                <CFormControl aria-label="Text input with radio button" />
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Multiple inputs</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              While multiple <code>&lt;CFormControl&gt;</code>s are supported visually, validation
              styles are only available for input groups with a single{' '}
              <code>&lt;CFormControl&gt;</code>.
            </p>
            <Example href="forms/input-group#multiple-inputs">
              <CInputGroup>
                <CInputGroupText>First and last name</CInputGroupText>
                <CFormControl aria-label="First name" />
                <CFormControl aria-label="Last name" />
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Multiple addons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Multiple add-ons are supported and can be mixed with checkbox and radio input
              versions..
            </p>
            <Example href="forms/input-group#multiple-addons">
              <CInputGroup className="mb-3">
                <CInputGroupText>$</CInputGroupText>
                <CInputGroupText>0.00</CInputGroupText>
                <CFormControl aria-label="Dollar amount (with dot and two decimal places)" />
              </CInputGroup>
              <CInputGroup>
                <CFormControl aria-label="Dollar amount (with dot and two decimal places)" />
                <CInputGroupText>$</CInputGroupText>
                <CInputGroupText>0.00</CInputGroupText>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Button addons</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Multiple add-ons are supported and can be mixed with checkbox and radio input
              versions..
            </p>
            <Example href="forms/input-group#button-addons">
              <CInputGroup className="mb-3">
                <CButton type="button" color="secondary" variant="outline" id="button-addon1">
                  Button
                </CButton>
                <CFormControl
                  placeholder=""
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <CButton type="button" color="secondary" variant="outline" id="button-addon2">
                  Button
                </CButton>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
                <CFormControl placeholder="" aria-label="Example text with two button addons" />
              </CInputGroup>
              <CInputGroup>
                <CFormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username with two button addons"
                />
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Buttons with dropdowns</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/input-group#buttons-with-dropdowns">
              <CInputGroup className="mb-3">
                <CDropdown variant="input-group">
                  <CDropdownToggle color="secondary" variant="outline">
                    Dropdown
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CFormControl aria-label="Text input with dropdown button" />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormControl aria-label="Text input with dropdown button" />
                <CDropdown alignment="end" variant="input-group">
                  <CDropdownToggle color="secondary" variant="outline">
                    Dropdown
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CInputGroup>
              <CInputGroup>
                <CDropdown variant="input-group">
                  <CDropdownToggle color="secondary" variant="outline">
                    Dropdown
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CFormControl aria-label="Text input with 2 dropdown buttons" />
                <CDropdown alignment="end" variant="input-group">
                  <CDropdownToggle color="secondary" variant="outline">
                    Dropdown
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Segmented buttons</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/input-group#segmented-buttons">
              <CInputGroup className="mb-3">
                <CDropdown variant="input-group">
                  <CButton type="button" color="secondary" variant="outline">
                    Action
                  </CButton>
                  <CDropdownToggle color="secondary" variant="outline" split />
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CFormControl aria-label="Text input with segmented dropdown button" />
              </CInputGroup>
              <CInputGroup>
                <CFormControl aria-label="Text input with segmented dropdown button" />
                <CDropdown alignment="end" variant="input-group">
                  <CButton type="button" color="secondary" variant="outline">
                    Action
                  </CButton>
                  <CDropdownToggle color="secondary" variant="outline" split />
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Custom select</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/input-group#custom-select">
              <CInputGroup className="mb-3">
                <CInputGroupText component="label" htmlFor="inputGroupSelect01">
                  Options
                </CInputGroupText>
                <CFormSelect id="inputGroupSelect01">
                  <option>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormSelect id="inputGroupSelect02">
                  <option>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
                <CInputGroupText component="label" htmlFor="inputGroupSelect02">
                  Options
                </CInputGroupText>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
                <CFormSelect id="inputGroupSelect03" aria-label="Example select with button addon">
                  <option>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
              </CInputGroup>
              <CInputGroup>
                <CFormSelect id="inputGroupSelect04" aria-label="Example select with button addon">
                  <option>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CFormSelect>
                <CButton type="button" color="secondary" variant="outline">
                  Button
                </CButton>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Input group</strong> <small>Custom file input</small>
          </CCardHeader>
          <CCardBody>
            <Example href="forms/input-group#custom-file-input">
              <CInputGroup className="mb-3">
                <CInputGroupText component="label" htmlFor="inputGroupFile01">
                  Upload
                </CInputGroupText>
                <CFormControl type="file" id="inputGroupFile01" />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormControl type="file" id="inputGroupFile02" />
                <CInputGroupText component="label" htmlFor="inputGroupFile02">
                  Upload
                </CInputGroupText>
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CButton
                  type="button"
                  color="secondary"
                  variant="outline"
                  id="inputGroupFileAddon03"
                >
                  Button
                </CButton>
                <CFormControl
                  type="file"
                  id="inputGroupFile03"
                  aria-describedby="inputGroupFileAddon03"
                  aria-label="Upload"
                />
              </CInputGroup>
              <CInputGroup>
                <CFormControl
                  type="file"
                  id="inputGroupFile04"
                  aria-describedby="inputGroupFileAddon04"
                  aria-label="Upload"
                />
                <CButton
                  type="button"
                  color="secondary"
                  variant="outline"
                  id="inputGroupFileAddon04"
                >
                  Button
                </CButton>
              </CInputGroup>
            </Example>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Select
