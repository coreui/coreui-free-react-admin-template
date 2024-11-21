import React, { forwardRef, TdHTMLAttributes, ThHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CTableDataCellProps
  extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>,
    Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
  /**
   * Highlight a table row or cell.
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
  /**
   * @ignore
   */
  colSpan?: number
}

export const CTableDataCell = forwardRef<HTMLTableCellElement, CTableDataCellProps>(
  ({ children, active, align, className, color, ...rest }, ref) => {
    const Component = rest.scope ? 'th' : 'td'

    return (
      <Component
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
      </Component>
    )
  },
)

CTableDataCell.propTypes = {
  active: PropTypes.bool,
  align: PropTypes.oneOf(['bottom', 'middle', 'top']),
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
}

CTableDataCell.displayName = 'CTableDataCell'
