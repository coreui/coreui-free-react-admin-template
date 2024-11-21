import React, { forwardRef, HTMLAttributes, KeyboardEvent, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { useForkedRef } from '../../hooks'
import { getNextActiveElement } from '../../utils'

export interface CTabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Specify a layout type for component.
   */
  layout?: 'fill' | 'justified'
  /**
   * Set the nav variant to tabs or pills.
   */
  variant?: 'pills' | 'tabs' | 'underline' | 'underline-border'
}

export const CTabList = forwardRef<HTMLDivElement, CTabListProps>(
  ({ children, className, layout, variant, ...rest }, ref) => {
    const tabListRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, tabListRef)

    const handleKeydown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        tabListRef.current !== null &&
        (event.key === 'ArrowDown' ||
          event.key === 'ArrowUp' ||
          event.key === 'ArrowLeft' ||
          event.key === 'ArrowRight' ||
          event.key === 'Home' ||
          event.key === 'End')
      ) {
        event.preventDefault()
        const target = event.target as HTMLElement
        // eslint-disable-next-line unicorn/prefer-spread
        const items: HTMLElement[] = Array.from(
          tabListRef.current.querySelectorAll('.nav-link:not(.disabled):not(:disabled)'),
        )

        let nextActiveElement

        if (event.key === 'Home' || event.key === 'End') {
          nextActiveElement = event.key === 'End' ? items.at(-1) : items[0]
        } else {
          nextActiveElement = getNextActiveElement(
            items,
            target,
            event.key === 'ArrowDown' || event.key === 'ArrowRight',
            true,
          )
        }

        if (nextActiveElement) {
          nextActiveElement.focus({ preventScroll: true })
        }
      }
    }

    return (
      <div
        className={classNames(
          'nav',
          {
            [`nav-${layout}`]: layout,
            [`nav-${variant}`]: variant,
          },
          className,
        )}
        role="tablist"
        onKeyDown={handleKeydown}
        ref={forkedRef}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

CTabList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  layout: PropTypes.oneOf(['fill', 'justified']),
  variant: PropTypes.oneOf(['pills', 'tabs', 'underline', 'underline-border']),
}

CTabList.displayName = 'CTabList'
