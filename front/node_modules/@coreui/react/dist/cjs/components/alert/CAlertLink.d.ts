import React, { AnchorHTMLAttributes } from 'react';
export interface CAlertLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
}
export declare const CAlertLink: React.ForwardRefExoticComponent<CAlertLinkProps & React.RefAttributes<HTMLAnchorElement>>;
