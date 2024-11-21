import React, { forwardRef, useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLinkProps, CLink } from '../link/CLink'
import { CNavContext } from '../sidebar/CSidebarNav'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { useForkedRef } from '../../hooks'

export interface CNavLinkProps extends Omit<CLinkProps, 'idx'> {
  /**
   * @ignore
   */
  idx?: string
  /**
   * @ignore
   */
  to?: string
}

export const CNavLink: PolymorphicRefForwardingComponent<'a', CNavLinkProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CNavLinkProps
>(({ children, className, idx, ...rest }, ref) => {
  const navLinkRef = useRef<HTMLAnchorElement>(null)
  const forkedRef = useForkedRef(ref, navLinkRef)

  const { setVisibleGroup } = useContext(CNavContext)

  useEffect(() => {
    rest.active = navLinkRef.current?.classList.contains('active')
    idx && rest.active && setVisibleGroup(idx)
  }, [rest.active, className])

  return (
    <CLink className={classNames('nav-link', className)} {...rest} ref={forkedRef}>
      {children}
    </CLink>
  )
})

CNavLink.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  idx: PropTypes.string,
}

CNavLink.displayName = 'CNavLink'
