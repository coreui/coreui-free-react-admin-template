import React, { LabelHTMLAttributes } from 'react';
export interface CFormLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * A string of all className you want to be applied to the component, and override standard className value.
     */
    customClassName?: string;
}
export declare const CFormLabel: React.ForwardRefExoticComponent<CFormLabelProps & React.RefAttributes<HTMLLabelElement>>;
