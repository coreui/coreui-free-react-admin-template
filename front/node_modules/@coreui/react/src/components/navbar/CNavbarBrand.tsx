import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavbarBrandProps extends HTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   *
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * The href attribute specifies the URL of the page the link goes to.
   */
  href?: string
}

export const CNavbarBrand: PolymorphicRefForwardingComponent<'a', CNavbarBrandProps> = forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  CNavbarBrandProps
>(({ children, as, className, ...rest }, ref) => {
  const Component = as ?? (rest.href ? 'a' : 'span')

  return (
    <Component className={classNames('navbar-brand', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CNavbarBrand.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavbarBrand.displayName = 'CNavbarBrand'
