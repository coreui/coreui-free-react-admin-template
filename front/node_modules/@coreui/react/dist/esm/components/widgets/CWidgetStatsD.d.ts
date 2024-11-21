import React, { HTMLAttributes, ReactNode } from 'react';
import type { Colors } from '../../types';
type Value = {
    title?: string | ReactNode;
    value?: number | string | ReactNode;
};
export interface CWidgetStatsDProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Chart node for your component.
     */
    chart?: string | ReactNode;
    /**
     * Sets the color context of the component to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    color?: Colors;
    /**
     * Icon node for your component.
     */
    icon?: string | ReactNode;
    /**
     * Values and titles for your component.
     */
    values?: Value[];
}
export declare const CWidgetStatsD: React.ForwardRefExoticComponent<CWidgetStatsDProps & React.RefAttributes<HTMLDivElement>>;
export {};
