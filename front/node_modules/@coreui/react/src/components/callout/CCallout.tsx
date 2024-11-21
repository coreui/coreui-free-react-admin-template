import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CCalloutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
}

export const CCallout = forwardRef<HTMLDivElement, CCalloutProps>(
  ({ children, className, color, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'callout',
          {
            [`callout-${color}`]: color,
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

CCallout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
}

CCallout.displayName = 'CCallout'
