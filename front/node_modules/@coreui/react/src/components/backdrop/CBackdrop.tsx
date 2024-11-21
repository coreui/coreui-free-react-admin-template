import React, { forwardRef, HTMLAttributes, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Transition } from 'react-transition-group'

import { useForkedRef } from '../../hooks'

export interface CBackdropProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Toggle the visibility of modal component.
   */
  visible?: boolean
}

export const CBackdrop = forwardRef<HTMLDivElement, CBackdropProps>(
  ({ className = 'modal-backdrop', visible, ...rest }, ref) => {
    const backdropRef = useRef<HTMLDivElement>(null)
    const forkedRef = useForkedRef(ref, backdropRef)

    return (
      <Transition in={visible} mountOnEnter nodeRef={backdropRef} timeout={150} unmountOnExit>
        {(state) => (
          <div
            className={classNames(className, 'fade', {
              show: state === 'entered',
            })}
            {...rest}
            ref={forkedRef}
          />
        )}
      </Transition>
    )
  },
)

CBackdrop.propTypes = {
  className: PropTypes.string,
  visible: PropTypes.bool,
}

CBackdrop.displayName = 'CBackdrop'
