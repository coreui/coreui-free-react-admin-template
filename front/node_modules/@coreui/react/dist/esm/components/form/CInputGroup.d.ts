import React, { HTMLAttributes } from 'react';
export interface CInputGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
}
export declare const CInputGroup: React.ForwardRefExoticComponent<CInputGroupProps & React.RefAttributes<HTMLDivElement>>;
