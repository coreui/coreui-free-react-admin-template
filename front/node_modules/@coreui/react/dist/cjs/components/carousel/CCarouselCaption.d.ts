import React, { HTMLAttributes } from 'react';
export interface CCarouselCaptionProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CCarouselCaption: React.ForwardRefExoticComponent<CCarouselCaptionProps & React.RefAttributes<HTMLDivElement>>;
