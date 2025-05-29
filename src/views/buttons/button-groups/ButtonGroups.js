import React from 'react'
import {
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButtonGroup,
  CButtonToolbar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const ButtonGroups = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Basic example</span>
          </CCardHeader>
          <CCardBody>
            <p>
              Wrap a series of <code>&lt;CButton&gt;</code> components in{' '}
              <code>&lt;CButtonGroup&gt;</code>.{' '}
            </p>
            <DocsExample href="components/button-group">
              <CButtonGroup role="group" aria-label="Basic example">
                <CButton color="primary">Left</CButton>
                <CButton color="primary">Middle</CButton>
                <CButton color="primary">Right</CButton>
              </CButtonGroup>
            </DocsExample>
            <p>
              These classes can also be added to groups of links, as an alternative to the{' '}
              <code>&lt;CNav&gt;</code> components.
            </p>
            <DocsExample href="components/button-group">
              <CButtonGroup>
                <CButton href="#" color="primary" active>
                  Active link
                </CButton>
                <CButton href="#" color="primary">
                  Link
                </CButton>
                <CButton href="#" color="primary">
                  Link
                </CButton>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Mixed styles</span>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/button-group#mixed-styles">
              <CButtonGroup role="group" aria-label="Basic mixed styles example">
                <CButton color="danger">Left</CButton>
                <CButton color="warning">Middle</CButton>
                <CButton color="success">Right</CButton>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Outlined styles</span>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="components/button-group#outlined-styles">
              <CButtonGroup role="group" aria-label="Basic outlined example">
                <CButton color="primary" variant="outline">
                  Left
                </CButton>
                <CButton color="primary" variant="outline">
                  Middle
                </CButton>
                <CButton color="primary" variant="outline">
                  Right
                </CButton>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Checkbox and radio button groups</span>
          </CCardHeader>
          <CCardBody>
            <p>
              Combine button-like checkbox and radio toggle buttons into a seamless looking button
              group.
            </p>
            <DocsExample href="components/button-group#checkbox-and-radio-button-groups">
              <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                <CFormCheck
                  button={{ variant: 'outline' }}
                  id="btncheck1"
                  autoComplete="off"
                  label="Checkbox 1"
                />
                <CFormCheck
                  button={{ variant: 'outline' }}
                  id="btncheck2"
                  autoComplete="off"
                  label="Checkbox 2"
                />
                <CFormCheck
                  button={{ variant: 'outline' }}
                  id="btncheck3"
                  autoComplete="off"
                  label="Checkbox 3"
                />
              </CButtonGroup>
            </DocsExample>
            <DocsExample href="components/button-group#checkbox-and-radio-button-groups">
              <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
                <CFormCheck
                  type="radio"
                  button={{ variant: 'outline' }}
                  name="btnradio"
                  id="btnradio1"
                  autoComplete="off"
                  label="Radio 1"
                />
                <CFormCheck
                  type="radio"
                  button={{ variant: 'outline' }}
                  name="btnradio"
                  id="btnradio2"
                  autoComplete="off"
                  label="Radio 2"
                />
                <CFormCheck
                  type="radio"
                  button={{ variant: 'outline' }}
                  name="btnradio"
                  id="btnradio3"
                  autoComplete="off"
                  label="Radio 3"
                />
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Button toolbar</span>
          </CCardHeader>
          <CCardBody>
            <p>
              Join sets of button groups into button toolbars for more complicated components. Use
              utility classes as needed to space out groups, buttons, and more.
            </p>
            <DocsExample href="components/button-group#button-toolbar">
              <CButtonToolbar role="group" aria-label="Toolbar with button groups">
                <CButtonGroup className="me-2" role="group" aria-label="First group">
                  <CButton color="primary">1</CButton>
                  <CButton color="primary">2</CButton>
                  <CButton color="primary">3</CButton>
                  <CButton color="primary">4</CButton>
                </CButtonGroup>
                <CButtonGroup className="me-2" role="group" aria-label="Second group">
                  <CButton color="secondary">5</CButton>
                  <CButton color="secondary">6</CButton>
                  <CButton color="secondary">7</CButton>
                </CButtonGroup>
                <CButtonGroup className="me-2" role="group" aria-label="Third group">
                  <CButton color="info">8</CButton>
                </CButtonGroup>
              </CButtonToolbar>
            </DocsExample>
            <p>
              Feel free to combine input groups with button groups in your toolbars. Similar to the
              example above, you’ll likely need some utilities through to space items correctly.
            </p>
            <DocsExample href="components/button-group#button-toolbar">
              <CButtonToolbar className="mb-3" role="group" aria-label="Toolbar with button groups">
                <CButtonGroup className="me-2" role="group" aria-label="First group">
                  <CButton color="secondary" variant="outline">
                    1
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    2
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    3
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    4
                  </CButton>
                </CButtonGroup>
                <CInputGroup>
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Input group example"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                  />
                </CInputGroup>
              </CButtonToolbar>
              <CButtonToolbar
                className="justify-content-between"
                role="group"
                aria-label="Toolbar with button groups"
              >
                <CButtonGroup className="me-2" role="group" aria-label="First group">
                  <CButton color="secondary" variant="outline">
                    1
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    2
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    3
                  </CButton>
                  <CButton color="secondary" variant="outline">
                    4
                  </CButton>
                </CButtonGroup>
                <CInputGroup>
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    placeholder="Input group example"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                  />
                </CInputGroup>
              </CButtonToolbar>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Sizing</span>
          </CCardHeader>
          <CCardBody>
            <p>
              Alternatively, of implementing button sizing classes to each button in a group, set{' '}
              <code>size</code> property to all <code>&lt;CButtonGroup&gt;</code>&#39;s, including
              each one when nesting multiple groups.
            </p>
            <DocsExample href="components/button-group#sizing">
              <CButtonGroup size="lg" role="group" aria-label="Large button group">
                <CButton color="dark" variant="outline">
                  Left
                </CButton>
                <CButton color="dark" variant="outline">
                  Middle
                </CButton>
                <CButton color="dark" variant="outline">
                  Right
                </CButton>
              </CButtonGroup>
              <br />
              <CButtonGroup role="group" aria-label="Default button group">
                <CButton color="dark" variant="outline">
                  Left
                </CButton>
                <CButton color="dark" variant="outline">
                  Middle
                </CButton>
                <CButton color="dark" variant="outline">
                  Right
                </CButton>
              </CButtonGroup>
              <br />
              <CButtonGroup size="sm" role="group" aria-label="Small button group">
                <CButton color="dark" variant="outline">
                  Left
                </CButton>
                <CButton color="dark" variant="outline">
                  Middle
                </CButton>
                <CButton color="dark" variant="outline">
                  Right
                </CButton>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Nesting</span>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Put a <code>&lt;CButtonGroup&gt;</code> inside another{' '}
              <code>&lt;CButtonGroup&gt;</code> when you need dropdown menus combined with a series
              of buttons.
            </p>
            <DocsExample href="components/button-group#nesting">
              <CButtonGroup role="group" aria-label="Button group with nested dropdown">
                <CButton color="primary">1</CButton>
                <CButton color="primary">2</CButton>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Button Group</strong> <span>Vertical variation</span>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create a set of buttons that appear vertically stacked rather than horizontally.{' '}
              <strong>Split button dropdowns are not supported here.</strong>
            </p>
            <DocsExample href="components/button-group/#vertical-variation">
              <CButtonGroup vertical role="group" aria-label="Vertical button group">
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
                <CButton color="dark">Button</CButton>
              </CButtonGroup>
            </DocsExample>
            <DocsExample href="components/button-group/#vertical-variation">
              <CButtonGroup vertical role="group" aria-label="Vertical button group">
                <CButton color="primary">Button</CButton>
                <CButton color="primary">Button</CButton>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CButton color="primary">Button</CButton>
                <CButton color="primary">Button</CButton>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem href="#">Action</CDropdownItem>
                    <CDropdownItem href="#">Another action</CDropdownItem>
                    <CDropdownItem href="#">Something else here</CDropdownItem>
                    <CDropdownDivider />
                    <CDropdownItem href="#">Separated link</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </DocsExample>
            <DocsExample href="components/button-group/#vertical-variation">
              <CButtonGroup vertical role="group" aria-label="Vertical button group">
                <CFormCheck
                  type="radio"
                  button={{ color: 'danger', variant: 'outline' }}
                  name="vbtnradio"
                  id="vbtnradio1"
                  autoComplete="off"
                  label="Radio 1"
                  defaultChecked
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'danger', variant: 'outline' }}
                  name="vbtnradio"
                  id="vbtnradio2"
                  autoComplete="off"
                  label="Radio 2"
                />
                <CFormCheck
                  type="radio"
                  button={{ color: 'danger', variant: 'outline' }}
                  name="vbtnradio"
                  id="vbtnradio3"
                  autoComplete="off"
                  label="Radio 3"
                />
              </CButtonGroup>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ButtonGroups
