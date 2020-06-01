import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CNavbar,
  CNavbarNav,
  CNavbarBrand,
  CNavbarText,
  CToggler,
  CNavLink,
  CDropdown,
  CForm,
  CInput,
  CButton,
  CImg
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'

const CNavbars = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const [navbarText, setNavbarText] = useState(false)

  return (
    <>

      <CCard>
        <CCardHeader>
          CNavbar
        </CCardHeader>
        <CCardBody>
          <CNavbar expandable="sm" color="info" >
            <CToggler inNavbar onClick={() => setIsOpen(!isOpen)}/>
            <CNavbarBrand>
              NavbarBrand
            </CNavbarBrand>
            <CCollapse show={isOpen} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
                <CNavLink>Link</CNavLink>
              </CNavbarNav>
              <CNavbarNav className="ml-auto">
                <CForm inline>
                  <CInput
                    className="mr-sm-2"
                    placeholder="Search"
                    size="sm"
                  />
                  <CButton color="light" className="my-2 my-sm-0" type="submit">Search</CButton>
                </CForm>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    Lang
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>EN</CDropdownItem>
                    <CDropdownItem>ES</CDropdownItem>
                    <CDropdownItem>RU</CDropdownItem>
                    <CDropdownItem>FA</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    User
                  </CDropdownToggle>
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

      <CCard>
        <CCardHeader>
          CNavbar brand
        </CCardHeader>
        <CCardBody>
          <CNavbar color="faded" light>
            <CNavbarBrand>
              <CImg
                src="https://placekitten.com/g/30/30"
                className="d-inline-block align-top"
                alt="CoreuiVue"
              />
              CoreUI React
            </CNavbarBrand>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          CNavbar text
        </CCardHeader>
        <CCardBody>
          <CNavbar toggleable="sm" light color="light">
            <CToggler
              inNavbar
              onClick={()=>{ setNavbarText(!navbarText)}}
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

      <CCard>
        <CCardHeader>
          CNavbar dropdown
        </CCardHeader>
        <CCardBody>
          <CNavbar expandable="false" color="primary" >
            <CToggler inNavbar onClick={()=>{setIsOpenDropdown(!isOpenDropdown)}} />
            <CCollapse show={isOpenDropdown} navbar>
              <CNavbarNav>
                <CNavLink>Home</CNavLink>
                <CNavLink>Link</CNavLink>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    Lang
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem>EN</CDropdownItem>
                    <CDropdownItem>ES</CDropdownItem>
                    <CDropdownItem>RU</CDropdownItem>
                    <CDropdownItem>FA</CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
                <CDropdown
                  inNav
                >
                  <CDropdownToggle color="primary">
                    User
                  </CDropdownToggle>
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

      <CCard>
        <CCardHeader>
          CNavbar form
        </CCardHeader>
        <CCardBody>
          <CNavbar light color="light">
            <CForm inline>
              <CInput
                className="mr-sm-2"
                placeholder="Search"
                size="sm"
              />
              <CButton color="outline-success" className="my-2 my-sm-0" type="submit">Search</CButton>
            </CForm>
          </CNavbar>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          CNavbar input group
        </CCardHeader>
        <CCardBody>
          <CNavbar light color="light">
            <CForm inline>
              <CInput
                className="mr-sm-2"
                placeholder="Username"
              />
            </CForm>
          </CNavbar>
        </CCardBody>
      </CCard>
    </>
  )
}

export default CNavbars
