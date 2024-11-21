import * as React from 'react';
import type { ReactNode, MutableRefObject } from 'react';
import SimpleBarCore from 'simplebar-core';
import type { SimpleBarOptions } from 'simplebar-core';
type RenderFunc = (props: {
    scrollableNodeRef: MutableRefObject<HTMLElement | undefined>;
    scrollableNodeProps: {
        className: string;
        ref: MutableRefObject<HTMLElement | undefined>;
    };
    contentNodeRef: MutableRefObject<HTMLElement | undefined>;
    contentNodeProps: {
        className: string;
        ref: MutableRefObject<HTMLElement | undefined>;
    };
}) => ReactNode;
export interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>, SimpleBarOptions {
    children?: ReactNode | RenderFunc;
    scrollableNodeProps?: {
        ref?: any;
        className?: string;
        [key: string]: any;
    };
}
declare const SimpleBar: React.ForwardRefExoticComponent<Props & React.RefAttributes<SimpleBarCore | null>>;
export default SimpleBar;
