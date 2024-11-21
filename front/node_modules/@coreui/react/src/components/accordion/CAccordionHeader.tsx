import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CAccordionButton } from './CAccordionButton'

export interface CAccordionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CAccordionHeader = forwardRef<HTMLDivElement, CAccordionHeaderProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={classNames('accordion-header', className)} {...rest} ref={ref}>
        <CAccordionButton>{children}</CAccordionButton>
      </div>
    )
  },
)

CAccordionHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CAccordionHeader.displayName = 'CAccordionHeader'
