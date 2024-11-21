import React, { HTMLAttributes } from 'react';
export interface CToastBodyProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CToastBody: React.ForwardRefExoticComponent<CToastBodyProps & React.RefAttributes<HTMLDivElement>>;
