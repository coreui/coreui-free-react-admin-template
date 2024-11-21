import React, { HTMLAttributes } from 'react';
export interface CSidebarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets if the color of text should be colored for a light or dark dark background.
     *
     * @type 'dark' | 'light'
     */
    colorScheme?: 'dark' | 'light';
    /**
     * Make sidebar narrow.
     */
    narrow?: boolean;
    /**
     * Callback fired when the component requests to be hidden.
     */
    onHide?: () => void;
    /**
     * Callback fired when the component requests to be shown.
     */
    onShow?: () => void;
    /**
     * Event emitted after visibility of component changed.
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * Set sidebar to overlaid variant.
     */
    overlaid?: boolean;
    /**
     * Components placement, there’s no default placement.
     * @type 'start' | 'end'
     */
    placement?: 'start' | 'end';
    /**
     * Place sidebar in non-static positions.
     */
    position?: 'fixed' | 'sticky';
    /**
     * Size the component small, large, or extra large.
     */
    size?: 'sm' | 'lg' | 'xl';
    /**
     * Expand narrowed sidebar on hover.
     */
    unfoldable?: boolean;
    /**
     * Toggle the visibility of sidebar component.
     */
    visible?: boolean;
}
export declare const CSidebar: React.ForwardRefExoticComponent<CSidebarProps & React.RefAttributes<HTMLDivElement>>;
