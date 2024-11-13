// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { HttpHeaders } from "./httpHeaders";
import { RestError } from "./restError";
/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 */
var XhrHttpClient = /** @class */ (function () {
    function XhrHttpClient() {
    }
    XhrHttpClient.prototype.sendRequest = function (request) {
        var xhr = new XMLHttpRequest();
        if (request.agentSettings) {
            throw new Error("HTTP agent settings not supported in browser environment");
        }
        if (request.proxySettings) {
            throw new Error("HTTP proxy is not supported in browser environment");
        }
        var abortSignal = request.abortSignal;
        if (abortSignal) {
            var listener_1 = function () {
                xhr.abort();
            };
            abortSignal.addEventListener("abort", listener_1);
            xhr.addEventListener("readystatechange", function () {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    abortSignal.removeEventListener("abort", listener_1);
                }
            });
        }
        addProgressListener(xhr.upload, request.onUploadProgress);
        addProgressListener(xhr, request.onDownloadProgress);
        if (request.formData) {
            var formData = request.formData;
            var requestForm_1 = new FormData();
            var appendFormValue = function (key, value) {
                if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
                    requestForm_1.append(key, value.value, value.options);
                }
                else {
                    requestForm_1.append(key, value);
                }
            };
            for (var _i = 0, _a = Object.keys(formData); _i < _a.length; _i++) {
                var formKey = _a[_i];
                var formValue = formData[formKey];
                if (Array.isArray(formValue)) {
                    for (var j = 0; j < formValue.length; j++) {
                        appendFormValue(formKey, formValue[j]);
                    }
                }
                else {
                    appendFormValue(formKey, formValue);
                }
            }
            request.body = requestForm_1;
            request.formData = undefined;
            var contentType = request.headers.get("Content-Type");
            if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
                // browser will automatically apply a suitable content-type header
                request.headers.remove("Content-Type");
            }
        }
        xhr.open(request.method, request.url);
        xhr.timeout = request.timeout;
        xhr.withCredentials = request.withCredentials;
        for (var _b = 0, _c = request.headers.headersArray(); _b < _c.length; _b++) {
            var header = _c[_b];
            xhr.setRequestHeader(header.name, header.value);
        }
        xhr.responseType = request.streamResponseBody ? "blob" : "text";
        // tslint:disable-next-line:no-null-keyword
        xhr.send(request.body === undefined ? null : request.body);
        if (request.streamResponseBody) {
            return new Promise(function (resolve, reject) {
                xhr.addEventListener("readystatechange", function () {
                    // Resolve as soon as headers are loaded
                    if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                        var blobBody = new Promise(function (resolve, reject) {
                            xhr.addEventListener("load", function () {
                                resolve(xhr.response);
                            });
                            rejectOnTerminalEvent(request, xhr, reject);
                        });
                        resolve({
                            request: request,
                            status: xhr.status,
                            headers: parseHeaders(xhr),
                            blobBody: blobBody,
                        });
                    }
                });
                rejectOnTerminalEvent(request, xhr, reject);
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                xhr.addEventListener("load", function () {
                    return resolve({
                        request: request,
                        status: xhr.status,
                        headers: parseHeaders(xhr),
                        bodyAsText: xhr.responseText,
                    });
                });
                rejectOnTerminalEvent(request, xhr, reject);
            });
        }
    };
    return XhrHttpClient;
}());
export { XhrHttpClient };
function addProgressListener(xhr, listener) {
    if (listener) {
        xhr.addEventListener("progress", function (rawEvent) {
            return listener({
                loadedBytes: rawEvent.loaded,
            });
        });
    }
}
// exported locally for testing
export function parseHeaders(xhr) {
    var responseHeaders = new HttpHeaders();
    var headerLines = xhr
        .getAllResponseHeaders()
        .trim()
        .split(/[\r\n]+/);
    for (var _i = 0, headerLines_1 = headerLines; _i < headerLines_1.length; _i++) {
        var line = headerLines_1[_i];
        var index = line.indexOf(":");
        var headerName = line.slice(0, index);
        var headerValue = line.slice(index + 2);
        responseHeaders.set(headerName, headerValue);
    }
    return responseHeaders;
}
function rejectOnTerminalEvent(request, xhr, reject) {
    xhr.addEventListener("error", function () {
        return reject(new RestError("Failed to send request to " + request.url, RestError.REQUEST_SEND_ERROR, undefined, request));
    });
    xhr.addEventListener("abort", function () {
        return reject(new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR, undefined, request));
    });
    xhr.addEventListener("timeout", function () {
        return reject(new RestError("timeout of " + xhr.timeout + "ms exceeded", RestError.REQUEST_SEND_ERROR, undefined, request));
    });
}
//# sourceMappingURL=xhrHttpClient.js.map