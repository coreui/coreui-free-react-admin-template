import React, { HTMLAttributes } from 'react';
export interface CButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
    /**
     * Create a set of buttons that appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
     */
    vertical?: boolean;
}
export declare const CButtonGroup: React.ForwardRefExoticComponent<CButtonGroupProps & React.RefAttributes<HTMLDivElement>>;
