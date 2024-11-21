import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CNavbarTogglerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CNavbarToggler = forwardRef<HTMLButtonElement, CNavbarTogglerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button type="button" className={classNames('navbar-toggler', className)} {...rest} ref={ref}>
        {children ?? <span className="navbar-toggler-icon"></span>}
      </button>
    )
  },
)

CNavbarToggler.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavbarToggler.displayName = 'CNavbarToggler'
