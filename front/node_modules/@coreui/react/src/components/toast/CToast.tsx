import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { useForkedRef } from '../../hooks'
import { colorPropType } from '../../props'
import type { Colors } from '../../types'

export interface CToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Apply a CSS fade transition to the toast.
   */
  animation?: boolean
  /**
   * Auto hide the toast.
   */
  autohide?: boolean
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Delay hiding the toast (ms).
   */
  delay?: number
  /**
   * @ignore
   */
  index?: number
  /**
   * @ignore
   */
  innerKey?: number | string
  /**
   * Callback fired when the component requests to be closed.
   */
  onClose?: (index: number | null) => void
  /**
   * Callback fired when the component requests to be shown.
   */
  onShow?: (index: number | null) => void
  /**
   * Toggle the visibility of component.
   */
  visible?: boolean
}

interface ContextProps extends CToastProps {
  visible?: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean | undefined>>
}

export const CToastContext = createContext({} as ContextProps)

export const CToast = forwardRef<HTMLDivElement, CToastProps>(
  (
    {
      children,
      animation = true,
      autohide = true,
      className,
      color,
      delay = 5000,
      index,
      innerKey,
      visible = false,
      onClose,
      onShow,
      ...rest
    },
    ref,
  ) => {
    const toastRef = useRef()
    const forkedRef = useForkedRef(ref, toastRef)
    const [_visible, setVisible] = useState(false)
    const timeout = useRef<number>()

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    const contextValues = {
      visible: _visible,
      setVisible,
    }

    // triggered on mount and destroy
    useEffect(() => () => clearTimeout(timeout.current), [])

    useEffect(() => {
      _autohide()
    }, [_visible])

    const _autohide = () => {
      if (autohide) {
        clearTimeout(timeout.current)
        timeout.current = window.setTimeout(() => {
          setVisible(false)
        }, delay)
      }
    }

    return (
      <Transition
        in={_visible}
        nodeRef={toastRef}
        onEnter={() => onShow && onShow(index ?? null)}
        onExited={() => onClose && onClose(index ?? null)}
        timeout={250}
        unmountOnExit
      >
        {(state) => (
          <CToastContext.Provider value={contextValues}>
            <div
              className={classNames(
                'toast',
                {
                  fade: animation,
                  [`bg-${color}`]: color,
                  'border-0': color,
                  'show showing': state === 'entering' || state === 'exiting',
                  show: state === 'entered',
                },
                className,
              )}
              aria-live="assertive"
              aria-atomic="true"
              role="alert"
              onMouseEnter={() => clearTimeout(timeout.current)}
              onMouseLeave={() => _autohide()}
              {...rest}
              key={innerKey}
              ref={forkedRef}
            >
              {children}
            </div>
          </CToastContext.Provider>
        )}
      </Transition>
    )
  },
)

CToast.propTypes = {
  animation: PropTypes.bool,
  autohide: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  color: colorPropType,
  delay: PropTypes.number,
  index: PropTypes.number,
  innerKey: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onClose: PropTypes.func,
  onShow: PropTypes.func,
  visible: PropTypes.bool,
}

CToast.displayName = 'CToast'
