import React, { HTMLAttributes } from 'react';
export interface CAccordionBodyProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CAccordionBody: React.ForwardRefExoticComponent<CAccordionBodyProps & React.RefAttributes<HTMLDivElement>>;
