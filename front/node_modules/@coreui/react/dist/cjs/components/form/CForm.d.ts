import React, { FormHTMLAttributes } from 'react';
export interface CFormProps extends FormHTMLAttributes<HTMLFormElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Mark a form as validated. If you set it `true`, all validation styles will be applied to the forms component.
     */
    validated?: boolean;
}
export declare const CForm: React.ForwardRefExoticComponent<CFormProps & React.RefAttributes<HTMLFormElement>>;
