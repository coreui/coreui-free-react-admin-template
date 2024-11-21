import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CToastClose } from './CToastClose'

export interface CToastHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Automatically add a close button to the header.
   */
  closeButton?: boolean
}

export const CToastHeader = forwardRef<HTMLDivElement, CToastHeaderProps>(
  ({ children, className, closeButton, ...rest }, ref) => {
    return (
      <div className={classNames('toast-header', className)} {...rest} ref={ref}>
        {children}
        {closeButton && <CToastClose />}
      </div>
    )
  },
)

CToastHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeButton: PropTypes.bool,
}

CToastHeader.displayName = 'CToastHeader'
