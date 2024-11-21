import React, { HTMLAttributes } from 'react';
type Span = 'auto' | number | string | boolean | null;
type BPObject = {
    span?: Span;
    offset?: number | string | null;
    order?: 'first' | 'last' | number | string | null;
};
type Col = Span | BPObject;
export interface CColProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * A string of all className you want applied to the base component.
     */
    className?: string;
    /**
     * The number of columns/offset/order on extra small devices (<576px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    xs?: Col;
    /**
     * The number of columns/offset/order on small devices (<768px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    sm?: Col;
    /**
     * The number of columns/offset/order on medium devices (<992px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    md?: Col;
    /**
     * The number of columns/offset/order on large devices (<1200px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    lg?: Col;
    /**
     * The number of columns/offset/order on X-Large devices (<1400px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    xl?: Col;
    /**
     * The number of columns/offset/order on XX-Large devices (≥1400px).
     *
     * @type { 'auto' | number | string | boolean | { span: 'auto' | number | string | boolean } | { offset: number | string } | { order: 'first' | 'last' | number | string }}
     */
    xxl?: Col;
}
export declare const CCol: React.ForwardRefExoticComponent<CColProps & React.RefAttributes<HTMLDivElement>>;
export {};
