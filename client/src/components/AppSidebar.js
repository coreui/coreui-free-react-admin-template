import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from '../slices/loginSlice'
import { selectGlobal, hideSidebar, openSidebar } from '../slices/globalSlice'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
  CImage,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navOut from '../_navOut'
import navIn from '../_navIn'

//sidebar top icon
import logo_row from '../assets/images/logo_row.png'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector(selectLogin)
  const { sidebarShow, unfoldable } = useSelector(selectGlobal)
  const chNav = () => {
    if (isLogin) return navIn
    else return navOut
  }
  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => dispatch(openSidebar())}
      onHide={() => dispatch(hideSidebar())}
      className="bg-light"
    >
      <CSidebarBrand className="d-flex" to="/">
        {/* <h6>components/AppSidebar/CIcon</h6> */}
        <CImage src={logo_row} width="60%" />
        {/* <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={chNav()} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
