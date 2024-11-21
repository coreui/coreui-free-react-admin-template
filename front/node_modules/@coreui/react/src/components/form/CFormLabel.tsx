import React, { forwardRef, LabelHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * A string of all className you want to be applied to the component, and override standard className value.
   */
  customClassName?: string
}

export const CFormLabel = forwardRef<HTMLLabelElement, CFormLabelProps>(
  ({ children, className, customClassName, ...rest }, ref) => {
    return (
      <label className={customClassName ?? classNames('form-label', className)} {...rest} ref={ref}>
        {children}
      </label>
    )
  },
)

CFormLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  customClassName: PropTypes.string,
}

CFormLabel.displayName = 'CFormLabel'
