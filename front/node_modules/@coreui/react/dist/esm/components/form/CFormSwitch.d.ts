import React, { InputHTMLAttributes, ReactNode } from 'react';
export interface CFormSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * The id global attribute defines an identifier (ID) that must be unique in the whole document.
     */
    id?: string;
    /**
     * Set component validation state to invalid.
     */
    invalid?: boolean;
    /**
     * The element represents a caption for a component.
     */
    label?: string | ReactNode;
    /**
     * Put switch on the opposite side.
     *
     * @sinve 4.7.0
     */
    reverse?: boolean;
    /**
     * Size the component large or extra large. Works only with `switch`.
     */
    size?: 'lg' | 'xl';
    /**
     * Specifies the type of component.
     */
    type?: 'checkbox' | 'radio';
    /**
     * Set component validation state to valid.
     */
    valid?: boolean;
}
export declare const CFormSwitch: React.ForwardRefExoticComponent<CFormSwitchProps & React.RefAttributes<HTMLInputElement>>;
