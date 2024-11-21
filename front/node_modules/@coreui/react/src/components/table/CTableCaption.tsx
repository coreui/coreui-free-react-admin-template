import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'

export const CTableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ children, ...props }, ref) => {
  return (
    <caption {...props} ref={ref}>
      {children}
    </caption>
  )
})

CTableCaption.propTypes = {
  children: PropTypes.node,
}

CTableCaption.displayName = 'CTableCaption'
