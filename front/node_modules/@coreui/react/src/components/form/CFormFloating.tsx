import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CFormFloatingProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CFormFloating = forwardRef<HTMLDivElement, CFormFloatingProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('form-floating', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CFormFloating.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CFormFloating.displayName = 'CFormFloating'
