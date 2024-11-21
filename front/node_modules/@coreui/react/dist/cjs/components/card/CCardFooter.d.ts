import React, { HTMLAttributes } from 'react';
export interface CCardFooterProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CCardFooter: React.ForwardRefExoticComponent<CCardFooterProps & React.RefAttributes<HTMLDivElement>>;
