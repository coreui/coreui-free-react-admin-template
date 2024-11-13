// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export function isNodeReadableStream(x) {
    return Boolean(x && typeof x["pipe"] === "function");
}
export function isWebReadableStream(x) {
    return Boolean(x &&
        typeof x.getReader === "function" &&
        typeof x.tee === "function");
}
export function isReadableStream(x) {
    return isNodeReadableStream(x) || isWebReadableStream(x);
}
export function isBlob(x) {
    return typeof x.stream === "function";
}
//# sourceMappingURL=typeGuards.js.map