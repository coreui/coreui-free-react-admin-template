import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CModalContentProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CModalContent = forwardRef<HTMLDivElement, CModalContentProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('modal-content', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CModalContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CModalContent.displayName = 'CModalContent'
