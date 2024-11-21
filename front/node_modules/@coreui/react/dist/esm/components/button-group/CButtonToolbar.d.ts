import React, { HTMLAttributes } from 'react';
export interface CButtonToolbarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CButtonToolbar: React.ForwardRefExoticComponent<CButtonToolbarProps & React.RefAttributes<HTMLDivElement>>;
