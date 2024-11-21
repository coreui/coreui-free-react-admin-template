import React, { HTMLAttributes } from 'react';
export interface CAccordionHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CAccordionHeader: React.ForwardRefExoticComponent<CAccordionHeaderProps & React.RefAttributes<HTMLDivElement>>;
