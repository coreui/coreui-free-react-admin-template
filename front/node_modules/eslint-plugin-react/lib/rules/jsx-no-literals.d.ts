export type RawElementConfigProperties = {
    noStrings?: boolean;
    allowedStrings?: string[];
    ignoreProps?: boolean;
    noAttributeStrings?: boolean;
};
export type RawOverrideConfigProperties = {
    allowElement?: boolean;
    applyToNestedElements?: boolean;
};
export type RawElementConfig = {
    noStrings?: boolean;
    allowedStrings?: string[];
    ignoreProps?: boolean;
    noAttributeStrings?: boolean;
};
export type RawOverrideConfig = {
    noStrings?: boolean;
    allowedStrings?: string[];
    ignoreProps?: boolean;
    noAttributeStrings?: boolean;
};
export type RawElementOverrides = {
    elementOverrides?: Record<string, RawOverrideConfig>;
};
/**
 * ----------------------------------------------------------------------
 */
export type RawConfig = RawElementConfigProperties & RawElementOverrides;
export type ElementConfigType = {
    type: 'element';
};
export type ElementConfigProperties = {
    noStrings: boolean;
    allowedStrings: Set<string>;
    ignoreProps: boolean;
    noAttributeStrings: boolean;
};
export type OverrideConfigProperties = {
    type: 'override';
    name: string;
    allowElement: boolean;
    applyToNestedElements: boolean;
};
export type ElementConfig = ElementConfigType & ElementConfigProperties;
export type OverrideConfig = OverrideConfigProperties & ElementConfigProperties;
export type ElementOverrides = {
    elementOverrides: Record<string, OverrideConfig>;
};
export type Config = ElementConfigType & ElementConfigProperties & ElementOverrides;
export type ResolvedConfig = (OverrideConfigProperties & ElementConfigProperties) | (ElementConfigType & ElementConfigProperties & ElementOverrides);
export declare const meta: import('eslint').Rule.RuleModule["meta"];
export declare function create(context: any): (false & {
    Literal(node: any): void;
    JSXAttribute(node: any): void;
    JSXText(node: any): void;
    TemplateLiteral(node: any): void;
}) | ({
    ImportDeclaration(node: any): void;
    VariableDeclaration(node: any): void;
} & {
    Literal(node: any): void;
    JSXAttribute(node: any): void;
    JSXText(node: any): void;
    TemplateLiteral(node: any): void;
});
export declare function create(context: any): (false & {
    Literal(node: any): void;
    JSXAttribute(node: any): void;
    JSXText(node: any): void;
    TemplateLiteral(node: any): void;
}) | ({
    ImportDeclaration(node: any): void;
    VariableDeclaration(node: any): void;
} & {
    Literal(node: any): void;
    JSXAttribute(node: any): void;
    JSXText(node: any): void;
    TemplateLiteral(node: any): void;
});
//# sourceMappingURL=jsx-no-literals.d.ts.map