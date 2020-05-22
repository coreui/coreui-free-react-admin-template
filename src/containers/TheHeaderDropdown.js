import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'

const TheHeaderDropdown = () => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem><CIcon name="cil-bell" className="mr-2" /> Updates<CBadge color="info" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem><CIcon name="cil-envelope-open" className="mr-2" /> Messages<CBadge color="success" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem><CIcon name="cil-task" className="mr-2" /> Tasks<CBadge color="danger" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem><CIcon name="cil-comment-square" className="mr-2" /> Comments<CBadge color="warning" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem><CIcon name="cil-user" className="mr-2" /> Profile</CDropdownItem>
        <CDropdownItem><CIcon name="cil-settings" className="mr-2" /> Settings</CDropdownItem>
        <CDropdownItem><CIcon name="cil-credit-card" className="mr-2" /> Payments<CBadge color="secondary" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem><CIcon name="cil-file" className="mr-2" /> Projects<CBadge color="primary" className="ml-auto">42</CBadge></CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem><CIcon name="cil-lock-locked" className="mr-2" /> Lock Account</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
