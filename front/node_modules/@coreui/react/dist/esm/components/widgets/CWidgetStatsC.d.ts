import React, { HTMLAttributes, ReactNode } from 'react';
import { CProgressProps } from '../progress/CProgress';
import type { Colors } from '../../types';
export interface CWidgetStatsCProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
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
     * Icon node for your component.
     */
    icon?: string | ReactNode;
    /**
     * Colors have been inverted from their default dark shade.
     */
    inverse?: boolean;
    /**
     * Sets the color context of the progress bar to one of CoreUI’s themed colors.
     *
     * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
     */
    progress?: CProgressProps;
    /**
     * Title node for your component.
     */
    title?: string | ReactNode;
    /**
     * Value node for your component.
     */
    value?: string | number | ReactNode;
}
export declare const CWidgetStatsC: React.ForwardRefExoticComponent<CWidgetStatsCProps & React.RefAttributes<HTMLDivElement>>;
