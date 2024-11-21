import React, { ChangeEventHandler, forwardRef, TextareaHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CFormControlWrapper, CFormControlWrapperProps } from './CFormControlWrapper'

export interface CFormTextareaProps
  extends CFormControlWrapperProps,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Toggle the disabled state for the component.
   */
  disabled?: boolean
  /**
   * Method called immediately after the `value` prop changes.
   */
  onChange?: ChangeEventHandler<HTMLTextAreaElement>
  /**
   * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
   */
  plainText?: boolean
  /**
   * Toggle the readonly state for the component.
   */
  readOnly?: boolean
  /**
   * The `value` attribute of component.
   *
   * @controllable onChange
   * */
  value?: string | string[] | number
}

export const CFormTextarea = forwardRef<HTMLTextAreaElement, CFormTextareaProps>(
  (
    {
      children,
      className,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingClassName,
      floatingLabel,
      id,
      invalid,
      label,
      plainText,
      text,
      tooltipFeedback,
      valid,
      ...rest
    },
    ref,
  ) => {
    return (
      <CFormControlWrapper
        describedby={rest['aria-describedby']}
        feedback={feedback}
        feedbackInvalid={feedbackInvalid}
        feedbackValid={feedbackValid}
        floatingClassName={floatingClassName}
        floatingLabel={floatingLabel}
        id={id}
        invalid={invalid}
        label={label}
        text={text}
        tooltipFeedback={tooltipFeedback}
        valid={valid}
      >
        <textarea
          className={classNames(
            plainText ? 'form-control-plaintext' : 'form-control',
            {
              'is-invalid': invalid,
              'is-valid': valid,
            },
            className,
          )}
          id={id}
          {...rest}
          ref={ref}
        >
          {children}
        </textarea>
      </CFormControlWrapper>
    )
  },
)

CFormTextarea.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  plainText: PropTypes.bool,
  ...CFormControlWrapper.propTypes,
}

CFormTextarea.displayName = 'CFormTextarea'
