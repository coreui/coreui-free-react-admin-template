export = plugin;
/** @typedef {{ plugins: { react: typeof plugin }, rules: import('eslint').Linter.RulesRecord, languageOptions: { parserOptions: import('eslint').Linter.ParserOptions } }} ReactFlatConfig */
/** @type {{ deprecatedRules: typeof deprecatedRules, rules: typeof allRules, configs: typeof configs & { flat?: Record<string, ReactFlatConfig> }}} */
declare const plugin: {
    deprecatedRules: typeof deprecatedRules;
    rules: typeof allRules;
    configs: typeof configs & {
        flat?: Record<string, ReactFlatConfig>;
    };
};
declare namespace plugin {
    export { ReactFlatConfig };
}
/** @type {Partial<typeof allRules>} */
declare const deprecatedRules: Partial<typeof allRules>;
declare const allRules: {
    'boolean-prop-naming': import("eslint").Rule.RuleModule;
    'button-has-type': import("eslint").Rule.RuleModule;
    'checked-requires-onchange-or-readonly': import("eslint").Rule.RuleModule;
    'default-props-match-prop-types': import("eslint").Rule.RuleModule;
    'destructuring-assignment': import("eslint").Rule.RuleModule;
    'display-name': import("eslint").Rule.RuleModule;
    'forbid-component-props': import("eslint").Rule.RuleModule;
    'forbid-dom-props': import("eslint").Rule.RuleModule;
    'forbid-elements': import("eslint").Rule.RuleModule;
    'forbid-foreign-prop-types': import("eslint").Rule.RuleModule;
    'forbid-prop-types': import("eslint").Rule.RuleModule;
    'forward-ref-uses-ref': {
        meta: {
            docs: {
                description: string;
                category: string;
                recommended: boolean;
                url: string;
            };
            messages: {
                missingRefParameter: string;
                addRefParameter: string;
                removeForwardRef: string;
            };
            schema: undefined[];
            type: string;
            hasSuggestions: boolean;
        };
        create(context: any): {
            'FunctionExpression, ArrowFunctionExpression'(node: any): void;
        };
    };
    'function-component-definition': import("eslint").Rule.RuleModule;
    'hook-use-state': import("eslint").Rule.RuleModule;
    'iframe-missing-sandbox': import("eslint").Rule.RuleModule;
    'jsx-boolean-value': import("eslint").Rule.RuleModule;
    'jsx-child-element-spacing': import("eslint").Rule.RuleModule;
    'jsx-closing-bracket-location': import("eslint").Rule.RuleModule;
    'jsx-closing-tag-location': import("eslint").Rule.RuleModule;
    'jsx-curly-spacing': import("eslint").Rule.RuleModule;
    'jsx-curly-newline': import("eslint").Rule.RuleModule;
    'jsx-equals-spacing': import("eslint").Rule.RuleModule;
    'jsx-filename-extension': import("eslint").Rule.RuleModule;
    'jsx-first-prop-new-line': import("eslint").Rule.RuleModule;
    'jsx-handler-names': import("eslint").Rule.RuleModule;
    'jsx-indent': import("eslint").Rule.RuleModule;
    'jsx-indent-props': import("eslint").Rule.RuleModule;
    'jsx-key': import("eslint").Rule.RuleModule;
    'jsx-max-depth': import("eslint").Rule.RuleModule;
    'jsx-max-props-per-line': import("eslint").Rule.RuleModule;
    'jsx-newline': import("eslint").Rule.RuleModule;
    'jsx-no-bind': import("eslint").Rule.RuleModule;
    'jsx-no-comment-textnodes': import("eslint").Rule.RuleModule;
    'jsx-no-constructed-context-values': import("eslint").Rule.RuleModule;
    'jsx-no-duplicate-props': import("eslint").Rule.RuleModule;
    'jsx-no-leaked-render': import("eslint").Rule.RuleModule;
    'jsx-no-literals': {
        meta: import("eslint").Rule.RuleMetaData;
        create(context: any): (false & {
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
    };
    'jsx-no-script-url': import("eslint").Rule.RuleModule;
    'jsx-no-target-blank': import("eslint").Rule.RuleModule;
    'jsx-no-useless-fragment': import("eslint").Rule.RuleModule;
    'jsx-one-expression-per-line': import("eslint").Rule.RuleModule;
    'jsx-no-undef': import("eslint").Rule.RuleModule;
    'jsx-curly-brace-presence': import("eslint").Rule.RuleModule;
    'jsx-pascal-case': import("eslint").Rule.RuleModule;
    'jsx-fragments': import("eslint").Rule.RuleModule;
    'jsx-props-no-multi-spaces': import("eslint").Rule.RuleModule;
    'jsx-props-no-spreading': import("eslint").Rule.RuleModule;
    'jsx-props-no-spread-multi': {
        meta: {
            docs: {
                description: string; /** @type {Record<keyof typeof activeRules, 2 | 'error'>} */
                category: string;
                recommended: boolean;
                url: string;
            };
            /** @type {Partial<typeof allRules>} */
            messages: {
                noMultiSpreading: string;
            };
        };
        create(context: any): {
            JSXOpeningElement(node: any): void;
        };
    };
    'jsx-sort-default-props': import("eslint").Rule.RuleModule;
    'jsx-sort-props': import("eslint").Rule.RuleModule;
    'jsx-space-before-closing': import("eslint").Rule.RuleModule;
    'jsx-tag-spacing': import("eslint").Rule.RuleModule;
    'jsx-uses-react': import("eslint").Rule.RuleModule;
    'jsx-uses-vars': import("eslint").Rule.RuleModule;
    'jsx-wrap-multilines': import("eslint").Rule.RuleModule;
    'no-invalid-html-attribute': import("eslint").Rule.RuleModule;
    'no-access-state-in-setstate': import("eslint").Rule.RuleModule;
    'no-adjacent-inline-elements': import("eslint").Rule.RuleModule;
    'no-array-index-key': import("eslint").Rule.RuleModule;
    'no-arrow-function-lifecycle': import("eslint").Rule.RuleModule;
    'no-children-prop': import("eslint").Rule.RuleModule;
    'no-danger': import("eslint").Rule.RuleModule;
    'no-danger-with-children': import("eslint").Rule.RuleModule;
    'no-deprecated': import("eslint").Rule.RuleModule;
    'no-did-mount-set-state': import("eslint").Rule.RuleModule;
    'no-did-update-set-state': import("eslint").Rule.RuleModule;
    'no-direct-mutation-state': import("eslint").Rule.RuleModule;
    'no-find-dom-node': import("eslint").Rule.RuleModule;
    'no-is-mounted': import("eslint").Rule.RuleModule;
    'no-multi-comp': import("eslint").Rule.RuleModule;
    'no-namespace': import("eslint").Rule.RuleModule;
    'no-set-state': import("eslint").Rule.RuleModule;
    'no-string-refs': import("eslint").Rule.RuleModule;
    'no-redundant-should-component-update': import("eslint").Rule.RuleModule;
    'no-render-return-value': import("eslint").Rule.RuleModule;
    'no-this-in-sfc': import("eslint").Rule.RuleModule;
    'no-typos': import("eslint").Rule.RuleModule;
    'no-unescaped-entities': import("eslint").Rule.RuleModule;
    'no-unknown-property': import("eslint").Rule.RuleModule;
    'no-unsafe': import("eslint").Rule.RuleModule;
    'no-unstable-nested-components': import("eslint").Rule.RuleModule;
    'no-unused-class-component-methods': import("eslint").Rule.RuleModule;
    'no-unused-prop-types': import("eslint").Rule.RuleModule;
    'no-unused-state': import("eslint").Rule.RuleModule;
    'no-object-type-as-default-prop': import("eslint").Rule.RuleModule;
    'no-will-update-set-state': import("eslint").Rule.RuleModule;
    'prefer-es6-class': import("eslint").Rule.RuleModule;
    'prefer-exact-props': import("eslint").Rule.RuleModule;
    'prefer-read-only-props': import("eslint").Rule.RuleModule;
    'prefer-stateless-function': import("eslint").Rule.RuleModule;
    'prop-types': import("eslint").Rule.RuleModule;
    'react-in-jsx-scope': import("eslint").Rule.RuleModule;
    'require-default-props': import("eslint").Rule.RuleModule;
    'require-optimization': import("eslint").Rule.RuleModule;
    'require-render-return': import("eslint").Rule.RuleModule;
    'self-closing-comp': import("eslint").Rule.RuleModule;
    'sort-comp': import("eslint").Rule.RuleModule;
    'sort-default-props': import("eslint").Rule.RuleModule;
    'sort-prop-types': import("eslint").Rule.RuleModule;
    'state-in-constructor': import("eslint").Rule.RuleModule;
    'static-property-placement': import("eslint").Rule.RuleModule;
    'style-prop-object': import("eslint").Rule.RuleModule;
    'void-dom-elements-no-children': import("eslint").Rule.RuleModule;
};
declare const configs: {
    recommended: {
        plugins: ["react"];
        parserOptions: {
            ecmaFeatures: {
                jsx: boolean;
            };
        };
        rules: {
            'react/display-name': number;
            'react/jsx-key': number;
            'react/jsx-no-comment-textnodes': number;
            'react/jsx-no-duplicate-props': number;
            'react/jsx-no-target-blank': number;
            'react/jsx-no-undef': number;
            'react/jsx-uses-react': number;
            'react/jsx-uses-vars': number;
            'react/no-children-prop': number;
            'react/no-danger-with-children': number;
            'react/no-deprecated': number;
            'react/no-direct-mutation-state': number;
            'react/no-find-dom-node': number;
            'react/no-is-mounted': number;
            'react/no-render-return-value': number;
            'react/no-string-refs': number;
            'react/no-unescaped-entities': number;
            'react/no-unknown-property': number;
            'react/no-unsafe': number;
            'react/prop-types': number;
            'react/react-in-jsx-scope': number;
            'react/require-render-return': number;
        };
    };
    all: {
        plugins: ["react"];
        parserOptions: {
            ecmaFeatures: {
                jsx: boolean;
            };
        };
        rules: Record<"boolean-prop-naming" | "button-has-type" | "checked-requires-onchange-or-readonly" | "default-props-match-prop-types" | "destructuring-assignment" | "display-name" | "forbid-component-props" | "forbid-dom-props" | "forbid-elements" | "forbid-foreign-prop-types" | "forbid-prop-types" | "prop-types" | "forward-ref-uses-ref" | "function-component-definition" | "hook-use-state" | "iframe-missing-sandbox" | "jsx-boolean-value" | "jsx-child-element-spacing" | "jsx-closing-bracket-location" | "jsx-closing-tag-location" | "jsx-curly-spacing" | "jsx-curly-newline" | "jsx-equals-spacing" | "jsx-filename-extension" | "jsx-first-prop-new-line" | "jsx-handler-names" | "jsx-indent" | "jsx-indent-props" | "jsx-key" | "jsx-max-depth" | "jsx-max-props-per-line" | "jsx-newline" | "jsx-no-bind" | "jsx-no-comment-textnodes" | "jsx-no-constructed-context-values" | "jsx-no-duplicate-props" | "jsx-no-leaked-render" | "jsx-no-literals" | "jsx-no-script-url" | "jsx-no-target-blank" | "jsx-no-useless-fragment" | "jsx-one-expression-per-line" | "jsx-no-undef" | "jsx-curly-brace-presence" | "jsx-pascal-case" | "jsx-fragments" | "jsx-props-no-multi-spaces" | "jsx-props-no-spreading" | "jsx-props-no-spread-multi" | "sort-default-props" | "jsx-sort-default-props" | "jsx-sort-props" | "jsx-tag-spacing" | "jsx-space-before-closing" | "jsx-uses-react" | "jsx-uses-vars" | "jsx-wrap-multilines" | "no-invalid-html-attribute" | "no-access-state-in-setstate" | "no-adjacent-inline-elements" | "no-array-index-key" | "no-arrow-function-lifecycle" | "no-children-prop" | "no-danger" | "no-danger-with-children" | "no-deprecated" | "no-direct-mutation-state" | "no-find-dom-node" | "no-is-mounted" | "no-multi-comp" | "no-namespace" | "no-set-state" | "no-string-refs" | "no-redundant-should-component-update" | "no-render-return-value" | "no-this-in-sfc" | "no-typos" | "no-unescaped-entities" | "no-unknown-property" | "no-unsafe" | "no-unstable-nested-components" | "no-unused-class-component-methods" | "no-unused-prop-types" | "no-unused-state" | "no-object-type-as-default-prop" | "prefer-es6-class" | "prefer-exact-props" | "prefer-read-only-props" | "prefer-stateless-function" | "react-in-jsx-scope" | "require-default-props" | "require-optimization" | "require-render-return" | "self-closing-comp" | "sort-comp" | "sort-prop-types" | "state-in-constructor" | "static-property-placement" | "style-prop-object" | "void-dom-elements-no-children" | "no-did-mount-set-state" | "no-did-update-set-state" | "no-will-update-set-state", 2 | "error">;
    };
    'jsx-runtime': {
        plugins: ["react"];
        parserOptions: {
            ecmaFeatures: {
                jsx: boolean;
            };
            jsxPragma: any;
        };
        rules: {
            'react/react-in-jsx-scope': number;
            'react/jsx-uses-react': number;
        };
    };
};
type ReactFlatConfig = {
    plugins: {
        react: typeof plugin;
    };
    rules: import('eslint').Linter.RulesRecord;
    languageOptions: {
        parserOptions: import('eslint').Linter.ParserOptions;
    };
};
//# sourceMappingURL=index.d.ts.map