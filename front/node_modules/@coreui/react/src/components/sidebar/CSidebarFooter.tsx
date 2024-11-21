import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CSidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CSidebarFooter = forwardRef<HTMLDivElement, CSidebarFooterProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('sidebar-footer', className)} ref={ref} {...rest}>
        {children}
      </div>
    )
  },
)

CSidebarFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CSidebarFooter.displayName = 'CSidebarFooter'
