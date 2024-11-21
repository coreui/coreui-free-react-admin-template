import React, { HTMLAttributes } from 'react';
export interface CHeaderDividerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CHeaderDivider: React.ForwardRefExoticComponent<CHeaderDividerProps & React.RefAttributes<HTMLDivElement>>;
