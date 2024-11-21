import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import { CFormControlWrapperProps } from './CFormControlWrapper';
export interface CFormInputProps extends CFormControlWrapperProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Delay onChange event while typing. If set to true onChange event will be delayed 500ms, you can also provide the number of milliseconds you want to delay the onChange event.
     */
    delay?: boolean | number;
    /**
     * Toggle the disabled state for the component.
     */
    disabled?: boolean;
    /**
     * Method called immediately after the `value` prop changes.
     */
    onChange?: ChangeEventHandler<HTMLInputElement>;
    /**
     * Render the component styled as plain text. Removes the default form field styling and preserve the correct margin and padding. Recommend to use only along side `readonly`.
     */
    plainText?: boolean;
    /**
     * Toggle the readonly state for the component.
     */
    readOnly?: boolean;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
    /**
     * Specifies the type of component.
     */
    type?: 'color' | 'file' | 'text' | string;
    /**
     * The `value` attribute of component.
     *
     * @controllable onChange
     * */
    value?: string | string[] | number;
}
export declare const CFormInput: React.ForwardRefExoticComponent<CFormInputProps & React.RefAttributes<HTMLInputElement>>;
