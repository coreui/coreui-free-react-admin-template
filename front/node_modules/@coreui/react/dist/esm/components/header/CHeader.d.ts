import React, { HTMLAttributes } from 'react';
export interface CHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Defines optional container wrapping children elements.
     */
    container?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'fluid';
    /**
     * Place header in non-static positions.
     */
    position?: 'fixed' | 'sticky';
}
export declare const CHeader: React.ForwardRefExoticComponent<CHeaderProps & React.RefAttributes<HTMLDivElement>>;
