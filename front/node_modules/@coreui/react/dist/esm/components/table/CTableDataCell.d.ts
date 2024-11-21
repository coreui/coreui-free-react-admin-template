import React, { TdHTMLAttributes, ThHTMLAttributes } from 'react';
import type { Colors } from '../../types';
export interface CTableDataCellProps extends Omit<TdHTMLAttributes<HTMLTableCellElement>, 'align'>, Omit<ThHTMLAttributes<HTMLTableCellElement>, 'align'> {
    /**
     * Highlight a table row or cell.
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
    /**
     * @ignore
     */
    colSpan?: number;
}
export declare const CTableDataCell: React.ForwardRefExoticComponent<CTableDataCellProps & React.RefAttributes<HTMLTableCellElement>>;
