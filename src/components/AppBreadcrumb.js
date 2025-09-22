import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilFolder, cilDescription, cilSettings } from '@coreui/icons'
import routes from '../routes'
import { useNavigation } from '../hooks/useNavigation'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  const { assetId } = useParams()
  const { assets, departments } = useNavigation()

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    
    // Handle root/overview case - don't add extra breadcrumbs
    if (location === '/' || location === '/overview') {
      return breadcrumbs // Return empty array, the "Overview" will be shown as base
    }

    // Handle special dynamic routes
    if (location.startsWith('/asset/')) {
      const asset = assets.find(a => a.id === assetId)
      if (asset) {
        // Add department breadcrumb
        breadcrumbs.push({
          pathname: '#',
          name: asset.department,
          active: false,
          icon: cilFolder
        })
        // Add asset breadcrumb
        breadcrumbs.push({
          pathname: location,
          name: asset.name,
          active: true,
          icon: cilDescription
        })
      }
      return breadcrumbs
    }

    // Handle standard routes
    const pathSegments = location.split('/').filter(segment => segment !== '')
    
    // Skip if this is just the overview page
    if (pathSegments.length === 1 && pathSegments[0] === 'overview') {
      return breadcrumbs
    }
    
    pathSegments.reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      let routeName = getRouteName(currentPathname, routes)
      let icon = null

      // Set appropriate icons for known routes
      switch (currentPathname) {
        case '/datamanagement':
          icon = cilSettings
          routeName = 'Data Management'
          break
        default:
          if (departments.includes(curr)) {
            icon = cilFolder
          } else {
            icon = cilDescription
          }
      }

      // If route name not found, try to match department or asset names
      if (!routeName && departments.includes(curr)) {
        routeName = curr
      }

      if (routeName) {
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
          icon: icon
        })
      }
      
      return currentPathname
    }, '')
    
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="my-0">
      {/* Home/Overview breadcrumb - only show if not already on overview */}
      {currentLocation !== '/' && currentLocation !== '/overview' && (
        <CBreadcrumbItem href="/#/overview" className="d-flex align-items-center">
          <CIcon icon={cilHome} size="sm" className="me-1" />
          Overview
        </CBreadcrumbItem>
      )}
      
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active 
              ? { active: true } 
              : { href: `/#${breadcrumb.pathname}` }
            )}
            key={index}
            className="d-flex align-items-center"
          >
            {breadcrumb.icon && (
              <CIcon icon={breadcrumb.icon} size="sm" className="me-1" />
            )}
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)