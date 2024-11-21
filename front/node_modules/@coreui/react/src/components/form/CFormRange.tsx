import React, { ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CFormLabel } from './CFormLabel'
export interface CFormRangeProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * Add a caption for a component.
   *
   * @since 4.2.0
   */
  label?: ReactNode | string
  /**
   * Specifies the maximum value for the component.
   */
  max?: number
  /**
   * Specifies the minimum value for the component.
   */
  min?: number
  /**
   * Method called immediately after the `value` prop changes.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /**
   * Toggle the readonly state for the component.
   */
  readOnly?: boolean
  /**
   * Specifies the interval between legal numbers in the component.
   */
  step?: number
  /**
   * The `value` attribute of component.
   *
   * @controllable onChange
   * */
  value?: string | string[] | number
}

export const CFormRange = forwardRef<HTMLInputElement, CFormRangeProps>(
  ({ className, label, ...rest }, ref) => {
    return (
      <>
        {label && <CFormLabel htmlFor={rest.id}>{label}</CFormLabel>}
        <input type="range" className={classNames('form-range', className)} {...rest} ref={ref} />
      </>
    )
  },
)

CFormRange.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

CFormRange.displayName = 'CFormRange'
