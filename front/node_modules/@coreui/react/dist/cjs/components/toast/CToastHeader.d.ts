import React, { HTMLAttributes } from 'react';
export interface CToastHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Automatically add a close button to the header.
     */
    closeButton?: boolean;
}
export declare const CToastHeader: React.ForwardRefExoticComponent<CToastHeaderProps & React.RefAttributes<HTMLDivElement>>;
