import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CFormTextProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CFormText: PolymorphicRefForwardingComponent<'div', CFormTextProps> = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CFormTextProps
>(({ children, as: Component = 'div', className, ...rest }, ref) => {
  return (
    <Component className={classNames('form-text', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CFormText.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CFormText.displayName = 'CFormText'
