import React, { HTMLAttributes } from 'react';
export interface CAccordionItemContextProps {
    setVisible: (a: boolean) => void;
    visible?: boolean;
}
export declare const CAccordionItemContext: React.Context<CAccordionItemContextProps>;
export interface CAccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * Item key.
     */
    itemKey?: number | string;
}
export declare const CAccordionItem: React.ForwardRefExoticComponent<CAccordionItemProps & React.RefAttributes<HTMLDivElement>>;
