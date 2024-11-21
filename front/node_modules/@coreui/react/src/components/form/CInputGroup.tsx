import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CInputGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Size the component small or large.
   */
  size?: 'sm' | 'lg'
}

export const CInputGroup = forwardRef<HTMLDivElement, CInputGroupProps>(
  ({ children, className, size, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'input-group',
          {
            [`input-group-${size}`]: size,
          },
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

CInputGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'lg']),
}

CInputGroup.displayName = 'CInputGroup'
