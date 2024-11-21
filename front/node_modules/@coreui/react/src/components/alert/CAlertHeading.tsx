import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CAlertHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CAlertHeading: PolymorphicRefForwardingComponent<'h4', CAlertHeadingProps> =
  forwardRef<HTMLHeadingElement, CAlertHeadingProps>(
    ({ children, as: Component = 'h4', className, ...rest }, ref) => {
      return (
        <Component className={classNames('alert-heading', className)} {...rest} ref={ref}>
          {children}
        </Component>
      )
    },
  )

CAlertHeading.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CAlertHeading.displayName = 'CAlertHeading'
