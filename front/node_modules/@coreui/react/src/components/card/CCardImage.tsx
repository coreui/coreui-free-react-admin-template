import React, { ElementType, forwardRef, ImgHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { PolymorphicRefForwardingComponent } from '../../helpers'

export interface CCardImageProps
  extends ImgHTMLAttributes<HTMLImageElement | HTMLOrSVGElement | HTMLOrSVGImageElement> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: ElementType
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Optionally orientate the image to the top, bottom, or make it overlaid across the card.
   */
  orientation?: 'top' | 'bottom'
}

export const CCardImage: PolymorphicRefForwardingComponent<'img', CCardImageProps> = forwardRef<
  HTMLImageElement | HTMLOrSVGElement | HTMLOrSVGImageElement,
  CCardImageProps
>(({ children, as: Component = 'img', className, orientation, ...rest }, ref) => {
  return (
    <Component
      className={classNames(orientation ? `card-img-${orientation}` : 'card-img', className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Component>
  )
})

CCardImage.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  orientation: PropTypes.oneOf(['top', 'bottom']),
}

CCardImage.displayName = 'CCardImage'
