import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout, clearImgSrc, clearStudentInfo, selectLogin } from '../../slices/loginSlice'
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
  const { imgSrc, studentID } = useSelector(selectLogin)
  const handleLogOut = (e) => {
    e.preventDefault()
    axios
      .post('/api/logout', {})
      .then((res) => {
        alert('登出成功!')
        dispatch(logout())
        dispatch(clearImgSrc())
        dispatch(clearStudentInfo())
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
        <CDropdownItem component={Link} to={`/profile/${studentID}`}>
          <CIcon icon="cil-user" name="cil-user" className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownItem component={Link} to="/own_recruitment">
          <CIcon icon="cil-user" name="cil-user" className="me-2" />
          Your Recruitment
        </CDropdownItem>

        <CDropdownItem component={Link} to={`/own_recommendation`}>
          <CIcon icon="cil-user" name="cil-user" className="me-2" />
          Your Recommendation
        </CDropdownItem>

        <CDropdownItem href="#">
          <CIcon icon="cil-settings" name="cil-settings" className="me-2" />
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
          <CIcon icon="cil-lock-locked" name="cil-lock-locked" className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
