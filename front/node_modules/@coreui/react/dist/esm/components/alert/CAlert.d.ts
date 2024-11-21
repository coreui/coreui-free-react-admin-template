import React, { HTMLAttributes } from 'react';
import type { Colors } from '../../types';
export interface CAlertProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color: Colors;
    /**
     * Optionally add a close button to alert and allow it to self dismiss.
     */
    dismissible?: boolean;
    /**
     * Callback fired when the component requests to be closed.
     */
    onClose?: () => void;
    /**
     * Set the alert variant to a solid.
     */
    variant?: 'solid' | string;
    /**
     * Toggle the visibility of component.
     */
    visible?: boolean;
}
export declare const CAlert: React.ForwardRefExoticComponent<CAlertProps & React.RefAttributes<HTMLDivElement>>;
