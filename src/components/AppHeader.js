import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react-ts'
import CIcon from '@coreui/icons-react'

import {
  AppBreadcrumb,
  AppHeaderDropdown,
  AppHeaderDropdownMssg,
  AppHeaderDropdownNotif,
  AppHeaderDropdownTasks,
} from '../containers/index'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // const toggleSidebar = () => {
  //   const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
  //   dispatch({ type: 'set', sidebarShow: val })
  // }

  // const toggleSidebarMobile = () => {
  //   const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
  //   dispatch({ type: 'set', sidebarShow: val })
  // }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ms-md-3 d-lg-none"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon name="cil-menu" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>
          <AppHeaderDropdownNotif />
          <AppHeaderDropdownTasks />
          <AppHeaderDropdownMssg />
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
