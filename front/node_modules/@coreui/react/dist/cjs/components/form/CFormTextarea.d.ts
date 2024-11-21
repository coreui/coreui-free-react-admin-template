import React, { ChangeEventHandler, TextareaHTMLAttributes } from 'react';
import { CFormControlWrapperProps } from './CFormControlWrapper';
export interface CFormTextareaProps extends CFormControlWrapperProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * Method called immediately after the `value` prop changes.
     */
    onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText?: boolean;
    /**
     * Toggle the readonly state for the component.
     */
    readOnly?: boolean;
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value?: string | string[] | number;
}
export declare const CFormTextarea: React.ForwardRefExoticComponent<CFormTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
