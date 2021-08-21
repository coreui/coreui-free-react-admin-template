import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, clearImgSrc, selectLogin } from '../../slices/loginSlice'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const { imgSrc } = useSelector(selectLogin)
  const handleLogOut = (e) => {
    e.preventDefault()
    axios
      .post('/api/logout', {})
      .then((res) => {
        alert('登出成功!')
        dispatch(logout())
        dispatch(clearImgSrc())
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {/* <h6>src/components/header/AppHeaderDropDown/CAvator</h6> */}
        <CAvatar size="md" src={imgSrc} />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon name="cil-user" className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-settings" className="me-2" />
          Settings
        </CDropdownItem>
        {/* <CDropdownItem href="#">
          <CIcon name="cil-credit-card" className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogOut}>
          <CIcon name="cil-lock-locked" className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
