/*import React from 'react'
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

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} /> 
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)


import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol
} from '@coreui/react'
import { cilSpeedometer, cilSettings, cilDevices } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [departments, setDepartments] = useState([])
  const [showDepartmentModal, setShowDepartmentModal] = useState(false)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  const [newDepartmentName, setNewDepartmentName] = useState('')
  const [newDeviceName, setNewDeviceName] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  // Handle adding new department
  const handleAddDepartment = () => {
    if (newDepartmentName.trim()) {
      const newDepartment = {
        id: Date.now(),
        name: newDepartmentName.trim(),
        devices: []
      }
      setDepartments([...departments, newDepartment])
      setNewDepartmentName('')
      setShowDepartmentModal(false)
    }
  }

  // Handle adding new device
  const handleAddDevice = () => {
    if (newDeviceName.trim() && selectedDepartment) {
      setDepartments(prevDepartments => 
        prevDepartments.map(dept => 
          dept.id === parseInt(selectedDepartment)
            ? {
                ...dept,
                devices: [...dept.devices, {
                  id: Date.now(),
                  name: newDeviceName.trim(),
                  route: `/device/${Date.now()}`
                }]
              }
            : dept
        )
      )
      setNewDeviceName('')
      setSelectedDepartment('')
      setShowDeviceModal(false)
    }
  }

  // Generate navigation items
  const navigation = [
    {
      component: CNavItem,
      name: 'Overview',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
    },
    // Add departments as nav groups
    ...departments.map(department => ({
      component: CNavGroup,
      name: department.name,
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      items: department.devices.map(device => ({
        component: CNavItem,
        name: device.name,
        to: device.route,
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />
      }))
    }))
  ]

  return (
    <>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible })
        }}
      >
        <CSidebarBrand>
          <div className="sidebar-brand-full">
            Your App Name
          </div>
        </CSidebarBrand>
        
        <CSidebarNav>
          //{ Overview Item }
          <CNavItem to="/overview">
            <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
            Overview
          </CNavItem>

          //{ Empty Space }
          <div style={{ height: '30px' }}></div>

          //{ Action Buttons }
          <div style={{ padding: '10px 16px' }}>
            <CRow>
              <CCol xs={6}>
                <CButton 
                  color="primary" 
                  size="sm" 
                  className="w-100"
                  onClick={() => setShowDepartmentModal(true)}
                >
                  Add Department
                </CButton>
              </CCol>
              <CCol xs={6}>
                <CButton 
                  color="success" 
                  size="sm" 
                  className="w-100"
                  onClick={() => setShowDeviceModal(true)}
                >
                  Add Device
                </CButton>
              </CCol>
            </CRow>
          </div>

          //{ Dynamic Navigation Groups }
          {departments.map(department => (
            <CNavGroup
              key={department.id}
              toggler={
                <>
                  <CIcon icon={cilSettings} customClassName="nav-icon" />
                  {department.name}
                </>
              }
            >
              {department.devices.map(device => (
                <CNavItem key={device.id} to={device.route}>
                  <CIcon icon={cilDevices} customClassName="nav-icon" />
                  {device.name}
                </CNavItem>
              ))}
            </CNavGroup>
          ))}
        </CSidebarNav>
      </CSidebar>

      //{ Add Department Modal }
      <CModal visible={showDepartmentModal} onClose={() => setShowDepartmentModal(false)}>
        <CModalHeader>
          <CModalTitle>Add New Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="departmentName">Department Name</CFormLabel>
              <CFormInput
                type="text"
                id="departmentName"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                placeholder="Enter department name"
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDepartmentModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleAddDepartment}>
            Add Department
          </CButton>
        </CModalFooter>
      </CModal>

      //{ Add Device Modal }
      <CModal visible={showDeviceModal} onClose={() => setShowDeviceModal(false)}>
        <CModalHeader>
          <CModalTitle>Add New Device</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="deviceName">Device Name</CFormLabel>
              <CFormInput
                type="text"
                id="deviceName"
                value={newDeviceName}
                onChange={(e) => setNewDeviceName(e.target.value)}
                placeholder="Enter device name"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="departmentSelect">Select Department</CFormLabel>
              <CFormSelect
                id="departmentSelect"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Choose department...</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </CFormSelect>
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeviceModal(false)}>
            Cancel
          </CButton>
          <CButton 
            color="primary" 
            onClick={handleAddDevice}
            disabled={!newDeviceName.trim() || !selectedDepartment}
          >
            Add Device
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default AppSidebar*/

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CSidebarNav,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'
import { getNavigation } from '../_nav'
import { useNavigation } from '../hooks/useNavigation'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  
  // Use our custom navigation hook
  const { departments, addDepartment, addAsset, dynamicNavItems } = useNavigation()
  
  // Get the complete navigation with dynamic items
  const navigation = getNavigation(departments, addDepartment, addAsset, dynamicNavItems)

  return (
    <CSidebar
      className="d-print-none sidebar sidebar-fixed"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img src={sygnet} alt="logo" height={32} />
          <img src={logo} alt="logo" height={20} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)