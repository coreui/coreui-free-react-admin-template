import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CBreadcrumbProps extends HTMLAttributes<HTMLOListElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CBreadcrumb = forwardRef<HTMLOListElement, CBreadcrumbProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <nav aria-label="breadcrumb">
        <ol className={classNames('breadcrumb', className)} {...rest} ref={ref}>
          {children}
        </ol>
      </nav>
    )
  },
)

CBreadcrumb.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CBreadcrumb.displayName = 'CBreadcrumb'
