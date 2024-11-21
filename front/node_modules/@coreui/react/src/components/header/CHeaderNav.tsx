import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CHeaderNavProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CHeaderNav: PolymorphicRefForwardingComponent<'ul', CHeaderNavProps> = forwardRef<
  HTMLDivElement | HTMLUListElement,
  CHeaderNavProps
>(({ children, as: Component = 'ul', className, ...rest }, ref) => {
  return (
    <Component
      className={classNames('header-nav', className)}
      role="navigation"
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  )
})

CHeaderNav.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CHeaderNav.displayName = 'CHeaderNav'
