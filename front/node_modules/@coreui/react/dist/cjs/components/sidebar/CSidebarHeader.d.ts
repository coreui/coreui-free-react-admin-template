import React, { HTMLAttributes } from 'react';
export interface CSidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CSidebarHeader: React.ForwardRefExoticComponent<CSidebarHeaderProps & React.RefAttributes<HTMLDivElement>>;
