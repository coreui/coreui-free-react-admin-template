import React, { forwardRef, ThHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CTableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
}

export const CTableHeaderCell = forwardRef<HTMLTableCellElement, CTableHeaderCellProps>(
  ({ children, className, color, ...rest }, ref) => {
    return (
      <th
        className={
          classNames(
            {
              [`table-${color}`]: color,
            },
            className,
          ) || undefined
        }
        {...rest}
        ref={ref}
      >
        {children}
      </th>
    )
  },
)

CTableHeaderCell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
}

CTableHeaderCell.displayName = 'CTableHeaderCell'
