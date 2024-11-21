import React, { HTMLAttributes } from 'react';
export interface COffcanvasBodyProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const COffcanvasBody: React.ForwardRefExoticComponent<COffcanvasBodyProps & React.RefAttributes<HTMLDivElement>>;
