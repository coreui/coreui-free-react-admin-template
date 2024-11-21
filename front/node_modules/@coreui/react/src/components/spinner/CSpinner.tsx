import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CSpinnerProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
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
   * Size the component small.
   */
  size?: 'sm'
  /**
   * Set the button variant to an outlined button or a ghost button.
   */
  variant?: 'border' | 'grow'
  /**
   * Set visually hidden label for accessibility purposes.
   */
  visuallyHiddenLabel?: string
}

export const CSpinner: PolymorphicRefForwardingComponent<'div', CSpinnerProps> = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CSpinnerProps
>(
  (
    {
      as: Component = 'div',
      className,
      color,
      size,
      variant = 'border',
      visuallyHiddenLabel = 'Loading...',
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        className={classNames(
          `spinner-${variant}`,
          {
            [`spinner-${variant}-${size}`]: size,
            [`text-${color}`]: color,
          },
          className,
        )}
        role="status"
        {...rest}
        ref={ref}
      >
        <span className="visually-hidden">{visuallyHiddenLabel}</span>
      </Component>
    )
  },
)

CSpinner.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  color: colorPropType,
  size: PropTypes.oneOf(['sm']),
  variant: PropTypes.oneOf(['border', 'grow']),
  visuallyHiddenLabel: PropTypes.string,
}

CSpinner.displayName = 'CSpinner'
