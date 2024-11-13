// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __awaiter, __extends, __generator } from "tslib";
import * as http from "http";
import * as https from "https";
import node_fetch from "node-fetch";
import { FetchHttpClient, } from "./fetchHttpClient";
import { createProxyAgent } from "./proxyAgent";
var NodeFetchHttpClient = /** @class */ (function (_super) {
    __extends(NodeFetchHttpClient, _super);
    function NodeFetchHttpClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeFetchHttpClient.prototype.fetch = function (input, init) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, node_fetch(input, init)];
            });
        });
    };
    NodeFetchHttpClient.prototype.prepareRequest = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var requestInit, _a, httpAgent, httpsAgent, tunnel, options, agent;
            return __generator(this, function (_b) {
                requestInit = {};
                if (httpRequest.agentSettings) {
                    _a = httpRequest.agentSettings, httpAgent = _a.http, httpsAgent = _a.https;
                    if (httpsAgent && httpRequest.url.startsWith("https")) {
                        requestInit.agent = httpsAgent;
                    }
                    else if (httpAgent) {
                        requestInit.agent = httpAgent;
                    }
                }
                else if (httpRequest.proxySettings) {
                    tunnel = createProxyAgent(httpRequest.url, httpRequest.proxySettings, httpRequest.headers);
                    requestInit.agent = tunnel.agent;
                }
                if (httpRequest.keepAlive === true) {
                    if (requestInit.agent) {
                        requestInit.agent.keepAlive = true;
                    }
                    else {
                        options = { keepAlive: true };
                        agent = httpRequest.url.startsWith("https")
                            ? new https.Agent(options)
                            : new http.Agent(options);
                        requestInit.agent = agent;
                    }
                }
                return [2 /*return*/, requestInit];
            });
        });
    };
    NodeFetchHttpClient.prototype.processRequest = function (_operationResponse) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /* no_op */
                return [2 /*return*/];
            });
        });
    };
    return NodeFetchHttpClient;
}(FetchHttpClient));
export { NodeFetchHttpClient };
//# sourceMappingURL=nodeFetchHttpClient.js.map