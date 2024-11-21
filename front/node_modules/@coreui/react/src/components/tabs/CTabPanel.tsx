import React, { HTMLAttributes, forwardRef, useContext, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { TabsContext } from './CTabs'
import { useForkedRef } from '../../hooks'
import { getTransitionDurationFromElement } from '../../utils'

export interface CTabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Item key.
   */
  itemKey: number | string
  /**
   * Callback fired when the component requests to be hidden.
   */
  onHide?: () => void
  /**
   * Callback fired when the component requests to be shown.
   */
  onShow?: () => void
  /**
   * Enable fade in and fade out transition.
   */
  transition?: boolean
  /**
   * Toggle the visibility of component.
   */
  visible?: boolean
}

export const CTabPanel = forwardRef<HTMLDivElement, CTabPanelProps>(
  ({ children, className, itemKey, onHide, onShow, transition = true, visible, ...rest }, ref) => {
    const { _activeItemKey, id } = useContext(TabsContext)

    const tabPaneRef = useRef()
    const forkedRef = useForkedRef(ref, tabPaneRef)

    const [_visible, setVisible] = useState(visible || _activeItemKey === itemKey)

    useEffect(() => {
      visible !== undefined && setVisible(visible)
    }, [visible])

    useEffect(() => {
      setVisible(_activeItemKey === itemKey)
    }, [_activeItemKey])

    return (
      <Transition
        in={_visible}
        nodeRef={tabPaneRef}
        onEnter={onShow}
        onExit={onHide}
        timeout={tabPaneRef.current ? getTransitionDurationFromElement(tabPaneRef.current) : 0}
      >
        {(state) => (
          <div
            className={classNames(
              'tab-pane',
              {
                active: _visible,
                fade: transition,
                show: state === 'entered',
              },
              className,
            )}
            id={`${id}${itemKey}-tab-pane`}
            role="tabpanel"
            aria-labelledby={`${id}${itemKey}-tab`}
            tabIndex={0}
            ref={forkedRef}
            {...rest}
          >
            {children}
          </div>
        )}
      </Transition>
    )
  },
)

CTabPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  itemKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  transition: PropTypes.bool,
  visible: PropTypes.bool,
}

CTabPanel.displayName = 'CTabPanel'
