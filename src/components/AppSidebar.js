import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

import navigation from '../_nav'
import { toggleSideBar, toggleUnfoldable } from '../actions/appActions'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const { sidebarUnfoldable, sidebarShow } = useSelector((state) => state.app)

  const handleVisibleChange = (visible) => {
    if (visible !== sidebarShow) {
      dispatch(toggleSideBar())
    }
  }

  const handleUnfoldableChange = () => {
    dispatch(toggleUnfoldable())
  }

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarShow}
      onVisibleChange={handleVisibleChange}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={handleUnfoldableChange} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
