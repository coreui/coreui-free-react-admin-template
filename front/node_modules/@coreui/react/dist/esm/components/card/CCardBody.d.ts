import React, { HTMLAttributes } from 'react';
export interface CCardBodyProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CCardBody: React.ForwardRefExoticComponent<CCardBodyProps & React.RefAttributes<HTMLDivElement>>;
