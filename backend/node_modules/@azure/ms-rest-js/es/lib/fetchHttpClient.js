// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __assign, __awaiter, __generator } from "tslib";
import AbortController from "abort-controller";
import FormData from "form-data";
import { HttpHeaders } from "./httpHeaders";
import { RestError } from "./restError";
import { Transform } from "stream";
var FetchHttpClient = /** @class */ (function () {
    function FetchHttpClient() {
    }
    FetchHttpClient.prototype.sendRequest = function (httpRequest) {
        return __awaiter(this, void 0, void 0, function () {
            var abortController, abortListener, formData, requestForm_1, appendFormValue, _i, _a, formKey, formValue, j, contentType, body, loadedBytes_1, uploadReportStream, platformSpecificRequestInit, requestInit, operationResponse, response, headers, _b, _c, onDownloadProgress_1, responseBody, loadedBytes_2, downloadReportStream, length_1, error_1, fetchError, uploadStreamDone, downloadStreamDone;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!httpRequest && typeof httpRequest !== "object") {
                            throw new Error("'httpRequest' (WebResource) cannot be null or undefined and must be of type object.");
                        }
                        abortController = new AbortController();
                        if (httpRequest.abortSignal) {
                            if (httpRequest.abortSignal.aborted) {
                                throw new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR, undefined, httpRequest);
                            }
                            abortListener = function (event) {
                                if (event.type === "abort") {
                                    abortController.abort();
                                }
                            };
                            httpRequest.abortSignal.addEventListener("abort", abortListener);
                        }
                        if (httpRequest.timeout) {
                            setTimeout(function () {
                                abortController.abort();
                            }, httpRequest.timeout);
                        }
                        if (httpRequest.formData) {
                            formData = httpRequest.formData;
                            requestForm_1 = new FormData();
                            appendFormValue = function (key, value) {
                                // value function probably returns a stream so we can provide a fresh stream on each retry
                                if (typeof value === "function") {
                                    value = value();
                                }
                                if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                                    requestForm_1.append(key, value.value, value.options);
                                }
                                else {
                                    requestForm_1.append(key, value);
                                }
                            };
                            for (_i = 0, _a = Object.keys(formData); _i < _a.length; _i++) {
                                formKey = _a[_i];
                                formValue = formData[formKey];
                                if (Array.isArray(formValue)) {
                                    for (j = 0; j < formValue.length; j++) {
                                        appendFormValue(formKey, formValue[j]);
                                    }
                                }
                                else {
                                    appendFormValue(formKey, formValue);
                                }
                            }
                            httpRequest.body = requestForm_1;
                            httpRequest.formData = undefined;
                            contentType = httpRequest.headers.get("Content-Type");
                            if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
                                if (typeof requestForm_1.getBoundary === "function") {
                                    httpRequest.headers.set("Content-Type", "multipart/form-data; boundary=" + requestForm_1.getBoundary());
                                }
                                else {
                                    // browser will automatically apply a suitable content-type header
                                    httpRequest.headers.remove("Content-Type");
                                }
                            }
                        }
                        body = httpRequest.body
                            ? typeof httpRequest.body === "function"
                                ? httpRequest.body()
                                : httpRequest.body
                            : undefined;
                        if (httpRequest.onUploadProgress && httpRequest.body) {
                            loadedBytes_1 = 0;
                            uploadReportStream = new Transform({
                                transform: function (chunk, _encoding, callback) {
                                    loadedBytes_1 += chunk.length;
                                    httpRequest.onUploadProgress({ loadedBytes: loadedBytes_1 });
                                    callback(undefined, chunk);
                                },
                            });
                            if (isReadableStream(body)) {
                                body.pipe(uploadReportStream);
                            }
                            else {
                                uploadReportStream.end(body);
                            }
                            body = uploadReportStream;
                        }
                        return [4 /*yield*/, this.prepareRequest(httpRequest)];
                    case 1:
                        platformSpecificRequestInit = _d.sent();
                        requestInit = __assign({ body: body, headers: httpRequest.headers.rawHeaders(), method: httpRequest.method, signal: abortController.signal, redirect: "manual" }, platformSpecificRequestInit);
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 8, 9, 10]);
                        return [4 /*yield*/, this.fetch(httpRequest.url, requestInit)];
                    case 3:
                        response = _d.sent();
                        headers = parseHeaders(response.headers);
                        _b = {
                            headers: headers,
                            request: httpRequest,
                            status: response.status,
                            readableStreamBody: httpRequest.streamResponseBody
                                ? response.body
                                : undefined
                        };
                        if (!!httpRequest.streamResponseBody) return [3 /*break*/, 5];
                        return [4 /*yield*/, response.text()];
                    case 4:
                        _c = _d.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        _c = undefined;
                        _d.label = 6;
                    case 6:
                        operationResponse = (_b.bodyAsText = _c,
                            _b.redirected = response.redirected,
                            _b.url = response.url,
                            _b);
                        onDownloadProgress_1 = httpRequest.onDownloadProgress;
                        if (onDownloadProgress_1) {
                            responseBody = response.body || undefined;
                            if (isReadableStream(responseBody)) {
                                loadedBytes_2 = 0;
                                downloadReportStream = new Transform({
                                    transform: function (chunk, _encoding, callback) {
                                        loadedBytes_2 += chunk.length;
                                        onDownloadProgress_1({ loadedBytes: loadedBytes_2 });
                                        callback(undefined, chunk);
                                    },
                                });
                                responseBody.pipe(downloadReportStream);
                                operationResponse.readableStreamBody = downloadReportStream;
                            }
                            else {
                                length_1 = parseInt(headers.get("Content-Length")) || undefined;
                                if (length_1) {
                                    // Calling callback for non-stream response for consistency with browser
                                    onDownloadProgress_1({ loadedBytes: length_1 });
                                }
                            }
                        }
                        return [4 /*yield*/, this.processRequest(operationResponse)];
                    case 7:
                        _d.sent();
                        return [2 /*return*/, operationResponse];
                    case 8:
                        error_1 = _d.sent();
                        fetchError = error_1;
                        if (fetchError.code === "ENOTFOUND") {
                            throw new RestError(fetchError.message, RestError.REQUEST_SEND_ERROR, undefined, httpRequest);
                        }
                        else if (fetchError.type === "aborted") {
                            throw new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR, undefined, httpRequest);
                        }
                        throw fetchError;
                    case 9:
                        // clean up event listener
                        if (httpRequest.abortSignal && abortListener) {
                            uploadStreamDone = Promise.resolve();
                            if (isReadableStream(body)) {
                                uploadStreamDone = isStreamComplete(body);
                            }
                            downloadStreamDone = Promise.resolve();
                            if (isReadableStream(operationResponse === null || operationResponse === void 0 ? void 0 : operationResponse.readableStreamBody)) {
                                downloadStreamDone = isStreamComplete(operationResponse.readableStreamBody);
                            }
                            Promise.all([uploadStreamDone, downloadStreamDone])
                                .then(function () {
                                var _a;
                                (_a = httpRequest.abortSignal) === null || _a === void 0 ? void 0 : _a.removeEventListener("abort", abortListener);
                                return;
                            })
                                .catch(function (_e) { });
                        }
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return FetchHttpClient;
}());
export { FetchHttpClient };
function isReadableStream(body) {
    return body && typeof body.pipe === "function";
}
function isStreamComplete(stream) {
    return new Promise(function (resolve) {
        stream.on("close", resolve);
        stream.on("end", resolve);
        stream.on("error", resolve);
    });
}
export function parseHeaders(headers) {
    var httpHeaders = new HttpHeaders();
    headers.forEach(function (value, key) {
        httpHeaders.set(key, value);
    });
    return httpHeaders;
}
//# sourceMappingURL=fetchHttpClient.js.map