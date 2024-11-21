import React, { HTMLAttributes, forwardRef, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { useForkedRef } from '../../hooks'

export interface CTabPaneProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
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
   *
   * @since 5.1.0
   */
  transition?: boolean
  /**
   * Toggle the visibility of component.
   */
  visible?: boolean
}

export const CTabPane = forwardRef<HTMLDivElement, CTabPaneProps>(
  ({ children, className, onHide, onShow, transition = true, visible, ...rest }, ref) => {
    const tabPaneRef = useRef()
    const forkedRef = useForkedRef(ref, tabPaneRef)

    return (
      <Transition in={visible} nodeRef={tabPaneRef} onEnter={onShow} onExit={onHide} timeout={150}>
        {(state) => (
          <div
            className={classNames(
              'tab-pane',
              {
                active: visible,
                fade: transition,
                show: state === 'entered',
              },
              className,
            )}
            {...rest}
            ref={forkedRef}
          >
            {children}
          </div>
        )}
      </Transition>
    )
  },
)

CTabPane.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  transition: PropTypes.bool,
  visible: PropTypes.bool,
}

CTabPane.displayName = 'CTabPane'
