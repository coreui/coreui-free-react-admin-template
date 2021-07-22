import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navOut from '../_navOut'
import navIn from '../_navIn'

const AppSidebar = () => {
  const [inout, setInout] = useState(false)
  const chNav = () => {
    if (inout) return navIn
    else return navOut
  }
  return (
    <CSidebar position="fixed" selfHiding="md" onShow={() => console.log('show')}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <h6>components/AppSidebar/CIcon</h6> */}
        <CIcon
          className="sidebar-brand-full"
          name="logo-negative"
          height={35}
          onClick={(e) => {
            setInout(!inout)
            e.preventDefault()
          }}
        />
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
