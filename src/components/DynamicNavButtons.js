import React, { useState } from 'react'
import { 
  CButton, 
  CModal, 
  CModalHeader, 
  CModalTitle, 
  CModalBody, 
  CModalFooter,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol
} from '@coreui/react'

const DynamicNavButtons = ({ onAddDepartment, onAddAsset, departments }) => {
  const [departmentDialogVisible, setDepartmentDialogVisible] = useState(false)
  const [assetDialogVisible, setAssetDialogVisible] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  
  // Asset form states
  const [vendor, setVendor] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [model, setModel] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const handleAddDepartment = () => {
    setDepartmentDialogVisible(true)
  }

  const handleAddAsset = () => {
    setAssetDialogVisible(true)
  }

  const handleDepartmentConfirm = () => {
    if (departmentName.trim()) {
      onAddDepartment(departmentName.trim())
      setDepartmentName('')
      setDepartmentDialogVisible(false)
    }
  }

  const handleAssetConfirm = () => {
    if (vendor.trim() && deviceType.trim() && model.trim() && selectedDepartment) {
      const asset = {
        vendor: vendor.trim(),
        deviceType: deviceType.trim(),
        model: model.trim(),
        department: selectedDepartment,
        name: `${vendor} ${deviceType} - ${model}`,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      
      onAddAsset(asset)
      
      // Reset form
      setVendor('')
      setDeviceType('')
      setModel('')
      setSelectedDepartment('')
      setAssetDialogVisible(false)
    }
  }

  const handleDepartmentCancel = () => {
    setDepartmentName('')
    setDepartmentDialogVisible(false)
  }

  const handleAssetCancel = () => {
    setVendor('')
    setDeviceType('')
    setModel('')
    setSelectedDepartment('')
    setAssetDialogVisible(false)
  }

  return (
    <>
      <div className="px-3 py-2">
        <div className="d-flex gap-2">
          <CButton 
            size="sm" 
            color="primary" 
            variant="outline"
            className="flex-fill"
            onClick={handleAddDepartment}
          >
            Add Dept
          </CButton>
          <CButton 
            size="sm" 
            color="success" 
            variant="outline"
            className="flex-fill"
            onClick={handleAddAsset}
          >
            Add Asset
          </CButton>
        </div>
      </div>

      {/* Department Dialog */}
      <CModal visible={departmentDialogVisible} onClose={handleDepartmentCancel}>
        <CModalHeader onClose={handleDepartmentCancel}>
          <CModalTitle>Add Department</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="departmentInput">Department Name</CFormLabel>
          <CFormInput
            id="departmentInput"
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && departmentName.trim()) {
                handleDepartmentConfirm()
              }
            }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleDepartmentCancel}>
            Cancel
          </CButton>
          <CButton 
            color="primary" 
            onClick={handleDepartmentConfirm}
            disabled={!departmentName.trim()}
          >
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Asset Dialog */}
      <CModal visible={assetDialogVisible} onClose={handleAssetCancel} size="lg">
        <CModalHeader onClose={handleAssetCancel}>
          <CModalTitle>Add Asset</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="vendorInput">Vendor</CFormLabel>
              <CFormInput
                id="vendorInput"
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                placeholder="Enter vendor name..."
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="deviceTypeInput">Device Type</CFormLabel>
              <CFormInput
                id="deviceTypeInput"
                type="text"
                value={deviceType}
                onChange={(e) => setDeviceType(e.target.value)}
                placeholder="Enter device type..."
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel htmlFor="modelInput">Model</CFormLabel>
              <CFormInput
                id="modelInput"
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Enter model..."
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="departmentSelect">Department</CFormLabel>
              <CFormSelect
                id="departmentSelect"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">Select department...</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleAssetCancel}>
            Cancel
          </CButton>
          <CButton 
            color="primary" 
            onClick={handleAssetConfirm}
            disabled={!vendor.trim() || !deviceType.trim() || !model.trim() || !selectedDepartment}
          >
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DynamicNavButtons