import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CImage,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppHeaderDropdown } from './header/index'

import logo_row from '../assets/images/logo_row.png'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const isLogin = useSelector((state) => state.isLogin)

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon name="cil-menu" size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="d-flex justify-content-center mx-auto d-md-none" to="/">
          <CImage src={logo_row} fluid width="50%" />
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Setting</CNavLink>
          </CNavItem>
        </CHeaderNav>
        {isLogin ? (
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        ) : (
          <CHeaderNav>
            <CNavLink to="/login" component={NavLink}>
              <CButton>Login</CButton>
            </CNavLink>
          </CHeaderNav>
        )}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
