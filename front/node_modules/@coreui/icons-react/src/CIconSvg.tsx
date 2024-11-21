import React, { Children, HTMLAttributes, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './CIcon.css'

export interface CIconSvgProps extends Omit<HTMLAttributes<SVGSVGElement>, 'content'> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Use for replacing default CIcon component classes. Prop is overriding the 'size' prop.
   */
  customClassName?: string | string[]
  /**
   * The height attribute defines the vertical length of an icon.
   */
  height?: number
  /**
   * Size of the icon. Available sizes: 'sm', 'lg', 'xl', 'xxl', '3xl...9xl', 'custom', 'custom-size'.
   */
  size?:
    | 'custom'
    | 'custom-size'
    | 'sm'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  /**
   * Title tag content.
   */
  title?: string
  /**
   * The width attribute defines the horizontal length of an icon.
   */
  width?: number
}

export const CIconSvg = forwardRef<SVGSVGElement, CIconSvgProps>(
  ({ children, className, customClassName, height, size, title, width, ...rest }, ref) => {
    const _className = customClassName
      ? classNames(customClassName)
      : classNames(
          'icon',
          {
            [`icon-${size}`]: size,
            [`icon-custom-size`]: height || width,
          },
          className,
        )

    return (
      <>
        {Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              'aria-hidden': true,
              className: _className,
              focusable: 'false',
              ref: ref,
              role: 'img',
              ...rest,
            })
          }

          return
        })}
        {title && <span className="visually-hidden">{title}</span>}
      </>
    )
  },
)

CIconSvg.propTypes = {
  className: PropTypes.string,
  customClassName: PropTypes.string,
  height: PropTypes.number,
  size: PropTypes.oneOf([
    'custom',
    'custom-size',
    'sm',
    'lg',
    'xl',
    'xxl',
    '3xl',
    '4xl',
    '5xl',
    '6xl',
    '7xl',
    '8xl',
    '9xl',
  ]),
  title: PropTypes.string,
  width: PropTypes.number,
}

CIconSvg.displayName = 'CIconSvg'
