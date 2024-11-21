import React, { HTMLAttributes } from 'react';
export interface CPaginationProps extends HTMLAttributes<HTMLUListElement> {
    /**
     * Set the alignment of pagination components.
     */
    align?: 'start' | 'center' | 'end';
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Size the component small or large.
     */
    size?: 'sm' | 'lg';
}
export declare const CPagination: React.ForwardRefExoticComponent<CPaginationProps & React.RefAttributes<HTMLUListElement>>;
