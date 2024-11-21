import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
}

export const CModalTitle: PolymorphicRefForwardingComponent<'h5', CModalTitleProps> = forwardRef<
  HTMLHeadElement,
  CModalTitleProps
>(({ children, as: Component = 'h5', className, ...rest }, ref) => {
  return (
    <Component className={classNames('modal-title', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CModalTitle.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CModalTitle.displayName = 'CModalTitle'
