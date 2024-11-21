import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /**
   * Highlight a table row or cell..
   */
  active?: boolean
  /**
   * Set the vertical aligment.
   */
  align?: 'bottom' | 'middle' | 'top' | string
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

export const CTableRow = forwardRef<HTMLTableRowElement, CTableRowProps>(
  ({ children, active, align, className, color, ...rest }, ref) => {
    return (
      <tr
        className={
          classNames(
            {
              [`align-${align}`]: align,
              'table-active': active,
              [`table-${color}`]: color,
            },
            className,
          ) || undefined
        }
        {...rest}
        ref={ref}
      >
        {children}
      </tr>
    )
  },
)

CTableRow.propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOf(['bottom', 'middle', 'top']),
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
}

CTableRow.displayName = 'CTableRow'
