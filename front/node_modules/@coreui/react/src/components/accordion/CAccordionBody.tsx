import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CAccordionItemContext } from './CAccordionItem'

import { CCollapse } from './../collapse/CCollapse'

export interface CAccordionBodyProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CAccordionBody = forwardRef<HTMLDivElement, CAccordionBodyProps>(
  ({ children, className, ...rest }, ref) => {
    const { visible } = useContext(CAccordionItemContext)

    return (
      <CCollapse className="accordion-collapse" visible={visible}>
        <div className={classNames('accordion-body', className)} {...rest} ref={ref}>
          {children}
        </div>
      </CCollapse>
    )
  },
)

CAccordionBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CAccordionBody.displayName = 'CAccordionBody'
