import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Defines optional container wrapping children elements.
   */
  container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid'
  /**
   * Place header in non-static positions.
   */
  position?: 'fixed' | 'sticky'
}

export const CHeader = forwardRef<HTMLDivElement, CHeaderProps>(
  ({ children, className, container, position, ...rest }, ref) => {
    return (
      <div
        className={classNames('header', { [`header-${position}`]: position }, className)}
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
      </div>
    )
  },
)

CHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
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
  position: PropTypes.oneOf(['fixed', 'sticky']),
}

CHeader.displayName = 'CHeader'
