import { FC, ReactNode } from 'react';
import { CFormControlValidationProps } from './CFormControlValidation';
export interface CFormControlWrapperProps extends CFormControlValidationProps {
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * A string of all className you want applied to the floating label wrapper.
     *
     * @since 4.5.0
     */
    floatingClassName?: string;
    /**
     * Provide valuable, actionable valid feedback when using standard HTML form validation which applied two CSS pseudo-classes, `:invalid` and `:valid`.
     *
     * @since 4.2.0
     */
    floatingLabel?: ReactNode | string;
    /**
     * @ignore
     */
    id?: string;
    /**
     * Add a caption for a component.
     *
     * @since 4.2.0
     */
    label?: ReactNode | string;
    /**
     * Add helper text to the component.
     *
     * @since 4.2.0
     */
    text?: ReactNode | string;
}
export declare const CFormControlWrapper: FC<CFormControlWrapperProps>;
