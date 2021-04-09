import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react-ts'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from '../containers/_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector(state => state.sidebarUnfoldable)
  // const visible = useSelector(state => state.sidebarUnfoldable)

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      // show={show}
      // onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="sidebar-brand-narrow"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateNavItem
          items={navigation}
        />
      </CSidebarNav>
      <CSidebarToggler className="c-d-md-down-none" onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}/>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
