import React, { createContext, forwardRef, HTMLAttributes, useEffect, useId, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * The active item key.
   */
  activeItemKey: number | string
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * The callback is fired when the active tab changes.
   */
  onChange?: (value: number | string) => void
}

export interface TabsContextProps {
  _activeItemKey?: number | string
  setActiveItemKey: React.Dispatch<React.SetStateAction<number | string | undefined>>
  id?: string
}

export const TabsContext = createContext({} as TabsContextProps)

export const CTabs = forwardRef<HTMLDivElement, CTabsProps>(
  ({ children, activeItemKey, className, onChange }, ref) => {
    const id = useId()
    const [_activeItemKey, setActiveItemKey] = useState(activeItemKey)

    useEffect(() => {
      _activeItemKey && onChange && onChange(_activeItemKey)
    }, [_activeItemKey])

    return (
      <TabsContext.Provider value={{ _activeItemKey, setActiveItemKey, id }}>
        <div className={classNames('tabs', className)} ref={ref}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  },
)

CTabs.propTypes = {
  activeItemKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  onChange: PropTypes.func,
}

CTabs.displayName = 'CTabs'
