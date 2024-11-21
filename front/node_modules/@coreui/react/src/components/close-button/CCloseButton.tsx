import React, { forwardRef, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export interface CCloseButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * A string of all className you want applied to the base component.
   */
  className?: string
  /**
   * Invert the default color.
   */
  dark?: boolean
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * Change the default color to white.
   *
   * @deprecated 5.0.0
   */
  white?: boolean
}

export const CCloseButton = forwardRef<HTMLButtonElement, CCloseButtonProps>(
  ({ className, dark, disabled, white, ...rest }, ref) => {
    return (
      <button
        type="button"
        className={classNames(
          'btn',
          'btn-close',
          {
            'btn-close-white': white,
          },
          disabled,
          className,
        )}
        aria-label="Close"
        disabled={disabled}
        {...(dark && { 'data-coreui-theme': 'dark' })}
        {...rest}
        ref={ref}
      />
    )
  },
)

CCloseButton.propTypes = {
  className: PropTypes.string,
  dark: PropTypes.bool,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
}

CCloseButton.displayName = 'CCloseButton'
