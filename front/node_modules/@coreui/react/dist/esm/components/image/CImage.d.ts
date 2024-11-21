import React, { ImgHTMLAttributes } from 'react';
export interface CImageProps extends ImgHTMLAttributes<HTMLOrSVGImageElement> {
    /**
     * Set the horizontal aligment.
     */
    align?: 'start' | 'center' | 'end';
    /**
     * A string of all className you want applied to the component.
     */
    className?: string;
    /**
     * Make image responsive.
     */
    fluid?: boolean;
    /**
     * Make image rounded.
     */
    rounded?: boolean;
    /**
     * Give an image a rounded 1px border appearance.
     */
    thumbnail?: boolean;
}
export declare const CImage: React.ForwardRefExoticComponent<CImageProps & React.RefAttributes<HTMLImageElement>>;
