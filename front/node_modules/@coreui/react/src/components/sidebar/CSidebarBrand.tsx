import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CSidebarBrandProps extends HTMLAttributes<HTMLAnchorElement | HTMLDivElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   *
   * @since 5.0.0
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CSidebarBrand: PolymorphicRefForwardingComponent<'a', CSidebarBrandProps> = forwardRef<
  HTMLAnchorElement | HTMLDivElement,
  CSidebarBrandProps
>(({ children, as: Component = 'a', className, ...rest }, ref) => {
  return (
    <Component className={classNames('sidebar-brand', className)} ref={ref} {...rest}>
      {children}
    </Component>
  )
})

CSidebarBrand.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CSidebarBrand.displayName = 'CSidebarBrand'
