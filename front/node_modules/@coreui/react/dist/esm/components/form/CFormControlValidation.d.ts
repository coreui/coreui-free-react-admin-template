import { FC, ReactNode } from 'react';
export interface CFormControlValidationProps {
    /**
     * @ignore
     */
    describedby?: string;
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.2.0
     */
    feedback?: ReactNode | string;
    /**
     * Provide valuable, actionable feedback.
     *
     * @since 4.2.0
     */
    feedbackInvalid?: ReactNode | string;
    /**
     * Provide valuable, actionable invalid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.2.0
     */
    feedbackValid?: ReactNode | string;
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.2.0
     */
    floatingLabel?: ReactNode | string;
    /**
     * Set component validation state to invalid.
     */
    invalid?: boolean;
    /**
     * Display validation feedback in a styled tooltip.
     *
     * @since 4.2.0
     */
    tooltipFeedback?: boolean;
    /**
     * Set component validation state to valid.
     */
    valid?: boolean;
}
export declare const CFormControlValidation: FC<CFormControlValidationProps>;
