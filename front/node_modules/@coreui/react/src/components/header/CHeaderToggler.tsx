import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CHeaderTogglerProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CHeaderToggler = forwardRef<HTMLButtonElement, CHeaderTogglerProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <button type="button" className={classNames('header-toggler', className)} {...rest} ref={ref}>
        {children ?? <span className="header-toggler-icon"></span>}
      </button>
    )
  },
)

CHeaderToggler.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CHeaderToggler.displayName = 'CHeaderToggler'
