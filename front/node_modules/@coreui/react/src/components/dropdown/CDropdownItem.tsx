import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CLink, CLinkProps } from '../link/CLink'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CDropdownItemProps extends CLinkProps {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
}

export const CDropdownItem: PolymorphicRefForwardingComponent<'a', CDropdownItemProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CDropdownItemProps
>(({ children, as = 'a', className, ...rest }, ref) => {
  return (
    <CLink className={classNames('dropdown-item', className)} as={as} {...rest} ref={ref}>
      {children}
    </CLink>
  )
})

CDropdownItem.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CDropdownItem.displayName = 'CDropdownItem'
