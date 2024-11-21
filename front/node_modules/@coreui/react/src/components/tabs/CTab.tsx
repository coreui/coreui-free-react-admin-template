import React, { forwardRef, HTMLAttributes, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TabsContext } from './CTabs'

export interface CTabProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * Item key.
   */
  itemKey: number | string
}

export const CTab = forwardRef<HTMLButtonElement, CTabProps>(
  ({ children, className, itemKey, ...rest }, ref) => {
    const { _activeItemKey, setActiveItemKey, id } = useContext(TabsContext)

    const isActive = () => itemKey === _activeItemKey

    return (
      <button
        className={classNames(
          'nav-link',
          {
            active: isActive(),
          },
          className,
        )}
        id={`${id}${itemKey}-tab`}
        onClick={() => setActiveItemKey(itemKey)}
        onFocus={() => setActiveItemKey(itemKey)}
        role="tab"
        tabIndex={isActive() ? 0 : -1}
        type="button"
        aria-controls={`${id}${itemKey}-tab-pane`}
        aria-selected={isActive()}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    )
  },
)

CTab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  itemKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
}

CTab.displayName = 'CTab'
