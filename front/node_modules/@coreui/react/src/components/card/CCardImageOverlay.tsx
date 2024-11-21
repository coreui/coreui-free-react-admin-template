import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CCardImageOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CCardImageOverlay = forwardRef<HTMLDivElement, CCardImageOverlayProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('card-img-overlay', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CCardImageOverlay.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CCardImageOverlay.displayName = 'CCardImageOverlay'
