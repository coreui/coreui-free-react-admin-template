"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyCredential = void 0;
const core_util_1 = require("@azure/core-util");
/**
 * Tests an object to determine whether it implements KeyCredential.
 *
 * @param credential - The assumed KeyCredential to be tested.
 */
function isKeyCredential(credential) {
    return (0, core_util_1.isObjectWithProperties)(credential, ["key"]) && typeof credential.key === "string";
}
exports.isKeyCredential = isKeyCredential;
//# sourceMappingURL=keyCredential.js.map