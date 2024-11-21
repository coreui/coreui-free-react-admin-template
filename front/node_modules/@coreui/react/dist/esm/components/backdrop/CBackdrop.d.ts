import React, { HTMLAttributes } from 'react';
export interface CBackdropProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Toggle the visibility of modal component.
     */
    visible?: boolean;
}
export declare const CBackdrop: React.ForwardRefExoticComponent<CBackdropProps & React.RefAttributes<HTMLDivElement>>;
