import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CAccordionItemContext } from './CAccordionItem'

export interface CAccordionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
}

export const CAccordionButton = forwardRef<HTMLButtonElement, CAccordionButtonProps>(
  ({ children, className, ...rest }, ref) => {
    const { visible, setVisible } = useContext(CAccordionItemContext)

    return (
      <button
        type="button"
        className={classNames('accordion-button', { collapsed: !visible }, className)}
        aria-expanded={!visible}
        onClick={() => setVisible(!visible)}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)

CAccordionButton.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

CAccordionButton.displayName = 'CAccordionButton'
