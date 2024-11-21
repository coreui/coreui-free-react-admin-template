import React, { forwardRef, HTMLAttributes, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { CBackdrop } from '../backdrop'
import { CConditionalPortal } from '../conditional-portal'

import { useForkedRef } from '../../hooks'

export interface COffcanvasProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Apply a backdrop on body while offcanvas is open.
   */
  backdrop?: boolean | 'static'
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Sets a darker color scheme.
   */
  dark?: boolean
  /**
   * Closes the offcanvas when escape key is pressed.
   */
  keyboard?: boolean
  /**
   * Callback fired when the component requests to be hidden.
   */
  onHide?: () => void
  /**
   * Callback fired when the component requests to be shown.
   */
  onShow?: () => void
  /**
   * Components placement, there’s no default placement.
   */
  placement: 'start' | 'end' | 'top' | 'bottom'
  /**
   * Generates modal using createPortal.
   */
  portal?: boolean
  /**
   * Responsive offcanvas property hide content outside the viewport from a specified breakpoint and down.
   *
   * @since 4.6.0
   */
  responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  /**
   * Allow body scrolling while offcanvas is open
   */
  scroll?: boolean
  /**
   * Toggle the visibility of offcanvas component.
   */
  visible?: boolean
}

export const COffcanvas = forwardRef<HTMLDivElement, COffcanvasProps>(
  (
    {
      children,
      backdrop = true,
      className,
      dark,
      keyboard = true,
      onHide,
      onShow,
      placement,
      portal = false,
      responsive = true,
      scroll = false,
      visible = false,
      ...rest
    },
    ref,
  ) => {
    const [_visible, setVisible] = useState<boolean>(visible)
    const offcanvasRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, offcanvasRef)

    useEffect(() => {
      setVisible(visible)
    }, [visible])

    useEffect(() => {
      if (_visible && !scroll) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = '0px'
        return
      }

      if (!scroll) {
        document.body.style.removeProperty('overflow')
        document.body.style.removeProperty('padding-right')
      }
    }, [_visible])

    const handleDismiss = () => {
      setVisible(false)
    }

    const handleBackdropDismiss = () => {
      if (backdrop !== 'static') {
        setVisible(false)
      }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape' && keyboard) {
        return handleDismiss()
      }
    }

    return (
      <>
        <Transition
          in={_visible}
          nodeRef={offcanvasRef}
          onEnter={onShow}
          onEntered={() => offcanvasRef.current?.focus()}
          onExit={onHide}
          timeout={300}
        >
          {(state) => (
            <CConditionalPortal portal={portal}>
              <div
                className={classNames(
                  {
                    [`offcanvas${typeof responsive === 'string' ? '-' + responsive : ''}`]:
                      responsive,
                    [`offcanvas-${placement}`]: placement,
                    showing: state === 'entering',
                    show: state === 'entered',
                    'show hiding': state === 'exiting',
                  },
                  className,
                )}
                role="dialog"
                tabIndex={-1}
                onKeyDown={handleKeyDown}
                {...(dark && { 'data-coreui-theme': 'dark' })}
                {...rest}
                ref={forkedRef}
              >
                {children}
              </div>
            </CConditionalPortal>
          )}
        </Transition>
        {backdrop && (
          <CConditionalPortal portal={portal}>
            <CBackdrop
              className="offcanvas-backdrop"
              onClick={handleBackdropDismiss}
              visible={_visible}
            />
          </CConditionalPortal>
        )}
      </>
    )
  },
)

COffcanvas.propTypes = {
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf<'static'>(['static'])]),
  children: PropTypes.node,
  className: PropTypes.string,
  dark: PropTypes.bool,
  keyboard: PropTypes.bool,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
  placement: PropTypes.oneOf<'start' | 'end' | 'top' | 'bottom'>(['start', 'end', 'top', 'bottom'])
    .isRequired,
  portal: PropTypes.bool,
  responsive: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf<'sm' | 'md' | 'lg' | 'xl' | 'xxl'>(['sm', 'md', 'lg', 'xl', 'xxl']),
  ]),
  scroll: PropTypes.bool,
  visible: PropTypes.bool,
}

COffcanvas.displayName = 'COffcanvas'
