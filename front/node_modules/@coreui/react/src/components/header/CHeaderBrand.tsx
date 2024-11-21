import React, { ElementType, forwardRef, AnchorHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CHeaderBrandProps
  extends AnchorHTMLAttributes<HTMLAnchorElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CHeaderBrand: PolymorphicRefForwardingComponent<'a', CHeaderBrandProps> = forwardRef<
  HTMLAnchorElement | HTMLSpanElement,
  CHeaderBrandProps
>(({ children, as: Component = 'a', className, ...rest }, ref) => {
  return (
    <Component className={classNames('header-brand', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CHeaderBrand.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CHeaderBrand.displayName = 'CHeaderBrand'
