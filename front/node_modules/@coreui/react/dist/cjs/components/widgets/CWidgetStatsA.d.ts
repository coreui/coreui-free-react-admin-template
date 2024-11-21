import React, { HTMLAttributes, ReactNode } from 'react';
import type { Colors } from '../../types';
export interface CWidgetStatsAProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    /**
     * Action node for your component.
     */
    action?: ReactNode;
    /**
     * Chart node for your component.
     */
    chart?: string | ReactNode;
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
    /**
     * Title node for your component.
     */
    title?: string | ReactNode;
    /**
     * Value node for your component.
     */
    value?: string | number | ReactNode;
}
export declare const CWidgetStatsA: React.ForwardRefExoticComponent<CWidgetStatsAProps & React.RefAttributes<HTMLDivElement>>;
