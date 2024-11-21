import React, { HTMLAttributes } from 'react';
export interface CModalDialogProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Align the modal in the center or top of the screen.
     */
    alignment?: 'top' | 'center';
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Set modal to covers the entire user viewport.
     */
    fullscreen?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    /**
     * Does the modal dialog itself scroll, or does the whole dialog scroll within the window.
     */
    scrollable?: boolean;
    /**
     * Size the component small, large, or extra large.
     */
    size?: 'sm' | 'lg' | 'xl';
}
export declare const CModalDialog: React.ForwardRefExoticComponent<CModalDialogProps & React.RefAttributes<HTMLDivElement>>;
