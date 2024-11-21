import React, { HTMLAttributes } from 'react';
export interface CProgressStackedProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export interface CProgressStackedContextProps {
    stacked?: boolean;
}
export declare const CProgressStackedContext: React.Context<CProgressStackedContextProps>;
export declare const CProgressStacked: React.ForwardRefExoticComponent<CProgressStackedProps & React.RefAttributes<HTMLDivElement>>;
