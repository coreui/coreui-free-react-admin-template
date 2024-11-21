import React, { HTMLAttributes } from 'react';
export interface CCollapseProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Set horizontal collapsing to transition the width instead of height.
     */
    horizontal?: boolean;
    /**
     * Callback fired when the component requests to be hidden.
     */
    onHide?: () => void;
    /**
     * Callback fired when the component requests to be shown.
     */
    onShow?: () => void;
    /**
     * Toggle the visibility of component.
     */
    visible?: boolean;
}
export declare const CCollapse: React.ForwardRefExoticComponent<CCollapseProps & React.RefAttributes<HTMLDivElement>>;
