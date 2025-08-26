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
} from '@coreui/react';

const DynamicNavButtons = ({ onAddDepartment, onAddAsset, departments }) => {
  const [departmentDialogVisible, setDepartmentDialogVisible] = useState(false)
  const [assetDialogVisible, setAssetDialogVisible] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  
  // Asset form states
  const [selectedDepartment, setSelectedDepartment] = useState('')
  
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
  const handleCpeMatchSelect = (cpeMatch) => {
    setSelectedCpeMatch(cpeMatch);
    setSearchQuery(cpeMatch.device_name);
    setShowResults(false);
    setSearchError('');
  };

  // API call to scan device by CPE and get full vulnerability data
  const scanDeviceByCpe = async (cpe, deviceName, department) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/scan-by-cpe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

      const scanData = await response.json();
      return scanData;
    } catch (error) {
      console.error('Error scanning device:', error);
      throw error;
    }
  };

  // Enhanced confirm handler
  const handleAssetConfirm = async () => {
    if (!selectedCpeMatch || !selectedDepartment) return;

    setIsScanning(true);
    setSearchError('');

    try {
      const scanResults = await scanDeviceByCpe(
        selectedCpeMatch.cpe,
        selectedCpeMatch.device_name,
        selectedDepartment
      );
      
      if (!scanResults.success) {
        throw new Error(scanResults.error_message || 'Scan failed');
      }

      // Create asset object with scan results
      const asset = {
        id: scanResults.device?.id || `scan-${Date.now()}`,
        name: scanResults.device?.name || selectedCpeMatch.device_name,
        vendor: scanResults.device?.vendor || selectedCpeMatch.vendor,
        model: scanResults.device?.model || selectedCpeMatch.model,
        type: scanResults.device?.type || 'Unknown',
        department: selectedDepartment,
        risk_level: scanResults.device?.risk_level || 0,
        cpe: selectedCpeMatch.cpe,
        vulnerabilities: {
          cves: scanResults.cves || [],
          cwes: scanResults.cwes || [],
          capecs: scanResults.capecs || [],
          attacks: scanResults.attacks || []
        },
        statistics: scanResults.statistics || {},
        scan_time: scanResults.scan_time || 0
      };
      
      onAddAsset(asset);
      
      // Reset form
      resetAssetForm();
      setAssetDialogVisible(false);
    } catch (error) {
      setSearchError(`Failed to scan device: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  // Reset asset form function
  const resetAssetForm = () => {
    setSearchQuery('');
    setCpeMatches([]);
    setSelectedCpeMatch(null);
    setShowResults(false);
    setSearchError('');
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
                          action
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
            disabled={!selectedCpeMatch || !selectedDepartment || isScanning}
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