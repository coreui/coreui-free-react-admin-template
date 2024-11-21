import React, { HTMLAttributes } from 'react';
export interface CCarouselProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * index of the active item.
     */
    activeIndex?: number;
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Adding in the previous and next controls.
     */
    controls?: boolean;
    /**
     * Add darker controls, indicators, and captions.
     */
    dark?: boolean;
    /**
     * The amount of time to delay between automatically cycling an item. If false, carousel will not automatically cycle.
     */
    interval?: boolean | number;
    /**
     * Adding indicators at the bottom of the carousel for each item.
     */
    indicators?: boolean;
    /**
     * Callback fired when a slide transition end.
     */
    onSlid?: (active: number, direction: string) => void;
    /**
     * Callback fired when a slide transition starts.
     */
    onSlide?: (active: number, direction: string) => void;
    /**
     * If set to 'hover', pauses the cycling of the carousel on mouseenter and resumes the cycling of the carousel on mouseleave. If set to false, hovering over the carousel won't pause it.
     */
    pause?: boolean | 'hover';
    /**
     * Set whether the carousel should support left/right swipe interactions on touchscreen devices.
     *
     * @since 4.5.0
     */
    touch?: boolean;
    /**
     * Set type of the transition.
     */
    transition?: 'slide' | 'crossfade';
    /**
     * Set whether the carousel should cycle continuously or have hard stops.
     */
    wrap?: boolean;
}
export interface ContextProps {
    setAnimating: (a: boolean) => void;
    setCustomInterval: (a: boolean | number) => void;
}
export declare const CCarouselContext: React.Context<ContextProps>;
export declare const CCarousel: React.ForwardRefExoticComponent<CCarouselProps & React.RefAttributes<HTMLDivElement>>;
