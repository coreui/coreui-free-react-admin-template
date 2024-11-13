// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export const isNode = typeof process !== "undefined" &&
    !!process.version &&
    !!process.versions &&
    !!process.versions.node;
//# sourceMappingURL=isNode.js.map