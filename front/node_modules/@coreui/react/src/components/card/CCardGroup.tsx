import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CCardGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CCardGroup = forwardRef<HTMLDivElement, CCardGroupProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('card-group', className)} {...rest} ref={ref}>
        {children}
      </div>
    )
  },
)

CCardGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CCardGroup.displayName = 'CCardGroup'
