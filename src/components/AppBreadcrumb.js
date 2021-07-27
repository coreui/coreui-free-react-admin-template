import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes, index) => {
    const pathFraction = currentLocation.split('/').length
    if (isNaN(currentLocation.split('/')[pathFraction - 1])) {
      const currentRoute = routes.find((route) => route.path === pathname)
      return currentRoute.name
    } else {
      return currentLocation.split('/')[pathFraction + index - 3]
    }
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      console.log('currentPathname:', currentPathname)
      console.log('prev:', prev)
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes, index),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">Home</CBreadcrumbItem>
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {/* {src/components/AppBreadcrumb/CBreadcrumbItem*/}
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
