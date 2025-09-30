import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilFolder, cilDescription } from '@coreui/icons'

const DEPARTMENTS_STORAGE_KEY = 'coreui_departments'
const ASSETS_STORAGE_KEY = 'coreui_assets'

export const useNavigation = () => {
  // Initialize state from localStorage
  const [departments, setDepartments] = useState(() => {
    try {
      const savedDepartments = localStorage.getItem(DEPARTMENTS_STORAGE_KEY)
      return savedDepartments ? JSON.parse(savedDepartments) : []
    } catch (error) {
      console.error('Error loading departments from localStorage:', error)
      return []
    }
  })

  const calculateNormalizedRiskLevel = (cve) => {
    // Normalize EPSS (0-1) to (0-5)
    const normalizedEpss = (cve.epss || 0) * 5
    
    // Normalize Impact Score (0-10) to (0-5)
    const normalizedImpact = ((cve.impact_score || 0) / 10) * 5
    
    // Normalize Exploitability Score (0-10) to (0-5)
    const normalizedExploit = ((cve.exploitability_score || 0) / 10) * 5
    
    // Calculate risk level: epss * impact * exploitability (0-125)
    const riskLevel = normalizedEpss * normalizedImpact * normalizedExploit
    
    return riskLevel
  }

  const [assets, setAssets] = useState(() => {
    try {
      const savedAssets = localStorage.getItem(ASSETS_STORAGE_KEY)
      return savedAssets ? JSON.parse(savedAssets) : []
    } catch (error) {
      console.error('Error loading assets from localStorage:', error)
      return []
    }
  })

  const abortControllersRef = useRef({})

  // Save departments to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(departments))
    } catch (error) {
      console.error('Error saving departments to localStorage:', error)
    }
  }, [departments])

  // Save assets to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(assets))
    } catch (error) {
      console.error('Error saving assets to localStorage:', error)
    }
  }, [assets])

  useEffect(() => {
    return () => {
      Object.values(abortControllersRef.current).forEach(controller => controller.abort())
      abortControllersRef.current = {}
    }
  }, [])

  const addDepartment = (departmentName) => {
    if (!departments.includes(departmentName)) {
      setDepartments(prev => [...prev, departmentName])
    }
  }

  const addAsset = useCallback((apiResponse) => {
    if (!apiResponse || !apiResponse.device) return
    
//    const assetId = apiResponse.device?.id?.toString() || `asset-${Date.now()}-${Math.random()}`
    // Make asset ID unique by appending version
    const assetId = apiResponse.device?.id?.toString()
      ? `${apiResponse.device.id}-${apiResponse.device.version || ''}`
      : `asset-${Date.now()}-${Math.random()}`

    
    // Cancel any pending fetches for this asset
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
      delete abortControllersRef.current[assetId]
    }
    
    const asset = {
      id: assetId,
      name: apiResponse.device?.name || 'Unknown Device',
      vendor: apiResponse.device?.vendor || 'Unknown Vendor',
      model: apiResponse.device?.model || 'Unknown Model',
      version: apiResponse.device?.version || '',
      type: apiResponse.device?.type || 'Unknown',
      department: apiResponse.device?.department || '',
      description: apiResponse.device?.description || '',
      risk_level: apiResponse.device?.risk_level || 0,
      os_family: apiResponse.device?.os_family || '',
      h_cpe: apiResponse.device?.h_cpe || '',
      
      // Store scan parameters for future refreshes
      scan_params: {
        device_name: apiResponse.device?.name,
        h_cpe: apiResponse.device?.h_cpe,
        vendor: apiResponse.device?.vendor,
        model: apiResponse.device?.model,
        os_family: apiResponse.device?.os_family,
        version: apiResponse.device?.version,
        department: apiResponse.device?.department
      },
      
      // Store vulnerability data - complete replacement, no merging
      vulnerabilities: {
        cves: apiResponse.cves || [],
        cwes: apiResponse.cwes || [],
        capecs: apiResponse.capecs || [],
        attacks: apiResponse.attacks || []
      },
      statistics: apiResponse.statistics || {},
      scan_time: apiResponse.scan_time || 0,
      last_updated: new Date().toISOString(),
      deviceType: apiResponse.device?.type || 'Unknown'
    }
    
    // Immutable state update
    setAssets(prev => {
      const filtered = prev.filter(a => a.id !== assetId)
      return [...filtered, asset]
    })
  }, [])

  // Add new function to update existing asset
  const updateAsset = useCallback((assetId, apiResponse) => {
    if (!apiResponse) return
    
    // Cancel any pending fetches for this asset
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
      delete abortControllersRef.current[assetId]
    }
    
    setAssets(prev => {
      return prev.map(asset => {
        if (asset.id !== assetId) return asset
        
        // Complete replacement of vulnerability data
        return {
          ...asset,
          vulnerabilities: {
            cves: apiResponse.cves || [],
            cwes: apiResponse.cwes || [],
            capecs: apiResponse.capecs || [],
            attacks: apiResponse.attacks || []
          },
          statistics: apiResponse.statistics || {},
          scan_time: apiResponse.scan_time || 0,
          last_updated: new Date().toISOString(),
          risk_level: apiResponse.device?.risk_level || asset.risk_level || 0,
          
          // Update device info if provided
          ...(apiResponse.device && {
            os_family: apiResponse.device.os_family || asset.os_family,
            version: apiResponse.device.version || asset.version,
            description: apiResponse.device.description || asset.description,
            h_cpe: apiResponse.device.h_cpe || asset.h_cpe,
            risk_level: apiResponse.device.risk_level || 0,
            
            // Update scan_params for future refreshes
            scan_params: {
              ...asset.scan_params,
              os_family: apiResponse.device.os_family || asset.scan_params?.os_family,
              version: apiResponse.device.version || asset.scan_params?.version,
              h_cpe: apiResponse.device.h_cpe || asset.scan_params?.h_cpe
            }
          })
        }
      })
    })
  }, [])

  const refreshAsset = useCallback(async (assetId) => {
    const asset = assets.find(a => a.id === assetId)
    if (!asset || !asset.scan_params) return
    
    // Cancel any existing fetch for this asset
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
    }
    
    // Create new abort controller
    const abortController = new AbortController()
    abortControllersRef.current[assetId] = abortController
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/security/scan-by-os', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: abortController.signal,
        body: JSON.stringify({
          device_name: asset.scan_params.device_name || asset.name,
          h_cpe: asset.scan_params.h_cpe || asset.h_cpe || '',
          vendor: asset.scan_params.vendor || asset.vendor,
          model: asset.scan_params.model || asset.model,
          os_family: asset.scan_params.os_family || asset.os_family,
          version: asset.scan_params.version || asset.version,
          department: asset.department
        })
      })
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      
      const apiResponse = await response.json()
      if (apiResponse.success) {
        updateAsset(assetId, apiResponse)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log(`Fetch aborted for asset ${assetId}`)
      } else {
        console.error(`Failed to refresh asset ${assetId}:`, error)
      }
    } finally {
      // Clean up abort controller reference
      if (abortControllersRef.current[assetId] === abortController) {
        delete abortControllersRef.current[assetId]
      }
    }
  }, [assets, updateAsset])

  // Add background refresh function
  const refreshAllAssets = async () => {
    for (const asset of assets) {
      try {
        // Skip if recently updated (less than 5 minutes ago)
        if (asset.last_updated) {
          const lastUpdate = new Date(asset.last_updated)
          const now = new Date()
          const diffMinutes = (now - lastUpdate) / (1000 * 60)
          if (diffMinutes < 5) continue
        }

        // Use the new scan-by-os endpoint if we have scan parameters
        if (asset.scan_params && asset.scan_params.os_family) {
          const response = await fetch('http://localhost:8000/api/v1/security/scan-by-os', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              device_name: asset.scan_params.device_name || asset.name,
              vendor: asset.scan_params.vendor || asset.vendor,
              model: asset.scan_params.model || asset.model,
              os_family: asset.scan_params.os_family,
              version: asset.scan_params.version || asset.version,
              department: asset.department
            })
          })

          if (response.ok) {
            const apiResponse = await response.json()
            if (apiResponse.success) {
              updateAsset(asset.id, apiResponse)
            }
          }
        }
        // Fallback to old CPE method if no OS parameters available
        else if (asset.cpe) {
          const response = await fetch('http://localhost:8000/api/v1/security/scan-by-cpe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              cpe: asset.cpe,
              device_name: asset.name,
              department: asset.department
            })
          })

          if (response.ok) {
            const apiResponse = await response.json()
            if (apiResponse.success) {
              updateAsset(asset.id, apiResponse)
            }
          }
        }
      } catch (error) {
        console.error(`Failed to refresh asset ${asset.name}:`, error)
      }
    }
  }

  // Function to clear all data (useful for testing or reset functionality)
  const clearAllData = useCallback(() => {
    // Cancel all pending fetches
    Object.values(abortControllersRef.current).forEach(controller => controller.abort())
    abortControllersRef.current = {}
    
    // Clear all state
    setDepartments([])
    setAssets([])
    
    // Clear localStorage
    localStorage.removeItem(DEPARTMENTS_STORAGE_KEY)
    localStorage.removeItem(ASSETS_STORAGE_KEY)
  }, [])

  // Function to remove a specific department and its assets
  const removeDepartment = useCallback((departmentName) => {
    // Get all asset IDs for this department
    const departmentAssetIds = assets.filter(a => a.department === departmentName).map(a => a.id)
    
    // Cancel all pending fetches for department assets
    departmentAssetIds.forEach(assetId => {
      if (abortControllersRef.current[assetId]) {
        abortControllersRef.current[assetId].abort()
        delete abortControllersRef.current[assetId]
      }
    })
    
    // Remove department
    setDepartments(prev => prev.filter(dept => dept !== departmentName))
    
    // Remove all assets in this department
    setAssets(prev => {
      const newAssets = prev.filter(asset => asset.department !== departmentName)
      
      // Update localStorage immediately
      try {
        localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(newAssets))
      } catch (error) {
        console.error('Error saving assets after department removal:', error)
      }
      
      return newAssets
    })
  }, [assets])

  // Function to remove a specific asset
  const removeAsset = useCallback((assetId) => {
    // Cancel any pending fetches for this asset
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
      delete abortControllersRef.current[assetId]
    }
    
    // Immutable state update - remove asset and all its data
    setAssets(prev => {
      const newAssets = prev.filter(asset => asset.id !== assetId)
      
      // Update localStorage immediately
      try {
        localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(newAssets))
      } catch (error) {
        console.error('Error saving assets after removal:', error)
      }
      
      return newAssets
    })
  }, [])

  const dynamicNavItems = useMemo(() => {
    const navItems = []

    departments.forEach(department => {
      const departmentAssets = assets.filter(asset => asset.department === department)
      
      if (departmentAssets.length > 0) {
        navItems.push({
          component: CNavGroup,
          name: department,
          icon: <CIcon icon={cilFolder} customClassName="nav-icon"/>,
          items: departmentAssets.map(asset => ({
            key: asset.id,
            component: CNavItem,
            name: asset.name,
            to: `/asset/${asset.id}`,
            icon: <CIcon icon={cilDescription} customClassName="nav-icon"/>,
          }))
        })
      } else {
        // Show department even if no assets yet
        navItems.push({
          component: CNavGroup,
          name: department,
          icon: <CIcon icon={cilFolder} customClassName="nav-icon"/>,
          items: [{
            component: CNavItem,
            name: 'No assets yet',
            to: '#',
            disabled: true,
            style: { fontStyle: 'italic', opacity: 0.6 }
          }]
        })
      }
    })

    return navItems
  }, [departments, assets])

  return {
    departments,
    assets,
    addDepartment,
    addAsset,
    updateAsset,
    refreshAsset,
    refreshAllAssets,
    removeDepartment,
    removeAsset,
    clearAllData,
    dynamicNavItems
  }
}