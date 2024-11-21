import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { colorPropType, shapePropType, textColorsPropType } from '../../props'
import type { Colors, Shapes, TextColors } from '../../types'

export interface CBadgeProps extends HTMLAttributes<HTMLDivElement | HTMLSpanElement> {
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
   * Position badge in one of the corners of a link or button.
   */
  position?: 'top-start' | 'top-end' | 'bottom-end' | 'bottom-start'
  /**
   * Select the shape of the component.
   *
   * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
   */
  shape?: Shapes
  /**
   * Size the component small.
   */
  size?: 'sm'
  /**
   * Sets the component's color scheme to one of CoreUI's themed colors, ensuring the text color contrast adheres to the WCAG 4.5:1 contrast ratio standard for accessibility.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   * @since 5.0.0
   */
  textBgColor?: Colors
  /**
   * Sets the text color of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | 'primary-emphasis' | 'secondary-emphasis' | 'success-emphasis' | 'danger-emphasis' | 'warning-emphasis' | 'info-emphasis' | 'light-emphasis' | 'body' | 'body-emphasis' | 'body-secondary' | 'body-tertiary' | 'black' | 'black-50' | 'white' | 'white-50' | string
   */
  textColor?: TextColors
}
export const CBadge: PolymorphicRefForwardingComponent<'span', CBadgeProps> = forwardRef<
  HTMLDivElement | HTMLSpanElement,
  CBadgeProps
>(
  (
    {
      children,
      as: Component = 'span',
      className,
      color,
      position,
      shape,
      size,
      textBgColor,
      textColor,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        className={classNames(
          'badge',
          {
            [`bg-${color}`]: color,
            'position-absolute translate-middle': position,
            'top-0': position?.includes('top'),
            'top-100': position?.includes('bottom'),
            'start-100': position?.includes('end'),
            'start-0': position?.includes('start'),
            [`badge-${size}`]: size,
            [`text-${textColor}`]: textColor,
            [`text-bg-${textBgColor}`]: textBgColor,
          },
          shape,
          className,
        )}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    )
  },
)

CBadge.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  position: PropTypes.oneOf(['top-start', 'top-end', 'bottom-end', 'bottom-start']),
  shape: shapePropType,
  size: PropTypes.oneOf(['sm']),
  textBgColor: colorPropType,
  textColor: textColorsPropType,
}

CBadge.displayName = 'CBadge'
