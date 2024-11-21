import React, { HTMLAttributes } from 'react';
import type { Colors } from '../../types';
export interface CTableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /**
     * Highlight a table row or cell..
     */
    active?: boolean;
    /**
     * Set the vertical aligment.
     */
    align?: 'bottom' | 'middle' | 'top' | string;
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
}
export declare const CTableRow: React.ForwardRefExoticComponent<CTableRowProps & React.RefAttributes<HTMLTableRowElement>>;
