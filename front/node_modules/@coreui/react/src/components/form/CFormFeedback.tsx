import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CFormFeedbackProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string

  /**
   * Method called immediately after the `value` prop changes.
   */
  invalid?: boolean
  /**
   * If your form layout allows it, you can display validation feedback in a styled tooltip.
   */
  tooltip?: boolean
  /**
   * Set component validation state to valid.
   */
  valid?: boolean
}

export const CFormFeedback: PolymorphicRefForwardingComponent<'div', CFormFeedbackProps> =
  forwardRef<HTMLDivElement | HTMLSpanElement, CFormFeedbackProps>(
    ({ children, as: Component = 'div', className, invalid, tooltip, valid, ...rest }, ref) => {
      return (
        <Component
          className={classNames(
            {
              [`invalid-${tooltip ? 'tooltip' : 'feedback'}`]: invalid,
              [`valid-${tooltip ? 'tooltip' : 'feedback'}`]: valid,
            },
            className,
          )}
          {...rest}
          ref={ref}
        >
          {children}
        </Component>
      )
    },
  )

CFormFeedback.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  invalid: PropTypes.bool,
  tooltip: PropTypes.bool,
  valid: PropTypes.bool,
}

CFormFeedback.displayName = 'CFormFeedback'
