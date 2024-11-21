import React, { AnchorHTMLAttributes, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink } from '../link/CLink'

export interface CAlertLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CAlertLink = forwardRef<HTMLAnchorElement, CAlertLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <CLink className={classNames('alert-link', className)} {...rest} ref={ref}>
        {children}
      </CLink>
    )
  },
)

CAlertLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CAlertLink.displayName = 'CAlertLink'
