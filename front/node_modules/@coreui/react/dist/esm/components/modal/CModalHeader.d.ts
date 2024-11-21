import React, { HTMLAttributes } from 'react';
export interface CModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Add a close button component to the header.
     */
    closeButton?: boolean;
}
export declare const CModalHeader: React.ForwardRefExoticComponent<CModalHeaderProps & React.RefAttributes<HTMLDivElement>>;
