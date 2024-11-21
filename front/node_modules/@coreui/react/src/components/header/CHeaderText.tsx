import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CHeaderTextProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CHeaderText = forwardRef<HTMLSpanElement, CHeaderTextProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <span className={classNames('header-text', className)} {...rest} ref={ref}>
        {children}
      </span>
    )
  },
)

CHeaderText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CHeaderText.displayName = 'CHeaderText'
