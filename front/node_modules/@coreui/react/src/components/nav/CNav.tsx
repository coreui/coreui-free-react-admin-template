import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavProps
  extends HTMLAttributes<HTMLDivElement | HTMLUListElement | HTMLOListElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Specify a layout type for component.
   */
  layout?: 'fill' | 'justified'
  /**
   * Set the nav variant to tabs or pills.
   */
  variant?: 'pills' | 'tabs' | 'underline' | 'underline-border'
}

export const CNav: PolymorphicRefForwardingComponent<'ul', CNavProps> = forwardRef<
  HTMLDivElement | HTMLUListElement | HTMLOListElement,
  CNavProps
>(({ children, as: Component = 'ul', className, layout, variant, ...rest }, ref) => {
  return (
    <Component
      className={classNames(
        'nav',
        {
          [`nav-${layout}`]: layout,
          [`nav-${variant}`]: variant,
        },
        className,
      )}
      role="navigation"
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  )
})

CNav.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['fill', 'justified']),
  variant: PropTypes.oneOf(['pills', 'tabs', 'underline', 'underline-border']),
}

CNav.displayName = 'CNav'
