import React, { HTMLAttributes } from 'react';
export interface CContainerProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Set container 100% wide until small breakpoint.
     */
    sm?: boolean;
    /**
     * Set container 100% wide until medium breakpoint.
     */
    md?: boolean;
    /**
     * Set container 100% wide until large breakpoint.
     */
    lg?: boolean;
    /**
     * Set container 100% wide until X-large breakpoint.
     */
    xl?: boolean;
    /**
     * Set container 100% wide until XX-large breakpoint.
     */
    xxl?: boolean;
    /**
     * Set container 100% wide, spanning the entire width of the viewport.
     */
    fluid?: boolean;
}
export declare const CContainer: React.ForwardRefExoticComponent<CContainerProps & React.RefAttributes<HTMLDivElement>>;
