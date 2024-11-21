import React, { HTMLAttributes } from 'react';
export interface CAccordionButtonProps extends HTMLAttributes<HTMLButtonElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CAccordionButton: React.ForwardRefExoticComponent<CAccordionButtonProps & React.RefAttributes<HTMLButtonElement>>;
