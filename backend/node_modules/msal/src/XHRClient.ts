/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { NetworkRequestType } from "./utils/Constants";

/**
 * XHR client for JSON endpoints
 * https://www.npmjs.com/package/async-promise
 * @hidden
 */

export class XhrClient {

    public sendRequestAsync(url: string, method: string, enableCaching?: boolean): Promise<XhrResponse> {
        return new Promise<XhrResponse>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, /* async: */ true);
            if (enableCaching) {
                /*
                 * TODO: (shivb) ensure that this can be cached
                 * xhr.setRequestHeader("Cache-Control", "Public");
                 */
            }

            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    reject(this.handleError(xhr.responseText));
                }
                let jsonResponse;
                try {
                    jsonResponse = JSON.parse(xhr.responseText);
                } catch (e) {
                    reject(this.handleError(xhr.responseText));
                }
                const response: XhrResponse = {
                    statusCode: xhr.status,
                    body: jsonResponse
                };
                resolve(response);
            };

            xhr.onerror = () => {
                reject(xhr.status);
            };

            if (method === NetworkRequestType.GET) {
                xhr.send();
            }
            else {
                throw "not implemented";
            }
        });
    }

    protected handleError(responseText: string): string {
        let jsonResponse: object;
        try {
            jsonResponse = JSON.parse(responseText);
            if (jsonResponse["error"]) {
                return jsonResponse["error"];
            } else {
                throw responseText;
            }
        } catch (e) {
            return responseText;
        }
    }
}

export type XhrResponse = {
    body: object,
    statusCode: number
};
