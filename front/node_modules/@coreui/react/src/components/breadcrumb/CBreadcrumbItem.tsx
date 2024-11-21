import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink } from '../link/CLink'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CBreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   *
   * @since 5.4.0
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * The `href` attribute for the inner `<CLink>` component.
   */
  href?: string
}

export const CBreadcrumbItem: PolymorphicRefForwardingComponent<'li', CBreadcrumbItemProps> =
  forwardRef<HTMLLIElement, CBreadcrumbItemProps>(
    ({ children, active, as, className, href, ...rest }, ref) => {
      return (
        <li
          className={classNames(
            'breadcrumb-item',
            {
              active: active,
            },
            className,
          )}
          {...(active && { 'aria-current': 'page' })}
          {...rest}
          ref={ref}
        >
          {href ? (
            <CLink as={as} href={href}>
              {children}
            </CLink>
          ) : (
            children
          )}
        </li>
      )
    },
  )

CBreadcrumbItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
}

CBreadcrumbItem.displayName = 'CBreadcrumbItem'
