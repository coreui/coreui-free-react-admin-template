import React, { HTMLAttributes, ReactNode } from 'react';
import type { Colors } from '../../types';
export interface CWidgetStatsFProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
     * Footer node for your component.
     */
    footer?: string | ReactNode;
    /**
     * Icon node for your component.
     */
    icon?: string | ReactNode;
    /**
     * Set padding of your component.
     */
    padding?: boolean;
    /**
     * Title node for your component.
     */
    title?: string | ReactNode;
    /**
     * Value node for your component.
     */
    value?: string | number | ReactNode;
}
export declare const CWidgetStatsF: React.ForwardRefExoticComponent<CWidgetStatsFProps & React.RefAttributes<HTMLDivElement>>;
