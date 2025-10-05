import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilFolder, cilDescription } from '@coreui/icons'

const DEPARTMENTS_STORAGE_KEY = 'coreui_departments'
const ASSETS_STORAGE_KEY = 'coreui_assets'

const NavigationContext = createContext(null)

export const NavigationProvider = ({ children }) => {
  // Initialize state from localStorage
  const [departments, setDepartments] = useState(() => {
    try {
      const saved = localStorage.getItem(DEPARTMENTS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading departments:', error)
      return []
    }
  })

  const [assets, setAssets] = useState(() => {
    try {
      const saved = localStorage.getItem(ASSETS_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading assets:', error)
      return []
    }
  })

  const abortControllersRef = useRef({})

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(DEPARTMENTS_STORAGE_KEY, JSON.stringify(departments))
    } catch (error) {
      console.error('Error saving departments:', error)
    }
  }, [departments])

  useEffect(() => {
    try {
      localStorage.setItem(ASSETS_STORAGE_KEY, JSON.stringify(assets))
    } catch (error) {
      console.error('Error saving assets:', error)
    }
  }, [assets])

  // Debug logs
  useEffect(() => {
    console.log('🔵 Departments updated:', departments)
  }, [departments])

  useEffect(() => {
    console.log('🟢 Assets updated:', assets.map(a => ({ id: a.id, name: a.name, dept: a.department })))
  }, [assets])

  // Cleanup
  useEffect(() => {
    return () => {
      Object.values(abortControllersRef.current).forEach(controller => controller.abort())
      abortControllersRef.current = {}
    }
  }, [])

  const addDepartment = useCallback((departmentName) => {
    if (!departmentName || typeof departmentName !== 'string') return
    
    setDepartments(prev => {
      if (prev.includes(departmentName)) return prev
      return [...prev, departmentName]
    })
  }, [])

  const addAsset = useCallback((apiResponse) => {
    if (!apiResponse || !apiResponse.device) return
    
    const timestamp = Date.now()
    const random = Math.random().toString(36).slice(2, 11)
    const assetId = `asset-${apiResponse.device?.name || 'unknown'}-${timestamp}-${random}`
    
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
      scan_params: {
        device_name: apiResponse.device?.name,
        h_cpe: apiResponse.device?.h_cpe,
        vendor: apiResponse.device?.vendor,
        model: apiResponse.device?.model,
        os_family: apiResponse.device?.os_family,
        version: apiResponse.device?.version,
        department: apiResponse.device?.department
      },
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
    
    setAssets(prev => [...prev, asset])
  }, [])

  const updateAsset = useCallback((assetId, apiResponse) => {
    if (!apiResponse) return
    
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
      delete abortControllersRef.current[assetId]
    }
    
    setAssets(prev => {
      return prev.map(asset => {
        if (asset.id !== assetId) return asset
        
        return {
          id: asset.id,
          name: asset.name,
          vendor: asset.vendor,
          model: asset.model,
          type: asset.type,
          department: asset.department,
          deviceType: asset.deviceType,
          version: apiResponse.device?.version || asset.version,
          description: apiResponse.device?.description || asset.description,
          risk_level: apiResponse.device?.risk_level || 0,
          os_family: apiResponse.device?.os_family || asset.os_family,
          h_cpe: apiResponse.device?.h_cpe || asset.h_cpe,
          vulnerabilities: {
            cves: apiResponse.cves || [],
            cwes: apiResponse.cwes || [],
            capecs: apiResponse.capecs || [],
            attacks: apiResponse.attacks || []
          },
          statistics: apiResponse.statistics || {},
          scan_time: apiResponse.scan_time || 0,
          last_updated: new Date().toISOString(),
          scan_params: {
            device_name: apiResponse.device?.name || asset.scan_params?.device_name || asset.name,
            h_cpe: apiResponse.device?.h_cpe || asset.scan_params?.h_cpe || asset.h_cpe,
            vendor: apiResponse.device?.vendor || asset.scan_params?.vendor || asset.vendor,
            model: apiResponse.device?.model || asset.scan_params?.model || asset.model,
            os_family: apiResponse.device?.os_family || asset.scan_params?.os_family || asset.os_family,
            version: apiResponse.device?.version || asset.scan_params?.version || asset.version,
            department: apiResponse.device?.department || asset.department
          }
        }
      })
    })
  }, [])

  const removeDepartment = useCallback((departmentName) => {
    setDepartments(prev => prev.filter(dept => dept !== departmentName))
    
    setAssets(prev => {
      const assetsToRemove = prev.filter(a => a.department === departmentName)
      assetsToRemove.forEach(asset => {
        if (abortControllersRef.current[asset.id]) {
          abortControllersRef.current[asset.id].abort()
          delete abortControllersRef.current[asset.id]
        }
      })
      return prev.filter(asset => asset.department !== departmentName)
    })
  }, [])

  const removeAsset = useCallback((assetId) => {
    if (abortControllersRef.current[assetId]) {
      abortControllersRef.current[assetId].abort()
      delete abortControllersRef.current[assetId]
    }
    
    setAssets(prev => prev.filter(asset => asset.id !== assetId))
  }, [])

  const clearAllData = useCallback(() => {
    Object.values(abortControllersRef.current).forEach(controller => controller.abort())
    abortControllersRef.current = {}
    setDepartments([])
    setAssets([])
    localStorage.removeItem(DEPARTMENTS_STORAGE_KEY)
    localStorage.removeItem(ASSETS_STORAGE_KEY)
  }, [])

  const dynamicNavItems = useMemo(() => {
    const navItems = []

    departments.forEach((department) => {
      const departmentAssets = assets.filter(asset => asset.department === department)
      
      if (departmentAssets.length > 0) {
        navItems.push({
          component: CNavGroup,
          name: department,
          key: `dept-${department}`,
          icon: <CIcon icon={cilFolder} customClassName="nav-icon"/>,
          items: departmentAssets.map(asset => ({
            key: `asset-${asset.id}`,
            component: CNavItem,
            name: asset.name,
            to: `/asset/${asset.id}`,
            icon: <CIcon icon={cilDescription} customClassName="nav-icon"/>,
          }))
        })
      } else {
        navItems.push({
          component: CNavGroup,
          name: department,
          key: `dept-${department}`,
          icon: <CIcon icon={cilFolder} customClassName="nav-icon"/>,
          items: [{
            key: `empty-${department}`,
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

  const value = {
    departments,
    assets,
    addDepartment,
    addAsset,
    updateAsset,
    removeDepartment,
    removeAsset,
    clearAllData,
    dynamicNavItems
  }

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigation = () => {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}