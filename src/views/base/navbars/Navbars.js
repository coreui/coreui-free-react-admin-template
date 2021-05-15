import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormControl,
  CImage,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavbarText,
  CNavbarToggler,
  CNavLink,
  CDropdown,
  CButton,
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const CNavbars = () => {
  const [visible, setVisible] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [navbarText, setNavbarText] = useState(false)

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          CNavbar
          <DocsLink name="CNavbar" />
        </CCardHeader>
        <CCardBody>
          <CNavbar expandable="sm" color="info">
            <CNavbarToggler onClick={() => setVisible(!visible)} />
            <CNavbarBrand>NavbarBrand</CNavbarBrand>
            <CCollapse show={visible} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
                <CNavLink>Link</CNavLink>
              </CNavbarNav>
              <CNavbarNav className="ms-auto">
                <CForm className="d-flex">
                  <CFormControl className="me-sm-2" placeholder="Search" size="sm" />
                  <CButton color="light" className="my-2 my-sm-0" type="submit">
                    Search
                  </CButton>
                </CForm>
                <CDropdown inNav>
                  <CDropdownToggle color="primary">Lang</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>EN</CDropdownItem>
                    <CDropdownItem>ES</CDropdownItem>
                    <CDropdownItem>RU</CDropdownItem>
                    <CDropdownItem>FA</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown inNav>
                  <CDropdownToggle color="primary">User</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Account</CDropdownItem>
                    <CDropdownItem>Settings</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>CNavbar brand</CCardHeader>
        <CCardBody>
          <CNavbar color="faded" light>
            <CNavbarBrand>
              <CImage
                src="https://placekitten.com/g/30/30"
                className="d-inline-block align-top"
                alt="CoreuiVue"
              />
              CoreUI React
            </CNavbarBrand>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>CNavbar text</CCardHeader>
        <CCardBody>
          <CNavbar toggleable="sm" light color="light">
            <CNavbarToggler
              inNavbar
              onClick={() => {
                setNavbarText(!navbarText)
              }}
            />
            <CNavbarBrand>NavbarBrand</CNavbarBrand>
            <CCollapse show={navbarText}>
              <CNavbarNav>
                <CNavbarText>Navbar text</CNavbarText>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>CNavbar dropdown</CCardHeader>
        <CCardBody>
          <CNavbar expandable="false" color="primary">
            <CNavbarToggler
              inNavbar
              onClick={() => {
                setIsOpenDropdown(!isOpenDropdown)
              }}
            />
            <CCollapse show={isOpenDropdown} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
                <CNavLink>Link</CNavLink>
                <CDropdown inNav>
                  <CDropdownToggle color="primary">Lang</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>EN</CDropdownItem>
                    <CDropdownItem>ES</CDropdownItem>
                    <CDropdownItem>RU</CDropdownItem>
                    <CDropdownItem>FA</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown inNav>
                  <CDropdownToggle color="primary">User</CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>Account</CDropdownItem>
                    <CDropdownItem>Settings</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </CNavbarNav>
            </CCollapse>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>CNavbar form</CCardHeader>
        <CCardBody>
          <CNavbar light color="light">
            <CForm className="d-flex">
              <CFormControl className="me-sm-2" placeholder="Search" size="sm" />
              <CButton color="outline-success" className="my-2 my-sm-0" type="submit">
                Search
              </CButton>
            </CForm>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>CNavbar input group</CCardHeader>
        <CCardBody>
          <CNavbar light color="light">
            <CForm className="d-flex">
              <CFormControl className="me-sm-2" placeholder="Username" />
            </CForm>
          </CNavbar>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CNavbars
