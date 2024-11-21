import React, { HTMLAttributes } from 'react';
export interface CModalContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CModalContent: React.ForwardRefExoticComponent<CModalContentProps & React.RefAttributes<HTMLDivElement>>;
