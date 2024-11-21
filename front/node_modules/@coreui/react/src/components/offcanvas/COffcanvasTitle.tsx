import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface COffcanvasTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const COffcanvasTitle: PolymorphicRefForwardingComponent<'h5', COffcanvasTitleProps> =
  forwardRef<HTMLHeadingElement, COffcanvasTitleProps>(
    ({ children, as: Component = 'h5', className, ...rest }, ref) => {
      return (
        <Component className={classNames('offcanvas-title', className)} {...rest} ref={ref}>
          {children}
        </Component>
      )
    },
  )

COffcanvasTitle.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

COffcanvasTitle.displayName = 'COffcanvasTitle'
