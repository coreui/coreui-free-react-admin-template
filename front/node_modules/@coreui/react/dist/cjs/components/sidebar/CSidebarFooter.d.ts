import React, { HTMLAttributes } from 'react';
export interface CSidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CSidebarFooter: React.ForwardRefExoticComponent<CSidebarFooterProps & React.RefAttributes<HTMLDivElement>>;
