import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink } from '../link/CLink'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CPaginationItemProps extends HTMLAttributes<HTMLAnchorElement> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: string | ElementType
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
}

export const CPaginationItem: PolymorphicRefForwardingComponent<'a', CPaginationItemProps> =
  forwardRef<HTMLAnchorElement, CPaginationItemProps>(
    ({ children, as, className, ...rest }, ref) => {
      const Component = as ?? (rest.active ? 'span' : 'a')

      return (
        <li
          className={classNames(
            'page-item',
            {
              active: rest.active,
              disabled: rest.disabled,
            },
            className,
          )}
          {...(rest.active && { 'aria-current': 'page' })}
        >
          {Component === 'a' ? (
            <CLink className="page-link" as={Component} {...rest} ref={ref}>
              {children}
            </CLink>
          ) : (
            <Component className="page-link" ref={ref}>
              {children}
            </Component>
          )}
        </li>
      )
    },
  )

CPaginationItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CPaginationItem.displayName = 'CPaginationItem'
