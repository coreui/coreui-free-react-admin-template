import React, { HTMLAttributes } from 'react';
export interface CHeaderTextProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CHeaderText: React.ForwardRefExoticComponent<CHeaderTextProps & React.RefAttributes<HTMLSpanElement>>;
