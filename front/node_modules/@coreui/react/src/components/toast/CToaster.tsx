import React, { forwardRef, HTMLAttributes, useEffect, useState, useRef, ReactElement } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { CConditionalPortal } from '../conditional-portal'

export interface CToasterProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Describes the placement of your component.
   *
   * @type 'top-start' | 'top' | 'top-end' | 'middle-start' | 'middle' | 'middle-end' | 'bottom-start' | 'bottom' | 'bottom-end' | string
   */
  placement?:
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'middle-start'
    | 'middle-center'
    | 'middle-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end'
    | string
  /**
   * Adds new `CToast` to `CToaster`.
   */
  push?: ReactElement
}

export const CToaster = forwardRef<HTMLDivElement, CToasterProps>(
  ({ children, className, placement, push, ...rest }, ref) => {
    const [toasts, setToasts] = useState<ReactElement[]>([])
    const index = useRef<number>(0)

    useEffect(() => {
      index.current++
      push && addToast(push)
    }, [push])

    const addToast = (push: ReactElement) => {
      setToasts((state) => [
        ...state,
        React.cloneElement(push, {
          index: index.current,
          innerKey: index.current,
          onClose: (index: number) =>
            setToasts((state) => state.filter((i) => i.props.index !== index)),
        }),
      ])
    }

    return (
      <CConditionalPortal portal={typeof placement === 'string'}>
        {toasts.length > 0 || children ? (
          <div
            className={classNames(
              'toaster toast-container',
              {
                'position-fixed': placement,
                'top-0': placement && placement.includes('top'),
                'top-50 translate-middle-y': placement && placement.includes('middle'),
                'bottom-0': placement && placement.includes('bottom'),
                'start-0': placement && placement.includes('start'),
                'start-50 translate-middle-x': placement && placement.includes('center'),
                'end-0': placement && placement.includes('end'),
              },
              className,
            )}
            {...rest}
            ref={ref}
          >
            {children}
            {toasts.map((toast) => React.cloneElement(toast, { visible: true }))}
          </div>
        ) : null}
      </CConditionalPortal>
    )
  },
)

CToaster.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  placement: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'top-start',
      'top-center',
      'top-end',
      'middle-start',
      'middle-center',
      'middle-end',
      'bottom-start',
      'bottom-center',
      'bottom-end',
    ]),
  ]),
  push: PropTypes.any,
}

CToaster.displayName = 'CToaster'
