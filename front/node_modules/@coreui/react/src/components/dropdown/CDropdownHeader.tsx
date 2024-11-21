import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CDropdownHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CDropdownHeader: PolymorphicRefForwardingComponent<'h6', CDropdownHeaderProps> =
  forwardRef<HTMLHeadingElement, CDropdownHeaderProps>(
    ({ children, as: Component = 'h6', className, ...rest }, ref) => {
      return (
        <Component className={classNames('dropdown-header', className)} {...rest} ref={ref}>
          {children}
        </Component>
      )
    },
  )

CDropdownHeader.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CDropdownHeader.displayName = 'CDropdownHeader'
