import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CNavbarTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CNavbarText = forwardRef<HTMLSpanElement, CNavbarTextProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <span className={classNames('navbar-text', className)} {...rest} ref={ref}>
        {children}
      </span>
    )
  },
)

CNavbarText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavbarText.displayName = 'CNavbarText'
