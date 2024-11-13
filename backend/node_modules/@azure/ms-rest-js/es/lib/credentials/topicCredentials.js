// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import { ApiKeyCredentials } from "./apiKeyCredentials";
var TopicCredentials = /** @class */ (function (_super) {
    __extends(TopicCredentials, _super);
    /**
     * Creates a new EventGrid TopicCredentials object.
     *
     * @constructor
     * @param {string} topicKey   The EventGrid topic key
     */
    function TopicCredentials(topicKey) {
        var _this = this;
        if (!topicKey || (topicKey && typeof topicKey !== "string")) {
            throw new Error("topicKey cannot be null or undefined and must be of type string.");
        }
        var options = {
            inHeader: {
                "aeg-sas-key": topicKey,
            },
        };
        _this = _super.call(this, options) || this;
        return _this;
    }
    return TopicCredentials;
}(ApiKeyCredentials));
export { TopicCredentials };
//# sourceMappingURL=topicCredentials.js.map