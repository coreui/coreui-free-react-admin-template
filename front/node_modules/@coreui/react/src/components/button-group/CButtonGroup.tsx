import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Size the component small or large.
   */
  size?: 'sm' | 'lg'
  /**
   * Create a set of buttons that appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
   */
  vertical?: boolean
}

export const CButtonGroup = forwardRef<HTMLDivElement, CButtonGroupProps>(
  ({ children, className, size, vertical, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          vertical ? 'btn-group-vertical' : 'btn-group',
          { [`btn-group-${size}`]: size },
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </div>
    )
  },
)

CButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
  vertical: PropTypes.bool,
}

CButtonGroup.displayName = 'CButtonGroup'
