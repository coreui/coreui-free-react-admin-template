import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilUser, cilSettings, cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { handleLogout } from '../../features/auth/authSlice'
import avatar8 from './../../assets/images/avatars/8.jpg'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../../utils/api/axiosConfig'

const AppHeaderDropdown = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user) 
  // const [departmentName, setDepartmentName] = useState('')

  // useEffect(() => {
  //   const fetchDepartments=async()=>{
  //     if (user?.departmentId) {
  //     const response = await axiosInstance.get(`api/departments/${user.departmentId}`)
  //     setDepartmentName(response.data.name)
  //   }}
  //   fetchDepartments()
    
  // }, [user?.departmentId])

  const logout = () => {
    dispatch(handleLogout())
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      
        <CDropdownHeader className="bg-body-secondary fw-semibold my-2 text-center">
          {user.firstName} {user.lastName} <br />
          <small className="text-muted">{user.role?.name}</small> <br />
          
        </CDropdownHeader>

        <CDropdownDivider />

        <CDropdownItem href="/profile">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
