import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { CBadge, CNavLink, CSidebarNav } from '@coreui/react'
import DynamicNavButtons from './DynamicNavButtons'

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    
    // Handle our custom DynamicNavButtons component
    if (Component === DynamicNavButtons) {
      return <Component key={item.key || `dynamic-nav-${index}`} {...item.props} />
    }
    
    // Use stable key: prioritize item.key, then rest.to, then fall back to index
    const stableKey = item.key || rest.to || `nav-item-${index}`
    
    return (
      <Component as="div" key={stableKey}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink, to: rest.to })}
            {...(rest.href && { href: rest.href })}
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    
    // Use stable key: prioritize item.key, then name, then fall back to index
    const stableKey = item.key || `nav-group-${name}-${index}`
    
    return (
      <Component compact as="div" key={stableKey} toggler={navLink(name, icon)} {...rest}>
        {item.items?.map((childItem, idx) =>
          childItem.items ? navGroup(childItem, idx) : navItem(childItem, idx, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) => {
          // Use stable key for top-level items too
          const stableKey = item.key || item.name || `top-level-${index}`
          return item.items ? navGroup(item, index) : navItem(item, index)
        })}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
