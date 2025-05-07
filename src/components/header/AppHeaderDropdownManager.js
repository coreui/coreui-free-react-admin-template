import React from 'react'
import {
  CDropdownDivider,
  CDropdownToggle,
  CDropdownHeader,
  CDropdownMenu,
  CDropdownItem,
  CDropdown,
  CAvatar,
  CBadge,
  CCol,
} from '@coreui/react'
import {
  cilCommentSquare,
  cilAccountLogout,
  cilEnvelopeOpen,
  cilCreditCard,
  cilSettings,
  cilBell,
  cilFile,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkAuthentication, logout } from '../../actions/authActions'

const AppHeaderDropdownManager = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = async (e) => {
    e.preventDefault()
    await dispatch(logout())
    // await dispatch(checkAuthentication())
  }
  return (
    <CDropdown variant="nav-item">
      <CCol className="d-flex align-items-center">
        <div className="fw-semibold">
          {user.user.FirstName} {user.user.LastName}
        </div>
        <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
          <CAvatar src={avatar8} size="md" alt="avatar" />
        </CDropdownToggle>
      </CCol>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">Profile</CDropdownItem>
        <CDropdownItem href="#">Settings</CDropdownItem>
        <CDropdownItem href="/jira/config-jira-api">configuration jira API</CDropdownItem>
        <CDropdownItem href="#">Projects</CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdownManager
