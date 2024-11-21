import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CCardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CCardHeader: PolymorphicRefForwardingComponent<'div', CCardHeaderProps> = forwardRef<
  HTMLDivElement,
  CCardHeaderProps
>(({ children, as: Component = 'div', className, ...rest }, ref) => {
  return (
    <Component className={classNames('card-header', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CCardHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CCardHeader.displayName = 'CCardHeader'
