import React, { HTMLAttributes, ReactElement } from 'react';
export interface CToasterProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Describes the placement of your component.
     *
     * @type 'top-start' | 'top' | 'top-end' | 'middle-start' | 'middle' | 'middle-end' | 'bottom-start' | 'bottom' | 'bottom-end' | string
     */
    placement?: 'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end' | string;
    /**
     * Adds new `CToast` to `CToaster`.
     */
    push?: ReactElement;
}
export declare const CToaster: React.ForwardRefExoticComponent<CToasterProps & React.RefAttributes<HTMLDivElement>>;
