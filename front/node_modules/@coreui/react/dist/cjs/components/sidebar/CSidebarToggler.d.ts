import React, { HTMLAttributes } from 'react';
export interface CSidebarTogglerProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CSidebarToggler: React.ForwardRefExoticComponent<CSidebarTogglerProps & React.RefAttributes<HTMLButtonElement>>;
