import React, { HTMLAttributes } from 'react';
export interface CHeaderTogglerProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CHeaderToggler: React.ForwardRefExoticComponent<CHeaderTogglerProps & React.RefAttributes<HTMLButtonElement>>;
