import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavbarNavProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CNavbarNav: PolymorphicRefForwardingComponent<'ul', CNavbarNavProps> = forwardRef<
  HTMLDivElement | HTMLUListElement,
  CNavbarNavProps
>(({ children, as: Component = 'ul', className, ...rest }, ref) => {
  return (
    <Component
      className={classNames('navbar-nav', className)}
      role="navigation"
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  )
})

CNavbarNav.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavbarNav.displayName = 'CNavbarNav'
