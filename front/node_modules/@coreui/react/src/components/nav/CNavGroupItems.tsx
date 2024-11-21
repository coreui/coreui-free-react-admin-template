import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavGroupItemsProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
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

export const CNavGroupItems: PolymorphicRefForwardingComponent<'ul', CNavGroupItemsProps> =
  forwardRef<HTMLDivElement | HTMLUListElement, CNavGroupItemsProps>(
    ({ children, as: Component = 'ul', className, ...rest }, ref) => {
      return (
        <Component className={classNames('nav-group-items', className)} {...rest} ref={ref}>
          {children}
        </Component>
      )
    },
  )

CNavGroupItems.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavGroupItems.displayName = 'CNavGroupItems'
