import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CCardProps extends HTMLAttributes<HTMLDivElement> {
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
  /**
   * Sets the text color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'primary-emphasis' | 'secondary-emphasis' | 'success-emphasis' | 'danger-emphasis' | 'warning-emphasis' | 'info-emphasis' | 'light-emphasis' | 'body' | 'body-emphasis' | 'body-secondary' | 'body-tertiary' | 'black' | 'black-50' | 'white' | 'white-50' | string
   */
  textColor?: string
  /**
   * Sets the component's color scheme to one of CoreUI's themed colors, ensuring the text color contrast adheres to the WCAG 4.5:1 contrast ratio standard for accessibility.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   * @since 5.0.0
   */
  textBgColor?: Colors
}

export const CCard = forwardRef<HTMLDivElement, CCardProps>(
  ({ children, className, color, textBgColor, textColor, ...rest }, ref) => {
    return (
      <div
        className={classNames(
          'card',
          {
            [`bg-${color}`]: color,
            [`text-${textColor}`]: textColor,
            [`text-bg-${textBgColor}`]: textBgColor,
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

CCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  textBgColor: colorPropType,
  textColor: PropTypes.string,
}

CCard.displayName = 'CCard'
