import React, { FC, ReactNode } from 'react'
import PropTypes from 'prop-types'

import { CFormControlValidation, CFormControlValidationProps } from './CFormControlValidation'
import { CFormFloating } from './CFormFloating'
import { CFormLabel } from './CFormLabel'
import { CFormText } from './CFormText'

export interface CFormControlWrapperProps extends CFormControlValidationProps {
  /**
   * @ignore
   */
  children?: ReactNode
  /**
   * A string of all className you want applied to the floating label wrapper.
   *
   * @since 4.5.0
   */
  floatingClassName?: string
  /**
   * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
   *
   * @since 4.2.0
   */
  floatingLabel?: ReactNode | string
  /**
   * @ignore
   */
  id?: string
  /**
   * Add a caption for a component.
   *
   * @since 4.2.0
   */
  label?: ReactNode | string
  /**
   * Add helper text to the component.
   *
   * @since 4.2.0
   */
  text?: ReactNode | string
}

export const CFormControlWrapper: FC<CFormControlWrapperProps> = ({
  children,
  describedby,
  feedback,
  feedbackInvalid,
  feedbackValid,
  floatingClassName,
  floatingLabel,
  id,
  invalid,
  label,
  text,
  tooltipFeedback,
  valid,
}) => {
  const FormControlValidation = () => (
    <CFormControlValidation
      describedby={describedby}
      feedback={feedback}
      feedbackInvalid={feedbackInvalid}
      feedbackValid={feedbackValid}
      floatingLabel={floatingLabel}
      invalid={invalid}
      tooltipFeedback={tooltipFeedback}
      valid={valid}
    />
  )
  return floatingLabel ? (
    <CFormFloating className={floatingClassName}>
      {children}
      <CFormLabel htmlFor={id}>{label || floatingLabel}</CFormLabel>
      {text && <CFormText id={describedby}>{text}</CFormText>}
      <FormControlValidation />
    </CFormFloating>
  ) : (
    <>
      {label && <CFormLabel htmlFor={id}>{label}</CFormLabel>}
      {children}
      {text && <CFormText id={describedby}>{text}</CFormText>}
      <FormControlValidation />
    </>
  )
}

CFormControlWrapper.propTypes = {
  children: PropTypes.node,
  floatingClassName: PropTypes.string,
  floatingLabel: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  ...CFormControlValidation.propTypes,
}

CFormControlWrapper.displayName = 'CFormControlWrapper'
