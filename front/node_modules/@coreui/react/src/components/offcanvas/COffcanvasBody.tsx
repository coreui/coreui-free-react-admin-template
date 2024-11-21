import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface COffcanvasBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const COffcanvasBody = forwardRef<HTMLDivElement, COffcanvasBodyProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('offcanvas-body', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

COffcanvasBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

COffcanvasBody.displayName = 'COffcanvasBody'
