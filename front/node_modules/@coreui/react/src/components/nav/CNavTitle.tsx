import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CNavTitleProps extends HTMLAttributes<HTMLLIElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CNavTitle: PolymorphicRefForwardingComponent<'li', CNavTitleProps> = forwardRef<
  HTMLLIElement,
  CNavTitleProps
>(({ children, as: Component = 'li', className, ...rest }, ref) => {
  return (
    <Component className={classNames('nav-title', className)} {...rest} ref={ref}>
      {children}
    </Component>
  )
})

CNavTitle.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CNavTitle.displayName = 'CNavTitle'
