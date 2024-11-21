import React, { ElementType, AnchorHTMLAttributes, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink } from '../link/CLink'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CListGroupItemProps
  extends AnchorHTMLAttributes<HTMLLIElement | HTMLAnchorElement | HTMLButtonElement> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean
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
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
}

export const CListGroupItem: PolymorphicRefForwardingComponent<'li', CListGroupItemProps> =
  forwardRef<HTMLLIElement | HTMLAnchorElement | HTMLButtonElement, CListGroupItemProps>(
    ({ children, active, as = 'li', className, disabled, color, ...rest }, ref) => {
      const Component = as === 'a' || as === 'button' ? CLink : as

      rest = {
        ...((as === 'a' || as === 'button') && {
          active,
          disabled,
          as,
          ref: ref,
        }),
        ...(active && { 'aria-current': true }),
        ...(disabled && { 'aria-disabled': true }),
        ...rest,
      }

      return (
        <Component
          className={classNames(
            'list-group-item',
            {
              [`list-group-item-${color}`]: color,
              'list-group-item-action': as === 'a' || as === 'button',
              active,
              disabled,
            },
            className,
          )}
          {...rest}
        >
          {children}
        </Component>
      )
    },
  )

CListGroupItem.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  disabled: PropTypes.bool,
}

CListGroupItem.displayName = 'CListGroupItem'
