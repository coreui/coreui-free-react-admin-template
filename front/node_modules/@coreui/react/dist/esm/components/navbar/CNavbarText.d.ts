import React, { HTMLAttributes } from 'react';
export interface CNavbarTextProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CNavbarText: React.ForwardRefExoticComponent<CNavbarTextProps & React.RefAttributes<HTMLSpanElement>>;
