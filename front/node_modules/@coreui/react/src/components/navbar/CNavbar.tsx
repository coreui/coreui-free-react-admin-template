import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CNavbarProps extends HTMLAttributes<HTMLDivElement> {
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
   * Sets if the color of text should be colored for a light or dark background.
   */
  colorScheme?: 'dark' | 'light'
  /**
   * Defines optional container wrapping children elements.
   */
  container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'
  /**
   * Defines the responsive breakpoint to determine when content collapses.
   */
  expand?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Place component in non-static positions.
   */
  placement?: 'fixed-top' | 'fixed-bottom' | 'sticky-top'
}

export const CNavbar: PolymorphicRefForwardingComponent<'nav', CNavbarProps> = forwardRef<
  HTMLDivElement,
  CNavbarProps
>(
  (
    {
      children,
      as: Component = 'nav',
      className,
      color,
      colorScheme,
      container,
      expand,
      placement,
      ...rest
    },
    ref,
  ) => {
    return (
      <Component
        className={classNames(
          'navbar',
          {
            [`bg-${color}`]: color,
            [typeof expand === 'boolean' ? 'navbar-expand' : `navbar-expand-${expand}`]: expand,
          },
          placement,
          className,
        )}
        {...(colorScheme && { 'data-coreui-theme': colorScheme })}
        {...rest}
        ref={ref}
      >
        {container ? (
          <div className={typeof container === 'string' ? `container-${container}` : 'container'}>
            {children}
          </div>
        ) : (
          <>{children}</>
        )}
      </Component>
    )
  },
)

CNavbar.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  colorScheme: PropTypes.oneOf(['dark', 'light']),
  container: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'>([
      'sm',
      'md',
      'lg',
      'xl',
      'xxl',
      'fluid',
    ]),
  ]),
  expand: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  placement: PropTypes.oneOf(['fixed-top', 'fixed-bottom', 'sticky-top']),
}

CNavbar.displayName = 'CNavbar'
