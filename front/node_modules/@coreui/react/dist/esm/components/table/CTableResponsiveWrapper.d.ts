import { FC, HTMLAttributes } from 'react';
export interface CTableResponsiveWrapperProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Make any table responsive across all viewports or pick a maximum breakpoint with which to have a responsive table up to.
     */
    responsive?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}
export declare const CTableResponsiveWrapper: FC<CTableResponsiveWrapperProps>;
