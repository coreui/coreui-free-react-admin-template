import React, { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CFormLabel } from './CFormLabel'

export interface CFormSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * The id global attribute defines an identifier (ID) that must be unique in the whole document.
   */
  id?: string
  /**
   * Set component validation state to invalid.
   */
  invalid?: boolean
  /**
   * The element represents a caption for a component.
   */
  label?: string | ReactNode
  /**
   * Put switch on the opposite side.
   *
   * @sinve 4.7.0
   */
  reverse?: boolean
  /**
   * Size the component large or extra large. Works only with `switch`.
   */
  size?: 'lg' | 'xl'
  /**
   * Specifies the type of component.
   */
  type?: 'checkbox' | 'radio'
  /**
   * Set component validation state to valid.
   */
  valid?: boolean
}

export const CFormSwitch = forwardRef<HTMLInputElement, CFormSwitchProps>(
  ({ className, id, invalid, label, reverse, size, type = 'checkbox', valid, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'form-check form-switch',
          {
            'form-check-reverse': reverse,
            [`form-switch-${size}`]: size,
            'is-invalid': invalid,
            'is-valid': valid,
          },
          className,
        )}
      >
        <input
          type={type}
          className={classNames('form-check-input', {
            'is-invalid': invalid,
            'is-valid': valid,
          })}
          id={id}
          {...rest}
          ref={ref}
        />
        {label && (
          <CFormLabel customClassName="form-check-label" {...(id && { htmlFor: id })}>
            {label}
          </CFormLabel>
        )}
      </div>
    )
  },
)

CFormSwitch.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  invalid: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  reverse: PropTypes.bool,
  size: PropTypes.oneOf(['lg', 'xl']),
  type: PropTypes.oneOf(['checkbox', 'radio']),
  valid: PropTypes.bool,
}

CFormSwitch.displayName = 'CFormSwitch'
