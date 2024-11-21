import React, { HTMLAttributes } from 'react';
export interface CAccordionProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The active item key.
     */
    activeItemKey?: number | string;
    /**
     * Make accordion items stay open when another item is opened
     */
    alwaysOpen?: boolean;
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Removes the default background-color, some borders, and some rounded corners to render accordions edge-to-edge with their parent container.
     */
    flush?: boolean;
}
export interface CAccordionContextProps {
    _activeItemKey?: number | string;
    alwaysOpen?: boolean;
    setActiveKey: React.Dispatch<React.SetStateAction<number | string | undefined>>;
}
export declare const CAccordionContext: React.Context<CAccordionContextProps>;
export declare const CAccordion: React.ForwardRefExoticComponent<CAccordionProps & React.RefAttributes<HTMLDivElement>>;
