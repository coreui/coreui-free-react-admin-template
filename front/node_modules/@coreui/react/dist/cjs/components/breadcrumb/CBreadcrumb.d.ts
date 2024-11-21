import React, { HTMLAttributes } from 'react';
export interface CBreadcrumbProps extends HTMLAttributes<HTMLOListElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CBreadcrumb: React.ForwardRefExoticComponent<CBreadcrumbProps & React.RefAttributes<HTMLOListElement>>;
