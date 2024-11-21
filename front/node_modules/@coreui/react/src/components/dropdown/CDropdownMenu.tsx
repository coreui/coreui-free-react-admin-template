import React, { ElementType, forwardRef, HTMLAttributes, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CDropdownContext } from './CDropdown'
import { CConditionalPortal } from '../conditional-portal'

import { PolymorphicRefForwardingComponent } from '../../helpers'
import { useForkedRef } from '../../hooks'

import { getAlignmentClassNames } from './utils'

export interface CDropdownMenuProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CDropdownMenu: PolymorphicRefForwardingComponent<'ul', CDropdownMenuProps> =
  forwardRef<HTMLDivElement | HTMLUListElement, CDropdownMenuProps>(
    ({ children, as: Component = 'ul', className, ...rest }, ref) => {
      const { alignment, container, dark, dropdownMenuRef, popper, portal, visible } =
        useContext(CDropdownContext)

      const forkedRef = useForkedRef(ref, dropdownMenuRef)

      return (
        <CConditionalPortal container={container} portal={portal ?? false}>
          <Component
            className={classNames(
              'dropdown-menu',
              {
                show: visible,
              },
              alignment && getAlignmentClassNames(alignment),
              className,
            )}
            ref={forkedRef}
            role="menu"
            aria-hidden={!visible}
            {...(!popper && { 'data-coreui-popper': 'static' })}
            {...(dark && { 'data-coreui-theme': 'dark' })}
            {...rest}
          >
            {Component === 'ul'
              ? React.Children.map(children, (child, index) => {
                  if (React.isValidElement(child)) {
                    return <li key={index}>{React.cloneElement(child)}</li>
                  }
                  return
                })
              : children}
          </Component>
        </CConditionalPortal>
      )
    },
  )

CDropdownMenu.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
}

CDropdownMenu.displayName = 'CDropdownMenu'
