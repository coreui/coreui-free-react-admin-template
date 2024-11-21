import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CButtonToolbarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CButtonToolbar = forwardRef<HTMLDivElement, CButtonToolbarProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('btn-toolbar', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CButtonToolbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CButtonToolbar.displayName = 'CButtonToolbar'
