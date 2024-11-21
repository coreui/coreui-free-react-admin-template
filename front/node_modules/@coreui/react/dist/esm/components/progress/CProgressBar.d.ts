import React, { HTMLAttributes } from 'react';
import type { Colors } from '../../types';
export interface CProgressBarProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Use to animate the stripes right to left via CSS3 animations.
     */
    animated?: boolean;
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * The percent to progress the ProgressBar.
     */
    value?: number;
    /**
     * Set the progress bar variant to optional striped.
     */
    variant?: 'striped';
}
export declare const CProgressBar: React.ForwardRefExoticComponent<CProgressBarProps & React.RefAttributes<HTMLDivElement>>;
