import React from 'react'
import {
  CButton,
  CForm,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CRow,
  CFormLabel,
  CFormControl,
  CFormCheck,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const ButtonDropdowns = () => {
  return (
    <CRow>
      <CCol xs="12">
        <CCard className="mb-4">
          <CCardHeader>
            Dropdowns
            <DocsLink name="CDropdown" />
          </CCardHeader>
          <CCardBody>
            <CDropdown className="m-1">
              <CDropdownToggle>Dropdown button</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <hr />
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="primary">Primary</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="secondary">Secondary</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="success">Success</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="info">Info</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="warning">Warning</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1 btn-group">
              <CDropdownToggle color="danger">Danger</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <hr />
            <CDropdown className="m-1">
              <CDropdownToggle split color="primary">
                Primary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary">
                Secondary
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="success">
                Success
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="info">
                Info
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="warning">
                Warning
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="danger">
                Danger
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <hr />
            <CDropdown className="m-1" size="lg">
              <CDropdownToggle color="secondary">Large button</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>{' '}
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary" size="lg">
                Large split button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <hr />
            <CDropdown className="m-1">
              <CDropdownToggle color="secondary" size="sm">
                Small button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>{' '}
            <CDropdown className="m-1">
              <CDropdownToggle color="secondary" size="sm" split>
                Small split button
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <hr />
            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">Dropup button</CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown className="m-1">
              <CDropdownToggle split color="secondary">
                Split dropup
              </CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>Menus</CCardHeader>
          <CCardBody>
            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">Direction Up</CDropdownToggle>
              <CDropdownMenu placement="top">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">Direction Left</CDropdownToggle>
              <CDropdownMenu placement="left">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">Direction Right</CDropdownToggle>
              <CDropdownMenu placement="right">
                <CDropdownHeader>Header</CDropdownHeader>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <CDropdown className="m-1 d-inline-block">
              <CDropdownToggle color="secondary">Default Down</CDropdownToggle>
              <CDropdownMenu placement="bottom" modifiers={[{ name: 'flip', enabled: false }]}>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">
                This dropdown{"'"}s menu is right-aligned
              </CDropdownToggle>
              <CDropdownMenu placement="right">
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem disabled>Action Disabled</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">Dropdown with header</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem header>Header</CDropdownItem>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">Dropdown with divider</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="secondary">Dropdown with disabled item</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem>Action</CDropdownItem>
                <CDropdownItem disabled>Disabled Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>

            <hr />

            <CDropdown className="m-1">
              <CDropdownToggle color="info">Dropdown with form</CDropdownToggle>
              <CDropdownMenu>
                <CForm className="px-4 py-3">
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleDropdownFormEmail1">Email address</CFormLabel>
                    <CFormControl
                      id="exampleDropdownFormEmail1"
                      type="email"
                      placeholder="email@example.com"
                      autoComplete="email"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="exampleDropdownFormPassword1">Password</CFormLabel>
                    <CFormControl
                      id="exampleDropdownFormPassword1"
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormCheck custom id="exampleDropdownFormCheckbox1" label="Remember me" />
                  </div>
                  <div className="mb-3">
                    <CButton color="primary" type="submit">
                      Sign in
                    </CButton>
                  </div>
                </CForm>
                <CDropdownDivider />
                <CDropdownItem href="#/pages/register">Register</CDropdownItem>
                <CDropdownItem>Forgot password?</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ButtonDropdowns
