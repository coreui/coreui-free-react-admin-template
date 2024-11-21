import React, { ElementType, forwardRef, useContext } from 'react'
import PropTypes from 'prop-types'

import { CButtonProps } from '../button/CButton'
import { CCloseButton, CCloseButtonProps } from '../close-button/CCloseButton'

import { CToastContext } from './CToast'

import { PolymorphicRefForwardingComponent } from '../../helpers'

type CombineButtonProps = CCloseButtonProps & CButtonProps

export interface CToastCloseProps extends Omit<CombineButtonProps, 'as'> {
  /**
   * Component used for the root node. Either a string to use a HTML element or a component.
   */
  as?: string | ElementType
}

export const CToastClose: PolymorphicRefForwardingComponent<'button', CToastCloseProps> =
  forwardRef<HTMLButtonElement, CToastCloseProps>(({ children, as: Component, ...rest }, ref) => {
    const { setVisible } = useContext(CToastContext)
    return Component ? (
      <Component onClick={() => setVisible(false)} {...rest} ref={ref}>
        {children}
      </Component>
    ) : (
      <CCloseButton onClick={() => setVisible(false)} {...rest} ref={ref} />
    )
  })

CToastClose.propTypes = {
  ...CCloseButton.propTypes,
  as: PropTypes.elementType,
}

CToastClose.displayName = 'CToastClose'
