import React, { HTMLAttributes } from 'react';
export interface CDropdownDividerProps extends HTMLAttributes<HTMLHRElement> {
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
}
export declare const CDropdownDivider: React.ForwardRefExoticComponent<CDropdownDividerProps & React.RefAttributes<HTMLHRElement>>;
