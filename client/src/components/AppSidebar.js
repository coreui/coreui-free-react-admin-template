import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../slices/loginSlice'
import { selectGlobal, sidebarOpen, sidebarHide } from '../slices/globalSlice'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CImage,
  CCreateNavItem,
  CHeaderNav,
  CNavLink,
  CButton,
} from '@coreui/react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { AppHeaderDropdown } from './header'

// sidebar nav config
import navOut from '../_navOut'
import navIn from '../_navIn'
import navAuth from '../_navAuth'

//sidebar top icon
import logo_row from '../assets/images/logo_row.png'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { isLogin, isAuth } = useSelector(selectLogin)
  const { sidebarShow, unfoldable } = useSelector(selectGlobal)
  const chNav = () => {
    return isLogin ? (isAuth ? [...navAuth, ...navIn, ...navOut] : [...navIn, ...navOut]) : navOut
  }
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      show={sidebarShow}
      unfoldable={unfoldable}
      className="bg-white"
      onShow={() => dispatch(sidebarOpen())}
      onHide={() => dispatch(sidebarHide())}
    >
      <CSidebarBrand className="bg-white" to="/">
        <CImage className="d-none d-md-flex pt-1 bg-white text-dark" src={logo_row} width="80%" />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          {isLogin ? (
            <CHeaderNav className="d-flex d-md-none">
              <AppHeaderDropdown />
            </CHeaderNav>
          ) : (
            <CHeaderNav className=" d-flex d-md-none">
              <CNavLink to="/login" component={NavLink}>
                <CButton>Login</CButton>
              </CNavLink>
            </CHeaderNav>
          )}
          <CCreateNavItem items={chNav()} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
