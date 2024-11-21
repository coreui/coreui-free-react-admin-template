import React, { HTMLAttributes } from 'react';
export interface CFormFloatingProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CFormFloating: React.ForwardRefExoticComponent<CFormFloatingProps & React.RefAttributes<HTMLDivElement>>;
