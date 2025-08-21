import React, { useState, useEffect, useCallback } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CCard,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CAlert
} from '@coreui/react';

const DynamicNavButtons = ({ onAddDepartment, onAddAsset, departments }) => {
  const [departmentDialogVisible, setDepartmentDialogVisible] = useState(false)
  const [assetDialogVisible, setAssetDialogVisible] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  
  // Asset form states
  const [vendor, setVendor] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const [model, setModel] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  // New
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Everything about asset searching and API calls
  // Debounced search function
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // API call to search assets
  const searchCPEMatches = async (deviceName) => {
  if (!deviceName.trim()) {
    setSearchResults([]);
    setShowResults(false);
    return;
  }

  setIsSearching(true);
  setSearchError('');

  try {
    const response = await fetch(`YOUR_API_ENDPOINT/security/cpe-search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_TOKEN`, // Replace with your auth token
      },
      body: JSON.stringify({
        device_name: deviceName.trim()
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Backend returns: { device_name, matches: [CPEMatch], total_matches }
    // CPEMatch: { device_name, vendor, model, cpe, score }
    setSearchResults(data.matches || []);
    setShowResults(true);
  } catch (error) {
    console.error('CPE search error:', error);
    setSearchError('Failed to search for device matches. Please try again.');
    setSearchResults([]);
    setShowResults(false);
  } finally {
    setIsSearching(false);
  }
};

  // Debounced search with 400ms delay
  const debouncedSearch = useCallback(
    debounce(searchAssets, 400),
    [debounce]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle asset selection from search results
  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setSearchQuery(asset.name || `${asset.vendor} ${asset.model}`); // Display selected asset
    setShowResults(false);
  };

  // API call to get full asset details
  const scanDeviceByCPE = async (cpe, deviceName = null, department = "Unknown") => {
  try {
    const response = await fetch(`YOUR_API_ENDPOINT/security/scan-by-cpe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_TOKEN`, // Replace with your auth token
      },
      body: JSON.stringify({
        cpe: cpe,
        device_name: deviceName,
        department: department
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const scanResults = await response.json();
    /* Backend returns FullScanResponse:
    {
      success: boolean,
      error_message: string | null,
      scan_time: float,
      device: AssetInfo | null,
      cves: CVEInfo[],
      cwes: CWEInfo[],
      capecs: CAPECInfo[],
      attacks: AttackInfo[],
      statistics: { cves: int, cwes: int, capecs: int, attacks: int }
    }
    */
    return scanResults;
  } catch (error) {
    console.error('Error scanning device by CPE:', error);
    throw error;
  }
};

  // Enhanced confirm handler
  const handleAssetConfirm = async () => {
    if (!selectedAsset || !selectedDepartment) return;

    try {
      const assetDetails = await getAssetDetails(selectedAsset.id);
      
      const asset = {
        ...assetDetails,
        department: selectedDepartment,
        name: assetDetails.name || `${assetDetails.vendor} ${assetDetails.deviceType} - ${assetDetails.model}`,
        id: assetDetails.id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }
      
      onAddAsset(asset);
      
      // Reset form
      setSearchQuery('');
      setSelectedAsset(null);
//      setSelectedDepartment('');
      setSearchResults([]);
      setShowResults(false);
      setSearchError('');
      setAssetDialogVisible(false);
    } catch (error) {
      setSearchError('Failed to get asset details. Please try again.');
    }
  };

  // Reset form function
  const resetForm = () => {
    setVendor('');
    setDeviceType('');
    setModel('');
//    setSelectedDepartment('');
    setSearchQuery('');
    setSearchResults([]);
    setSelectedAsset(null);
    setShowResults(false);
    setSearchError('');
  };

  // Reset form when modal opens/closes
  //useEffect(() => {
  //  if (!assetDialogVisible) {
  //    resetForm();
  //  }
  //}, [assetDialogVisible]);

  // Handle cancel
  const handleAssetCancel = () => {
    setSearchQuery('');
    setSelectedAsset(null);
//    setSelectedDepartment('');
    setSearchResults([]);
    setShowResults(false);
    setSearchError('');
    setAssetDialogVisible(false);
  };



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
/*
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
*/
  const handleDepartmentCancel = () => {
    setDepartmentName('')
    setDepartmentDialogVisible(false)
  }
/*
  const handleAssetCancel = () => {
    setVendor('')
    setDeviceType('')
    setModel('')
    setSelectedDepartment('')
    setAssetDialogVisible(false)
  }
*/
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
      
      {/* Asset Dialog*/}
      <CModal visible={assetDialogVisible} onClose={handleAssetCancel} size="lg">
      <CModalHeader onClose={handleAssetCancel}>
        <CModalTitle>Add Asset</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Search Section */}
        <CRow className="mb-4">
          <CCol md={12}>
            <CFormLabel htmlFor="assetSearch">Search Assets</CFormLabel>
            <div style={{ position: 'relative' }}>
              <CFormInput
                id="assetSearch"
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Start typing to search for assets..."
              />
              {isSearching && (
                <div style={{ 
                  position: 'absolute', 
                  right: '10px', 
                  top: '50%', 
                  transform: 'translateY(-50%)' 
                }}>
                  <CSpinner size="sm" />
                </div>
              )}
            </div>
            
            {/* Search Error */}
            {searchError && (
              <CAlert color="danger" className="mt-2">
                {searchError}
              </CAlert>
            )}

            {/* Search Results */}
            {showResults && searchResults.length > 0 && (
              <CCard className="mt-2" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <CListGroup flush>
                  {searchResults.map((asset, index) => (
                    <CListGroupItem 
                      key={asset.id || index}
                      action
                      onClick={() => handleAssetSelect(asset)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div>
                        <strong>{asset.name || `${asset.vendor} ${asset.model}`}</strong>
                        {asset.vendor && <div className="text-muted small">Vendor: {asset.vendor}</div>}
                        {asset.deviceType && <div className="text-muted small">Type: {asset.deviceType}</div>}
                        {asset.model && <div className="text-muted small">Model: {asset.model}</div>}
                      </div>
                    </CListGroupItem>
                  ))}
                </CListGroup>
              </CCard>
            )}

            {/* No Results Message */}
            {showResults && searchResults.length === 0 && !isSearching && (
              <CAlert color="info" className="mt-2">
                No assets found matching your search.
              </CAlert>
            )}
          </CCol>
        </CRow>

        {/* Department Selection */}
        <CRow className="mb-3">
          <CCol md={12}>
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
          disabled={!selectedAsset || !selectedDepartment}
        >
          Confirm
        </CButton>
      </CModalFooter>
    </CModal>
    </>
  )
}

export default DynamicNavButtons