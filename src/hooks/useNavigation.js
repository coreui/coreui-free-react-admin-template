import { useState, useEffect, useMemo } from 'react'
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

  const [assets, setAssets] = useState(() => {
    try {
      const savedAssets = localStorage.getItem(ASSETS_STORAGE_KEY)
      return savedAssets ? JSON.parse(savedAssets) : []
    } catch (error) {
      console.error('Error loading assets from localStorage:', error)
      return []
    }
  })

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

  const addDepartment = (departmentName) => {
    if (!departments.includes(departmentName)) {
      setDepartments(prev => [...prev, departmentName])
    }
  }

  const addAsset = (apiResponse) => {
    // Transform API response to match your current asset structure
    const asset = {
      id: apiResponse.device?.id?.toString() || `asset-${Date.now()}`,
      name: apiResponse.device?.name || 'Unknown Device',
      vendor: apiResponse.device?.vendor || 'Unknown Vendor',
      model: apiResponse.device?.model || 'Unknown Model',
      version: apiResponse.device?.version || '',
      type: apiResponse.device?.type || 'Unknown',
      department: apiResponse.device?.department || '',
      description: apiResponse.device?.description || '',
      risk_level: apiResponse.device?.risk_level || 0,
      os_family: apiResponse.device?.os_family || '',

      // Store scan parameters for background refreshes
      scan_params: apiResponse.scan_params || {},
      
      // Store full API response for detailed view
      vulnerabilities: {
        cves: apiResponse.cves || [],
        cwes: apiResponse.cwes || [],
        capecs: apiResponse.capecs || [],
        attacks: apiResponse.attacks || []
      },
      statistics: apiResponse.statistics || {},
      scan_time: apiResponse.scan_time || 0,
      last_updated: new Date().toISOString(),
      
      // Keep backward compatibility
      deviceType: apiResponse.device?.type || 'Unknown'
    }
    
    setAssets(prev => [...prev, asset])
  }

  // Add new function to update existing asset
  const updateAsset = (assetId, apiResponse) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          // Update vulnerability data
          vulnerabilities: {
            cves: apiResponse.cves || [],
            cwes: apiResponse.cwes || [],
            capecs: apiResponse.capecs || [],
            attacks: apiResponse.attacks || []
          },
          statistics: apiResponse.statistics || {},
          scan_time: apiResponse.scan_time || 0,
          last_updated: new Date().toISOString(),
          // Update device info if provided
          ...(apiResponse.device && {
            risk_level: apiResponse.device.risk_level,
            description: apiResponse.device.description
          })
        }
      }
      return asset
    }))
  }

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
  const clearAllData = () => {
    setDepartments([])
    setAssets([])
    localStorage.removeItem(DEPARTMENTS_STORAGE_KEY)
    localStorage.removeItem(ASSETS_STORAGE_KEY)
  }

  // Function to remove a specific department and its assets
  const removeDepartment = (departmentName) => {
    setDepartments(prev => prev.filter(dept => dept !== departmentName))
    setAssets(prev => prev.filter(asset => asset.department !== departmentName))
  }

  // Function to remove a specific asset
  const removeAsset = (assetId) => {
    setAssets(prev => prev.filter(asset => asset.id !== assetId))
  }

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
    refreshAllAssets,
    removeDepartment,
    removeAsset,
    clearAllData,
    dynamicNavItems
  }
}