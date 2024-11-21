import React, { AnchorHTMLAttributes, forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink } from '../link/CLink'

export interface CCardLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * The href attribute specifies the URL of the page the link goes to.
   */
  href?: string
}

export const CCardLink = forwardRef<HTMLAnchorElement, CCardLinkProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <CLink className={classNames('card-link', className)} {...rest} ref={ref}>
        {children}
      </CLink>
    )
  },
)

CCardLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CCardLink.displayName = 'CCardLink'
