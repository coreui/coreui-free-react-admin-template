import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CDropdownItemPlainProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CDropdownItemPlain: PolymorphicRefForwardingComponent<
  'span',
  CDropdownItemPlainProps
> = forwardRef<HTMLSpanElement, CDropdownItemPlainProps>(
  ({ children, as: Component = 'span', className, ...rest }, ref) => {
    return (
      <Component className={classNames('dropdown-item-text', className)} {...rest} ref={ref}>
        {children}
      </Component>
    )
  },
)

CDropdownItemPlain.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CDropdownItemPlain.displayName = 'CDropdownItemPlain'
