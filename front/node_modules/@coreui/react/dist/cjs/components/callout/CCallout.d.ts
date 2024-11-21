import React, { HTMLAttributes } from 'react';
import type { Colors } from '../../types';
export interface CCalloutProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
}
export declare const CCallout: React.ForwardRefExoticComponent<CCalloutProps & React.RefAttributes<HTMLDivElement>>;
