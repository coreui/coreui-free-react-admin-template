import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CPlaceholderProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Set animation type to better convey the perception of something being actively loaded.
   */
  animation?: 'glow' | 'wave'
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
   * Size the component extra small, small, or large.
   */
  size?: 'xs' | 'sm' | 'lg'
  /**
   * The number of columns on extra small devices (<576px).
   */
  xs?: number
  /**
   * The number of columns on small devices (<768px).
   */
  sm?: number
  /**
   * The number of columns on medium devices (<992px).
   */
  md?: number
  /**
   * The number of columns on large devices (<1200px).
   */
  lg?: number
  /**
   * The number of columns on X-Large devices (<1400px).
   */
  xl?: number
  /**
   * The number of columns on XX-Large devices (≥1400px).
   */
  xxl?: number
}

const BREAKPOINTS = [
  'xxl' as const,
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
]

export const CPlaceholder: PolymorphicRefForwardingComponent<'span', CPlaceholderProps> =
  forwardRef<HTMLSpanElement, CPlaceholderProps>(
    ({ children, animation, as: Component = 'span', className, color, size, ...rest }, ref) => {
      const repsonsiveClassNames: string[] = []

      BREAKPOINTS.forEach((bp) => {
        const breakpoint = rest[bp]
        delete rest[bp]

        const infix = bp === 'xs' ? '' : `-${bp}`

        if (typeof breakpoint === 'number') {
          repsonsiveClassNames.push(`col${infix}-${breakpoint}`)
        }

        if (typeof breakpoint === 'boolean') {
          repsonsiveClassNames.push(`col${infix}`)
        }
      })

      return (
        <Component
          className={classNames(
            animation ? `placeholder-${animation}` : 'placeholder',
            {
              [`bg-${color}`]: color,
              [`placeholder-${size}`]: size,
            },
            repsonsiveClassNames,
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

CPlaceholder.propTypes = {
  animation: PropTypes.oneOf(['glow', 'wave']),
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  size: PropTypes.oneOf(['xs', 'sm', 'lg']),
}

CPlaceholder.displayName = 'CPlaceholder'
