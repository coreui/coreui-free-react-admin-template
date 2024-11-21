import React, { AllHTMLAttributes, ElementType, forwardRef, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CLinkProps
  extends Omit<AllHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>, 'as'> {
  /**
   * Toggle the active state for the component.
   */
  active?: boolean
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * The href attribute specifies the URL of the page the link goes to.
   */
  href?: string
}

export const CLink: PolymorphicRefForwardingComponent<'a', CLinkProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CLinkProps
>(({ children, active, as: Component = 'a', className, disabled, ...rest }, ref) => {
  return (
    <Component
      // TODO: remove duplicated classes ex. `active active` in `<CListGroupItem>`
      className={classNames(className, { active, disabled })}
      {...(active && { 'aria-current': 'page' })}
      {...(Component === 'a' && disabled && { 'aria-disabled': true, tabIndex: -1 })}
      {...((Component === 'a' || Component === 'button') && {
        onClick: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
          event.preventDefault
          !disabled && rest.onClick && rest.onClick(event)
        },
      })}
      disabled={disabled}
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  )
})

CLink.propTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

CLink.displayName = 'CLink'
