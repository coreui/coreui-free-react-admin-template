// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { ApiKeyCredentials } from "./apiKeyCredentials";
var DomainCredentials = /** @class */ (function (_super) {
    __extends(DomainCredentials, _super);
    /**
     * Creates a new EventGrid DomainCredentials object.
     *
     * @constructor
     * @param {string} domainKey   The EventGrid domain key
     */
    function DomainCredentials(domainKey) {
        var _this = this;
        if (!domainKey || (domainKey && typeof domainKey !== "string")) {
            throw new Error("domainKey cannot be null or undefined and must be of type string.");
        }
        var options = {
            inHeader: {
                "aeg-sas-key": domainKey,
            },
        };
        _this = _super.call(this, options) || this;
        return _this;
    }
    return DomainCredentials;
}(ApiKeyCredentials));
export { DomainCredentials };
//# sourceMappingURL=domainCredentials.js.map