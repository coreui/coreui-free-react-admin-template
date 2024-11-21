import React, { ElementType, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CNavLink, CNavLinkProps } from './CNavLink'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavItemProps extends Omit<CNavLinkProps, 'component'> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   *
   * @since 5.0.0
   */
  as?: ElementType
}

export const CNavItem: PolymorphicRefForwardingComponent<'li', CNavItemProps> = forwardRef<
  HTMLLIElement,
  CNavItemProps
>(({ children, as: Component = 'li', className, ...rest }, ref) => {
  return (
    <Component className={classNames('nav-item', className)} ref={ref}>
      {rest.href || rest.to ? (
        <CNavLink className={className} {...rest}>
          {children}
        </CNavLink>
      ) : (
        children
      )}
    </Component>
  )
})

CNavItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavItem.displayName = 'CNavItem'
