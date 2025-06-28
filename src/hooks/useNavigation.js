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

  const addAsset = (asset) => {
    setAssets(prev => [...prev, asset])
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
    removeDepartment,
    removeAsset,
    clearAllData,
    dynamicNavItems
  }
}