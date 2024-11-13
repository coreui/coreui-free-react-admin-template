"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const ms_rest_js_1 = require("@azure/ms-rest-js");
/**
 * Creates a new CognitiveServicesCredentials object.
 */
class TopicCredentials extends ms_rest_js_1.ApiKeyCredentials {
    /**
     * Creates a new EventGrid TopicCredentials object.
     *
     *
     * @param topicKey -   The EventGrid topic key
     */
    constructor(topicKey) {
        if (!topicKey || (topicKey && typeof topicKey !== "string")) {
            throw new Error(`topicKey cannot be null or undefined and must be of type string.`);
        }
        const options = {
            inHeader: {
                "aeg-sas-key": topicKey
            }
        };
        super(options);
    }
}
exports.TopicCredentials = TopicCredentials;
//# sourceMappingURL=topicCredentials.js.map