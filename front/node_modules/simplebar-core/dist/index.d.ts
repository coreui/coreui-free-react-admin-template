/// <reference types="lodash" />
import type { DebouncedFunc } from 'lodash-es';
import * as helpers from './helpers';
interface Options {
    forceVisible: boolean | Axis;
    clickOnTrack: boolean;
    scrollbarMinSize: number;
    scrollbarMaxSize: number;
    classNames: Partial<ClassNames>;
    ariaLabel: string;
    tabIndex: number;
    scrollableNode: HTMLElement | null;
    contentNode: HTMLElement | null;
    autoHide: boolean;
}
export interface SimpleBarOptions extends Partial<Options> {
}
type ClassNames = {
    contentEl: string;
    contentWrapper: string;
    offset: string;
    mask: string;
    wrapper: string;
    placeholder: string;
    scrollbar: string;
    track: string;
    heightAutoObserverWrapperEl: string;
    heightAutoObserverEl: string;
    visible: string;
    horizontal: string;
    vertical: string;
    hover: string;
    dragging: string;
    scrolling: string;
    scrollable: string;
    mouseEntered: string;
};
type Axis = 'x' | 'y';
type AxisProps = {
    scrollOffsetAttr: 'scrollLeft' | 'scrollTop';
    sizeAttr: 'width' | 'height';
    scrollSizeAttr: 'scrollWidth' | 'scrollHeight';
    offsetSizeAttr: 'offsetWidth' | 'offsetHeight';
    offsetAttr: 'left' | 'top';
    overflowAttr: 'overflowX' | 'overflowY';
    dragOffset: number;
    isOverflowing: boolean;
    forceVisible: boolean;
    track: {
        size: any;
        el: HTMLElement | null;
        rect: DOMRect | null;
        isVisible: boolean;
    };
    scrollbar: {
        size: any;
        el: HTMLElement | null;
        rect: DOMRect | null;
        isVisible: boolean;
    };
};
type RtlHelpers = {
    isScrollOriginAtZero: boolean;
    isScrollingToNegative: boolean;
} | null;
type DefaultOptions = Options & typeof SimpleBarCore.defaultOptions;
export default class SimpleBarCore {
    el: HTMLElement;
    options: DefaultOptions;
    classNames: ClassNames;
    axis: {
        x: AxisProps;
        y: AxisProps;
    };
    draggedAxis?: Axis;
    removePreventClickId: null | number;
    minScrollbarWidth: number;
    stopScrollDelay: number;
    isScrolling: boolean;
    isMouseEntering: boolean;
    isDragging: boolean;
    scrollXTicking: boolean;
    scrollYTicking: boolean;
    wrapperEl: HTMLElement | null;
    contentWrapperEl: HTMLElement | null;
    contentEl: HTMLElement | null;
    offsetEl: HTMLElement | null;
    maskEl: HTMLElement | null;
    placeholderEl: HTMLElement | null;
    heightAutoObserverWrapperEl: HTMLElement | null;
    heightAutoObserverEl: HTMLElement | null;
    rtlHelpers: RtlHelpers;
    scrollbarWidth: number;
    resizeObserver: ResizeObserver | null;
    mutationObserver: MutationObserver | null;
    elStyles: CSSStyleDeclaration | null;
    isRtl: boolean | null;
    mouseX: number;
    mouseY: number;
    onMouseMove: DebouncedFunc<any> | (() => void);
    onWindowResize: DebouncedFunc<any> | (() => void);
    onStopScrolling: DebouncedFunc<any> | (() => void);
    onMouseEntered: DebouncedFunc<any> | (() => void);
    static rtlHelpers: RtlHelpers;
    static defaultOptions: Options;
    constructor(element: HTMLElement, options?: Partial<Options>);
    /**
     * Static functions
     */
    static getOptions: (obj: any) => SimpleBarOptions;
    static helpers: typeof helpers;
    /**
     * Helper to fix browsers inconsistency on RTL:
     *  - Firefox inverts the scrollbar initial position
     *  - IE11 inverts both scrollbar position and scrolling offset
     * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
     */
    static getRtlHelpers(): {
        isScrollOriginAtZero: boolean;
        isScrollingToNegative: boolean;
    } | null;
    getScrollbarWidth(): number;
    static getOffset(el: Element): {
        top: number;
        left: number;
    };
    init(): void;
    initDOM(): void;
    initListeners(): void;
    recalculate(): void;
    /**
     * Calculate scrollbar size
     */
    getScrollbarSize(axis?: Axis): number;
    positionScrollbar(axis?: Axis): void;
    toggleTrackVisibility(axis?: Axis): void;
    showScrollbar(axis?: Axis): void;
    hideScrollbar(axis?: Axis): void;
    hideNativeScrollbar(): void;
    /**
     * On scroll event handling
     */
    onScroll: () => void;
    scrollX: () => void;
    scrollY: () => void;
    _onStopScrolling: () => void;
    onMouseEnter: () => void;
    _onMouseEntered: () => void;
    _onMouseMove: (e: any) => void;
    onMouseMoveForAxis(axis?: Axis): void;
    onMouseLeave: () => void;
    onMouseLeaveForAxis(axis?: Axis): void;
    _onWindowResize: () => void;
    onPointerEvent: (e: any) => void;
    /**
     * on scrollbar handle drag movement starts
     */
    onDragStart(e: any, axis?: Axis): void;
    /**
     * Drag scrollbar handle
     */
    drag: (e: any) => void;
    /**
     * End scroll handle drag
     */
    onEndDrag: (e: any) => void;
    /**
     * Handler to ignore click events during drag
     */
    preventClick: (e: any) => void;
    onTrackClick(e: any, axis?: Axis): void;
    /**
     * Getter for content element
     */
    getContentElement(): HTMLElement | null;
    /**
     * Getter for original scrolling element
     */
    getScrollElement(): HTMLElement | null;
    removeListeners(): void;
    /**
     * Remove all listeners from DOM nodes
     */
    unMount(): void;
    /**
     * Check if mouse is within bounds
     */
    isWithinBounds(bbox: DOMRect): boolean;
    /**
     * Find element children matches query
     */
    findChild(el: any, query: any): any;
}
export {};
