import React, { HTMLAttributes } from 'react';
export interface CCarouselItemProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * @ignore
     */
    direction?: string;
    /**
     * The amount of time to delay between automatically cycling an item.
     */
    interval?: boolean | number;
}
export declare const CCarouselItem: React.ForwardRefExoticComponent<CCarouselItemProps & React.RefAttributes<HTMLDivElement>>;
