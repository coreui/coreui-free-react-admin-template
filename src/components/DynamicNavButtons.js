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
  CAlert,
  CBadge
} from '@coreui/react'
import { useNavigation } from '../contexts/NavigationContext'

const DynamicNavButtons = ({ onAddDepartment, onAddAsset, departments }) => {
  const [departmentDialogVisible, setDepartmentDialogVisible] = useState(false)
  const [assetDialogVisible, setAssetDialogVisible] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  
  // Asset form states
  const [selectedDepartment, setSelectedDepartment] = useState('')

  // OS Family states
  const [osFamilies, setOsFamilies] = useState([]);
  const [selectedOsFamily, setSelectedOsFamily] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [isLoadingOsFamilies, setIsLoadingOsFamilies] = useState(false);
  
  // Search and CPE matching states
  const [searchQuery, setSearchQuery] = useState('');
  const [cpeMatches, setCpeMatches] = useState([]);
  const [selectedCpeMatch, setSelectedCpeMatch] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Debounced search function
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // API call to search CPE matches
  const searchCpeMatches = async (query) => {
    if (!query.trim()) {
      setCpeMatches([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/security/cpe-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_name: query.trim()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCpeMatches(data.matches || []);
      setShowResults(true);
    } catch (error) {
      console.error('CPE search error:', error);
      setSearchError('Failed to search devices. Please try again.');
      setCpeMatches([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search with 500ms delay
  const debouncedSearch = useCallback(
    debounce(searchCpeMatches, 500),
    [debounce]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSelectedCpeMatch(null); // Clear selection when typing
    debouncedSearch(query);
  };

  // Handle CPE match selection
  const handleCpeMatchSelect = async (cpeMatch) => {
    setSelectedCpeMatch(cpeMatch);
    setSearchQuery(cpeMatch.device_name);
    setShowResults(false);
    setSearchError('');

    // Fetch OS families for the selected vendor
    if (cpeMatch.vendor) {
      await getOsFamilies(cpeMatch.vendor)
    }
  };

  // API call to scan device by OS information
  const scanDeviceByOs = async (deviceName, h_cpe, vendor, model, osFamily, version, department) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/scan-by-os', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_name: deviceName,
          h_cpe: h_cpe,
          vendor: vendor,
          model: model,
          os_family: osFamily,
          version: version,
          department: department
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const scanData = await response.json();
      return scanData;
    } catch (error) {
      console.error('Error scanning device:', error);
      throw error;
    }
  };

  // API call to get OS families by vendor
  const getOsFamilies = async (vendor) => {
    setIsLoadingOsFamilies(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/get-os-families', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendor: vendor
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOsFamilies(data.os_families || []);
      setSelectedOsFamily(data.default_os_family || '');
      return data;
    } catch (error) {
      console.error('Error fetching OS families:', error);
      setSearchError('Failed to fetch OS families. Please try again.');
      setOsFamilies([]);
      setSelectedOsFamily('');
    } finally {
      setIsLoadingOsFamilies(false);
    }
  };

  const handleAssetConfirm = async () => {
    if (!selectedCpeMatch || !selectedDepartment || !selectedOsFamily || !osVersion.trim()) return

    setIsScanning(true)
    setSearchError('')

    try {
      const scanResults = await scanDeviceByOs(
        selectedCpeMatch.device_name,
        selectedCpeMatch.cpe,  // This is h_cpe
        selectedCpeMatch.vendor,
        selectedCpeMatch.model,
        selectedOsFamily,
        osVersion.trim(),
        selectedDepartment
      )
      
      if (!scanResults.success) {
        throw new Error(scanResults.error_message || 'Scan failed')
      }

      // Store OS information and h_cpe in the scan results for future refreshes
      const enhancedResults = {
        ...scanResults,
        device: {
          ...scanResults.device,
          department: selectedDepartment,
          os_family: selectedOsFamily,
          version: osVersion.trim(),
          h_cpe: selectedCpeMatch.cpe  // Store h_cpe in device
        },
        // Store scanning parameters for background refreshes
        scan_params: {
          device_name: selectedCpeMatch.device_name,
          h_cpe: selectedCpeMatch.cpe,  // Store h_cpe for refreshes
          vendor: selectedCpeMatch.vendor,
          model: selectedCpeMatch.model,
          os_family: selectedOsFamily,
          version: osVersion.trim()
        }
      }
      
      // Pass the full API response to addAsset
      onAddAsset(enhancedResults)
      
      // Reset form
      resetAssetForm()
      setAssetDialogVisible(false)
    } catch (error) {
      setSearchError(`Failed to scan device: ${error.message}`)
    } finally {
      setIsScanning(false)
    }
  }

  // Reset asset form function
  const resetAssetForm = () => {
    setSearchQuery('');
    setCpeMatches([]);
    setSelectedCpeMatch(null);
    setShowResults(false);
    setSearchError('');
    setOsFamilies([]);
    setSelectedOsFamily('');
    setOsVersion('');
  };

  // Handle asset dialog cancel
  const handleAssetCancel = () => {
    resetAssetForm();
    setAssetDialogVisible(false);
  };

  // Department handlers
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

  const handleDepartmentCancel = () => {
    setDepartmentName('')
    setDepartmentDialogVisible(false)
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
          <CModalTitle>Add Asset - Security Scan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* Device Search Section */}
          <CRow className="mb-4">
            <CCol md={12}>
              <CFormLabel htmlFor="deviceSearch">Search Devices</CFormLabel>
              <div style={{ position: 'relative' }}>
                <CFormInput
                  id="deviceSearch"
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Start typing device name (e.g., 'Cisco router', 'Windows Server')..."
                  disabled={isScanning}
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

              {/* CPE Match Results */}
              {showResults && cpeMatches.length > 0 && (
                <CCard className="mt-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  <CCardBody className="p-0">
                    <CListGroup flush>
                      {cpeMatches.map((match, index) => (
                        <CListGroupItem 
                          key={index}
                          onClick={() => handleCpeMatchSelect(match)}
                          style={{ cursor: 'pointer' }}
                          className={selectedCpeMatch?.cpe === match.cpe ? 'bg-light' : ''}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div className="flex-grow-1">
                              <div className="fw-bold">{match.device_name}</div>
                              <div className="text-muted small">
                                <strong>Vendor:</strong> {match.vendor} | <strong>Model:</strong> {match.model}
                              </div>
                              
                              <div className="text-muted small" style={{ fontSize: '0.75rem' }}>
                                CPE: {match.cpe}
                              </div>
                              
                            </div>
                            {/*}
                            <CBadge 
                              color={match.score >= 80 ? 'success' : match.score >= 60 ? 'warning' : 'secondary'}
                              className="ms-2"
                            >
                              {match.score}%
                            </CBadge>
                            */}
                          </div>
                        </CListGroupItem>
                      ))}
                    </CListGroup>
                  </CCardBody>
                </CCard>
              )}

              {/* No Results Message */}
              {showResults && cpeMatches.length === 0 && !isSearching && searchQuery.trim() && (
                <CAlert color="info" className="mt-2">
                  No devices found matching your search. Try different keywords.
                </CAlert>
              )}
            </CCol>
          </CRow>

          {/* Selected Device Info */}
          {selectedCpeMatch && (
            <CRow className="mb-3">
              <CCol md={12}>
                <CCard className="border-success">
                  <CCardBody>
                    <h6 className="text-success">Selected Device:</h6>
                    <div><strong>Name:</strong> {selectedCpeMatch.device_name}</div>
                    <div><strong>Vendor:</strong> {selectedCpeMatch.vendor}</div>
                    <div><strong>Model:</strong> {selectedCpeMatch.model}</div>
                    <div className="text-muted small mt-1">
                      <strong>CPE:</strong> {selectedCpeMatch.cpe}
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}

          {/* OS Family and Version Selection */}
          {selectedCpeMatch && (
            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="osFamilySelect">Operating System Family *</CFormLabel>
                <CFormSelect
                  id="osFamilySelect"
                  value={selectedOsFamily}
                  onChange={(e) => setSelectedOsFamily(e.target.value)}
                  disabled={isScanning || isLoadingOsFamilies}
                >
                  <option value="">Select OS family...</option>
                  {osFamilies.map((family, index) => (
                    <option key={index} value={family}>
                      {family}
                    </option>
                  ))}
                </CFormSelect>
                {isLoadingOsFamilies && (
                  <div className="mt-1">
                    <CSpinner size="sm" className="me-2" />
                    <small className="text-muted">Loading OS families...</small>
                  </div>
                )}
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="osVersionInput">OS Version *</CFormLabel>
                <CFormInput
                  id="osVersionInput"
                  type="text"
                  value={osVersion}
                  onChange={(e) => setOsVersion(e.target.value)}
                  placeholder="Enter OS version (e.g., 10.1, 2019, 7.0)..."
                  disabled={isScanning}
                />
              </CCol>
            </CRow>
          )}

          {/* Department Selection */}
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel htmlFor="departmentSelect">Department *</CFormLabel>
              <CFormSelect
                id="departmentSelect"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                disabled={isScanning}
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

          {/* Scanning Status */}
          {isScanning && (
            <CAlert color="info">
              <CSpinner size="sm" className="me-2" />
              Scanning device for vulnerabilities... This may take a few moments.
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleAssetCancel} disabled={isScanning}>
            Cancel
          </CButton>
          <CButton 
            color="primary" 
            onClick={handleAssetConfirm}
            disabled={!selectedCpeMatch || !selectedDepartment || !selectedOsFamily || !osVersion.trim() || isScanning}
          >
            {isScanning ? (
              <>
                <CSpinner size="sm" className="me-2" />
                Scanning...
              </>
            ) : (
              'Scan & Add Asset'
            )}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default DynamicNavButtons