import React, { forwardRef, ImgHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CImageProps extends ImgHTMLAttributes<HTMLOrSVGImageElement> {
  /**
   * Set the horizontal aligment.
   */
  align?: 'start' | 'center' | 'end'
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Make image responsive.
   */
  fluid?: boolean
  /**
   * Make image rounded.
   */
  rounded?: boolean
  /**
   * Give an image a rounded 1px border appearance.
   */
  thumbnail?: boolean
}

export const CImage = forwardRef<HTMLImageElement, CImageProps>(
  ({ align, className, fluid, rounded, thumbnail, ...rest }, ref) => {
    return (
      <img
        className={
          classNames(
            {
              [`float-${align}`]: align && (align === 'start' || align === 'end'),
              'd-block mx-auto': align && align === 'center',
              'img-fluid': fluid,
              rounded: rounded,
              'img-thumbnail': thumbnail,
            },
            className,
          ) || undefined
        }
        {...rest}
        ref={ref}
      />
    )
  },
)

CImage.propTypes = {
  align: PropTypes.oneOf(['start', 'center', 'end']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  rounded: PropTypes.bool,
  thumbnail: PropTypes.bool,
}

CImage.displayName = 'CImage'
