import React, { HTMLAttributes } from 'react';
import { CProgressBarProps } from './CProgressBar';
export interface CProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, CProgressBarProps {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Sets the height of the component. If you set that value the inner `<CProgressBar>` will automatically resize accordingly.
     */
    height?: number;
    /**
     * A string of all className you want applied to the <CProgressBar/> component.
     *
     * @since 4.9.0
     */
    progressBarClassName?: string;
    /**
     * Makes progress bar thinner.
     */
    thin?: boolean;
    /**
     * The percent to progress the ProgressBar (out of 100).
     */
    value?: number;
    /**
     * Change the default color to white.
     */
    white?: boolean;
}
export declare const CProgress: React.ForwardRefExoticComponent<CProgressProps & React.RefAttributes<HTMLDivElement>>;
