import React, { HTMLAttributes } from 'react';
export interface CNavbarTogglerProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CNavbarToggler: React.ForwardRefExoticComponent<CNavbarTogglerProps & React.RefAttributes<HTMLButtonElement>>;
