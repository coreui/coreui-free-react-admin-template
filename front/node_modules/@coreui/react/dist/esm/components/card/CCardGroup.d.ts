import React, { HTMLAttributes } from 'react';
export interface CCardGroupProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CCardGroup: React.ForwardRefExoticComponent<CCardGroupProps & React.RefAttributes<HTMLDivElement>>;
