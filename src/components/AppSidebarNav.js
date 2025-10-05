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
    const { component, name, badge, icon, key: itemKey, ...rest } = item
    const Component = component
    
    // Handle our custom DynamicNavButtons component
    if (Component === DynamicNavButtons) {
      return <Component key={itemKey || `dynamic-nav-${index}`} {...item.props} />
    }
    
    // CRITICAL: Extract key, don't spread it
    const stableKey = itemKey || rest.to || `nav-item-${name}-${index}`
    
    return (
      <Component as="div" key={stableKey}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink, to: rest.to })}
            {...(rest.href && { href: rest.href })}
            {...rest}
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
    const { component, name, icon, items: groupItems, key: itemKey, to, ...rest } = item
    const Component = component
    
    // CRITICAL: Extract key, don't spread it
    const stableKey = itemKey || `nav-group-${name}`
    
    return (
      <Component 
        key={stableKey}
        compact 
        as="div" 
        toggler={navLink(name, icon)} 
        {...rest}
      >
        {groupItems?.map((childItem, idx) =>
          childItem.items ? navGroup(childItem, idx) : navItem(childItem, idx, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}