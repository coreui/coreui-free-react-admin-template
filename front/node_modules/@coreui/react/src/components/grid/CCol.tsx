import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

type Span = 'auto' | number | string | boolean | null

type BPObject = {
  span?: Span
  offset?: number | string | null
  order?: 'first' | 'last' | number | string | null
}

type Col = Span | BPObject

export interface CColProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * The number of columns/offset/order on extra small devices (<576px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  xs?: Col
  /**
   * The number of columns/offset/order on small devices (<768px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  sm?: Col
  /**
   * The number of columns/offset/order on medium devices (<992px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  md?: Col
  /**
   * The number of columns/offset/order on large devices (<1200px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  lg?: Col
  /**
   * The number of columns/offset/order on X-Large devices (<1400px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  xl?: Col
  /**
   * The number of columns/offset/order on XX-Large devices (≥1400px).
   *
   * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
   */
  xxl?: Col
}

const BREAKPOINTS = [
  'xxl' as const,
  'xl' as const,
  'lg' as const,
  'md' as const,
  'sm' as const,
  'xs' as const,
]

export const CCol = forwardRef<HTMLDivElement, CColProps>(
  ({ children, className, ...rest }, ref) => {
    const repsonsiveClassNames: string[] = []

    BREAKPOINTS.forEach((bp) => {
      const breakpoint = rest[bp]
      delete rest[bp]

      const infix = bp === 'xs' ? '' : `-${bp}`

      if (typeof breakpoint === 'number' || typeof breakpoint === 'string') {
        repsonsiveClassNames.push(`col${infix}-${breakpoint}`)
      }

      if (typeof breakpoint === 'boolean') {
        repsonsiveClassNames.push(`col${infix}`)
      }

      if (breakpoint && typeof breakpoint === 'object') {
        if (typeof breakpoint.span === 'number' || typeof breakpoint.span === 'string') {
          repsonsiveClassNames.push(`col${infix}-${breakpoint.span}`)
        }

        if (typeof breakpoint.span === 'boolean') {
          repsonsiveClassNames.push(`col${infix}`)
        }

        if (typeof breakpoint.order === 'number' || typeof breakpoint.order === 'string') {
          repsonsiveClassNames.push(`order${infix}-${breakpoint.order}`)
        }

        if (typeof breakpoint.offset === 'number') {
          repsonsiveClassNames.push(`offset${infix}-${breakpoint.offset}`)
        }
      }
    })

    return (
      <div
        className={classNames(
          repsonsiveClassNames.length > 0 ? repsonsiveClassNames : 'col',
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

const span = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.oneOf(['auto']),
])

const col = PropTypes.oneOfType([
  span,
  PropTypes.shape({
    span: span,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    order: PropTypes.oneOfType([
      PropTypes.oneOf(['first', 'last']),
      PropTypes.number,
      PropTypes.string,
    ]),
  }),
])

CCol.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  xs: col,
  sm: col,
  md: col,
  lg: col,
  xl: col,
  xxl: col,
}

CCol.displayName = 'CCol'
