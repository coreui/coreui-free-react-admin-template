import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge, CNavGroup, CNavGroupItems, CNavItem, CNavLink, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'

export const AppSidebarNav = ({ items }) => {
  const components = { CNavGroup, CNavGroupItems, CNavItem, CNavLink, CNavTitle }
  const location = useLocation()

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && typeof icon === 'string' ? <CIcon name={icon} customClassName="nav-icon" /> : icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = components[component] || component
    return (
      <Component
        {...(component === 'CNavItem' && {
          component: NavLink,
          activeClassName: 'active',
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = components[component] || component
    return (
      <Component
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        idx={String(index)}
        key={index}
        {...rest}
      >
        {item.items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
