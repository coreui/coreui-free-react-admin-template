import React, { useState } from 'react'
import { CAlert, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { useAuth } from '../../contexts/AuthContext'
import {  useHistory } from 'react-router-dom'
const AppHeaderDropdown = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  async function handleLogOut() {
    setError('')
    try {
      await logout()
      history.pushState('/login')
    } catch {
      setError('failed to logout')
    }
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdown>
        <CDropdownToggle color="secondary">{currentUser.email}</CDropdownToggle>

        <CDropdownMenu>
          <CDropdownItem href="#">Settings </CDropdownItem>
          <CDropdownItem href="/update-profile">Update Profile</CDropdownItem>
          {error && <CAlert color="danger">{error}</CAlert>}
          <CDropdownItem onClick={handleLogOut}>Log Out</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CDropdown>
  )
}

export default AppHeaderDropdown
