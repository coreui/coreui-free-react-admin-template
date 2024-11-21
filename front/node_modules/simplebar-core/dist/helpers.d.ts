import type { SimpleBarOptions } from './index';
export declare function getElementWindow(element: Element): Window & typeof globalThis;
export declare function getElementDocument(element: Element): Document;
export declare const getOptions: (obj: any) => SimpleBarOptions;
export declare function addClasses(el: HTMLElement | null, classes: string): void;
export declare function removeClasses(el: HTMLElement | null, classes: string): void;
export declare function classNamesToQuery(classNames: string): string;
export declare const canUseDOM: boolean;
