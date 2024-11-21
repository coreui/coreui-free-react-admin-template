import React, { HTMLAttributes } from 'react';
export interface CTabContentProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CTabContent: React.ForwardRefExoticComponent<CTabContentProps & React.RefAttributes<HTMLDivElement>>;
