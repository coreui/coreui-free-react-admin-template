import React, { ElementType, forwardRef, LabelHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CInputGroupTextProps
  extends LabelHTMLAttributes<HTMLLabelElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CInputGroupText: PolymorphicRefForwardingComponent<'span', CInputGroupTextProps> =
  forwardRef<HTMLLabelElement | HTMLSpanElement, CInputGroupTextProps>(
    ({ children, as: Component = 'span', className, ...rest }, ref) => {
      return (
        <Component className={classNames('input-group-text', className)} {...rest} ref={ref}>
          {children}
        </Component>
      )
    },
  )

CInputGroupText.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CInputGroupText.displayName = 'CInputGroupText'
