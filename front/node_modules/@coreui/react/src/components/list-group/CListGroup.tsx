import React, { ElementType, forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CListGroupProps extends HTMLAttributes<HTMLDivElement | HTMLUListElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Remove some borders and rounded corners to render list group items edge-to-edge in a parent component (e.g., `<CCard>`).
   */
  flush?: boolean
  /**
   * Specify a layout type.
   */
  layout?:
    | 'horizontal'
    | 'horizontal-sm'
    | 'horizontal-md'
    | 'horizontal-lg'
    | 'horizontal-xl'
    | 'horizontal-xxl'
}

export const CListGroup: PolymorphicRefForwardingComponent<'ul', CListGroupProps> = forwardRef<
  HTMLDivElement | HTMLUListElement,
  CListGroupProps
>(({ children, as: Component = 'ul', className, flush, layout, ...rest }, ref) => {
  return (
    <Component
      className={classNames(
        'list-group',
        {
          'list-group-flush': flush,
          [`list-group-${layout}`]: layout,
        },
        className,
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  )
})

CListGroup.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  flush: PropTypes.bool,
  layout: PropTypes.oneOf([
    'horizontal',
    'horizontal-sm',
    'horizontal-md',
    'horizontal-lg',
    'horizontal-xl',
    'horizontal-xxl',
  ]),
}

CListGroup.displayName = 'CListGroup'
