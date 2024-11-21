import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CCarouselCaptionProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CCarouselCaption = forwardRef<HTMLDivElement, CCarouselCaptionProps>(
  ({ className, ...rest }, ref) => {
    return <div className={classNames('carousel-caption', className)} {...rest} ref={ref} />
  },
)

CCarouselCaption.propTypes = {
  className: PropTypes.string,
}

CCarouselCaption.displayName = 'CCarouselCaption'
