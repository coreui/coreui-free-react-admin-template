import React, { HTMLAttributes } from 'react';
export interface CModalFooterProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CModalFooter: React.ForwardRefExoticComponent<CModalFooterProps & React.RefAttributes<HTMLDivElement>>;
