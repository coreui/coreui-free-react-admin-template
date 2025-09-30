import React, { useState } from 'react'
import { 
  CButton, 
  CCard, 
  CCardBody, 
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CListGroup,
  CListGroupItem,
  CBadge,
  CSpinner
} from '@coreui/react'
import { useNavigation } from '../hooks/useNavigation'

const DataManagement = () => {
  const { 
    departments, 
    assets, 
    removeDepartment, 
    removeAsset, 
    clearAllData 
  } = useNavigation()
  
  const [showClearModal, setShowClearModal] = useState(false)
  const [deletingItems, setDeletingItems] = useState({})

  const handleRemoveDepartment = async (dept) => {
    setDeletingItems(prev => ({ ...prev, [`dept-${dept}`]: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100)) // Small delay for UI feedback
      removeDepartment(dept)
      // Optional: Show success message
    } catch (error) {
      console.error('Error removing department:', error)
    } finally {
      setDeletingItems(prev => {
        const newState = { ...prev }
        delete newState[`dept-${dept}`]
        return newState
      })
    }
  }

  const handleRemoveAsset = async (assetId) => {
    setDeletingItems(prev => ({ ...prev, [`asset-${assetId}`]: true }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100)) // Small delay for UI feedback
      removeAsset(assetId)
      // Optional: Show success message
    } catch (error) {
      console.error('Error removing asset:', error)
    } finally {
      setDeletingItems(prev => {
        const newState = { ...prev }
        delete newState[`asset-${assetId}`]
        return newState
      })
    }
  }

  const handleClearAll = () => {
    clearAllData()
    setShowClearModal(false)
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <h4>Data Management</h4>
        </CCardHeader>
        <CCardBody>
          <div className="mb-4">
            <h5>Departments <CBadge color="info">{departments.length}</CBadge></h5>
            <CListGroup>
              {departments.map((dept, index) => {
                const deptAssets = assets.filter(asset => asset.department === dept)
                return (
                  <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                    <span>
                      {dept} 
                      <CBadge color="secondary" className="ms-2">
                        {deptAssets.length} assets
                      </CBadge>
                    </span>
                    <CButton 
                      size="sm" 
                      color="danger" 
                      variant="outline"
                      onClick={() => handleRemoveDepartment(dept)}
                      disabled={deletingItems[`dept-${dept}`]}
                    >
                      {deletingItems[`dept-${dept}`] ? (
                        <>
                          <CSpinner size="sm" />
                        </>
                      ) : 'Remove'}
                    </CButton>
                  </CListGroupItem>
                )
              })}
              {departments.length === 0 && (
                <CListGroupItem>No departments created yet</CListGroupItem>
              )}
            </CListGroup>
          </div>

          <div className="mb-4">
            <h5>Assets <CBadge color="info">{assets.length}</CBadge></h5>
            <CListGroup>
              {assets.map((asset) => (
                <CListGroupItem key={asset.id} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{asset.name}</strong>
                    <br />
                    <small className="text-muted">
                      Department: {asset.department} | Vendor: {asset.vendor}
                    </small>
                  </div>
                  <CButton 
                    size="sm" 
                    color="danger" 
                    variant="outline"
                    onClick={() => handleRemoveAsset(asset.id)}
                    disabled={deletingItems[`asset-${asset.id}`]}
                  >
                    {deletingItems[`asset-${asset.id}`] ? (
                      <>
                        <CSpinner size="sm" />
                      </>
                    ) : 'Remove'}
                  </CButton>
                </CListGroupItem>
              ))}
              {assets.length === 0 && (
                <CListGroupItem>No assets created yet</CListGroupItem>
              )}
            </CListGroup>
          </div>

          <div className="mt-4">
            <CButton 
              color="danger" 
              onClick={() => setShowClearModal(true)}
              disabled={departments.length === 0 && assets.length === 0}
            >
              Clear All Data
            </CButton>
          </div>
        </CCardBody>
      </CCard>

      {/* Clear All Confirmation Modal */}
      <CModal visible={showClearModal} onClose={() => setShowClearModal(false)}>
        <CModalHeader onClose={() => setShowClearModal(false)}>
          <CModalTitle>Confirm Clear All Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to clear all departments and assets? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowClearModal(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleClearAll}>
            Clear All Data
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DataManagement