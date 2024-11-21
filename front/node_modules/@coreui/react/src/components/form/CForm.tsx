import React, { forwardRef, FormHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CFormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Mark a form as validated. If you set it `true`, all validation styles will be applied to the forms component.
   */
  validated?: boolean
}

export const CForm = forwardRef<HTMLFormElement, CFormProps>(
  ({ children, className, validated, ...rest }, ref) => {
    return (
      <form
        className={classNames({ 'was-validated': validated }, className) || undefined}
        {...rest}
        ref={ref}
      >
        {children}
      </form>
    )
  },
)

CForm.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  validated: PropTypes.bool,
}

CForm.displayName = 'CForm'
