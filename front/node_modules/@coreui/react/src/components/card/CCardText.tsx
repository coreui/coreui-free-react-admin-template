import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CCardTextProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CCardText: PolymorphicRefForwardingComponent<'p', CCardTextProps> = forwardRef<
  HTMLParagraphElement,
  CCardTextProps
>(({ children, as: Component = 'p', className, ...rest }, ref) => {
  return (
    <Component className={classNames('card-text', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CCardText.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CCardText.displayName = 'CCardText'
