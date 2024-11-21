import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CHeaderDividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CHeaderDivider = forwardRef<HTMLDivElement, CHeaderDividerProps>(
  ({ className, ...rest }, ref) => {
    return <div className={classNames('header-divider', className)} {...rest} ref={ref} />
  },
)

CHeaderDivider.propTypes = {
  className: PropTypes.string,
}

CHeaderDivider.displayName = 'CHeaderDivider'
