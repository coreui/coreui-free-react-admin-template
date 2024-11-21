import React, { FC, useContext } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CButton, CButtonProps } from '../button/CButton'

import { CDropdownContext } from './CDropdown'

import { triggerPropType } from '../../props'
import type { Triggers } from '../../types'

export interface CDropdownToggleProps extends Omit<CButtonProps, 'type'> {
  /**
   * Enables pseudo element caret on toggler.
   */
  caret?: boolean
  /**
   * Create a custom toggler which accepts any content.
   */
  custom?: boolean
  /**
   * If a dropdown `variant` is set to `nav-item` then render the toggler as a link instead of a button.
   *
   * @since 5.0.0
   */
  navLink?: boolean
  /**
   * Similarly, create split button dropdowns with virtually the same markup as single button dropdowns, but with the addition of `.dropdown-toggle-split` className for proper spacing around the dropdown caret.
   */
  split?: boolean
  /**
   * Sets which event handlers you’d like provided to your toggle prop. You can specify one trigger or an array of them.
   *
   * @type 'hover' | 'focus' | 'click'
   */
  trigger?: Triggers | Triggers[]
}

export const CDropdownToggle: FC<CDropdownToggleProps> = ({
  children,
  caret = true,
  custom,
  className,
  navLink = true,
  split,
  trigger = 'click',
  ...rest
}) => {
  const { dropdownToggleRef, variant, visible, setVisible } = useContext(CDropdownContext)

  const triggers = {
    ...((trigger === 'click' || trigger.includes('click')) && {
      onClick: (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        setVisible(!visible)
      },
    }),
    ...((trigger === 'focus' || trigger.includes('focus')) && {
      onFocus: () => setVisible(true),
      onBlur: () => setVisible(false),
    }),
  }

  const togglerProps = {
    className: classNames(
      {
        'nav-link': variant === 'nav-item' && navLink,
        'dropdown-toggle': caret,
        'dropdown-toggle-split': split,
        show: visible,
      },
      className,
    ),
    'aria-expanded': visible,
    ...(!rest.disabled && { ...triggers }),
  }

  const Toggler = () => {
    if (custom && React.isValidElement(children)) {
      return (
        <>
          {React.cloneElement(children as React.ReactElement<any>, {
            'aria-expanded': visible,
            ...(!rest.disabled && { ...triggers }),
            ref: dropdownToggleRef,
          })}
        </>
      )
    }

    if (variant === 'nav-item' && navLink) {
      return (
        <a href="#" {...togglerProps} role="button" ref={dropdownToggleRef}>
          {children}
        </a>
      )
    }

    return (
      <CButton {...togglerProps} tabIndex={0} {...rest} ref={dropdownToggleRef}>
        {children}
        {split && <span className="visually-hidden">Toggle Dropdown</span>}
      </CButton>
    )
  }

  return <Toggler />
}

CDropdownToggle.propTypes = {
  caret: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  custom: PropTypes.bool,
  split: PropTypes.bool,
  trigger: triggerPropType,
}

CDropdownToggle.displayName = 'CDropdownToggle'
