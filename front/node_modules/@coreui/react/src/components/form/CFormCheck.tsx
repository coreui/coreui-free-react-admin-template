import React, { forwardRef, InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CFormControlValidation, CFormControlValidationProps } from './CFormControlValidation'
import { CFormLabel } from './CFormLabel'

import { useForkedRef } from '../../hooks'
import type { Colors, Shapes } from '../../types'

export type ButtonObject = {
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: Colors
  /**
   * Select the shape of the component.
   *
   * @type 'rounded' | 'rounded-top' | 'rounded-end' | 'rounded-bottom' | 'rounded-start' | 'rounded-circle' | 'rounded-pill' | 'rounded-0' | 'rounded-1' | 'rounded-2' | 'rounded-3' | string
   */
  shape?: Shapes
  /**
   * Size the component small or large.
   */
  size?: 'sm' | 'lg'
  /**
   * Set the button variant to an outlined button or a ghost button.
   */
  variant?: 'outline' | 'ghost'
}

export interface CFormCheckProps
  extends CFormControlValidationProps,
    InputHTMLAttributes<HTMLInputElement> {
  /**
   * Create button-like checkboxes and radio buttons.
   */
  button?: ButtonObject
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Sets hit area to the full area of the component.
   */
  hitArea?: 'full'
  /**
   * The id global attribute defines an identifier (ID) that must be unique in the whole document.
   */
  id?: string
  /**
   * Input Checkbox indeterminate Property.
   */
  indeterminate?: boolean
  /**
   * Group checkboxes or radios on the same horizontal row.
   */
  inline?: boolean
  /**
   * Set component validation state to invalid.
   */
  invalid?: boolean
  /**
   * The element represents a caption for a component.
   */
  label?: string | ReactNode
  /**
   * Put checkboxes or radios on the opposite side.
   *
   * @sinve 4.7.0
   */
  reverse?: boolean
  /**
   * Specifies the type of component.
   */
  type?: 'checkbox' | 'radio'
  /**
   * Set component validation state to valid.
   */
  valid?: boolean
}

export const CFormCheck = forwardRef<HTMLInputElement, CFormCheckProps>(
  (
    {
      className,
      button,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingLabel,
      tooltipFeedback,
      hitArea,
      id,
      indeterminate,
      inline,
      invalid,
      label,
      reverse,
      type = 'checkbox',
      valid,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const forkedRef = useForkedRef(ref, inputRef)

    useEffect(() => {
      if (inputRef.current && indeterminate) {
        inputRef.current.indeterminate = indeterminate
      }
    }, [indeterminate, inputRef.current])

    const FormControl = () => (
      <input
        type={type}
        className={classNames(button ? 'btn-check' : 'form-check-input', {
          'is-invalid': invalid,
          'is-valid': valid,
          'me-2': hitArea,
        })}
        id={id}
        {...rest}
        ref={forkedRef}
      />
    )

    const FormValidation = () => (
      <CFormControlValidation
        describedby={rest['aria-describedby']}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingLabel={floatingLabel}
        invalid={invalid}
        tooltipFeedback={tooltipFeedback}
        valid={valid}
      />
    )

    const FormLabel = () => (
      <CFormLabel
        customClassName={classNames(
          button
            ? classNames(
                'btn',
                button.variant ? `btn-${button.variant}-${button.color}` : `btn-${button.color}`,
                {
                  [`btn-${button.size}`]: button.size,
                },
                `${button.shape}`,
              )
            : 'form-check-label',
        )}
        {...(id && { htmlFor: id })}
      >
        {label}
      </CFormLabel>
    )

    const FormCheck = () => {
      if (button) {
        return (
          <>
            <FormControl />
            {label && <FormLabel />}
            <FormValidation />
          </>
        )
      }

      if (label) {
        return hitArea ? (
          <>
            <FormControl />
            <CFormLabel
              customClassName={classNames('form-check-label stretched-link', className)}
              {...(id && { htmlFor: id })}
            >
              {label}
            </CFormLabel>
            <FormValidation />
          </>
        ) : (
          <div
            className={classNames(
              'form-check',
              {
                'form-check-inline': inline,
                'form-check-reverse': reverse,
                'is-invalid': invalid,
                'is-valid': valid,
              },
              className,
            )}
          >
            <FormControl />
            <FormLabel />
            <FormValidation />
          </div>
        )
      }

      return <FormControl />
    }

    return <FormCheck />
  },
)

CFormCheck.propTypes = {
  button: PropTypes.object,
  className: PropTypes.string,
  hitArea: PropTypes.oneOf(['full']),
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  inline: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  reverse: PropTypes.bool,
  type: PropTypes.oneOf(['checkbox', 'radio']),
  ...CFormControlValidation.propTypes,
}

CFormCheck.displayName = 'CFormCheck'
