import React, { ChangeEventHandler, forwardRef, InputHTMLAttributes } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { CFormControlWrapper, CFormControlWrapperProps } from './CFormControlWrapper'

type Option = {
  disabled?: boolean
  label?: string
  selected?: boolean
  value?: string
}

export interface CFormSelectProps
  extends CFormControlWrapperProps,
    Omit<InputHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string
  /**
   * Specifies the number of visible options in a drop-down list.
   */
  htmlSize?: number
  /**
   * Method called immediately after the `value` prop changes.
   */
  onChange?: ChangeEventHandler<HTMLSelectElement>
  /**
   * Options list of the select component. Available keys: `label`, `value`, `disabled`.
   * Examples:
   * - `options={[{ value: 'js', label: 'JavaScript' }, { value: 'html', label: 'HTML', disabled: true }]}`
   * - `options={['js', 'html']}`
   */
  options?: Option[] | string[]
  /**
   * Size the component small or large.
   */
  size?: 'sm' | 'lg'
  /**
   * The `value` attribute of component.
   *
   * @controllable onChange
   */
  value?: string | string[] | number
}

export const CFormSelect = forwardRef<HTMLSelectElement, CFormSelectProps>(
  (
    {
      children,
      className,
      feedback,
      feedbackInvalid,
      feedbackValid,
      floatingClassName,
      floatingLabel,
      htmlSize,
      id,
      invalid,
      label,
      options,
      size,
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
        <select
          id={id}
          className={classNames(
            'form-select',
            {
              [`form-select-${size}`]: size,
              'is-invalid': invalid,
              'is-valid': valid,
            },
            className,
          )}
          size={htmlSize}
          {...rest}
          ref={ref}
        >
          {options
            ? options.map((option, index) => {
                return (
                  <option
                    {...(typeof option === 'object' &&
                      option.disabled && { disabled: option.disabled })}
                    {...(typeof option === 'object' &&
                      option.value !== undefined && { value: option.value })}
                    key={index}
                  >
                    {typeof option === 'string' ? option : option.label}
                  </option>
                )
              })
            : children}
        </select>
      </CFormControlWrapper>
    )
  },
)

CFormSelect.propTypes = {
  className: PropTypes.string,
  htmlSize: PropTypes.number,
  options: PropTypes.array,
  ...CFormControlWrapper.propTypes,
}

CFormSelect.displayName = 'CFormSelect'
