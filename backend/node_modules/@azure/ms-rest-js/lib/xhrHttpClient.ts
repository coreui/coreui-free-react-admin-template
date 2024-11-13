// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { HttpClient } from "./httpClient";
import { HttpHeaders } from "./httpHeaders";
import { WebResourceLike, TransferProgressEvent } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { RestError } from "./restError";

/**
 * A HttpClient implementation that uses XMLHttpRequest to send HTTP requests.
 */
export class XhrHttpClient implements HttpClient {
  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    const xhr = new XMLHttpRequest();

    if (request.agentSettings) {
      throw new Error("HTTP agent settings not supported in browser environment");
    }

    if (request.proxySettings) {
      throw new Error("HTTP proxy is not supported in browser environment");
    }

    const abortSignal = request.abortSignal;
    if (abortSignal) {
      const listener = () => {
        xhr.abort();
      };
      abortSignal.addEventListener("abort", listener);
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          abortSignal.removeEventListener("abort", listener);
        }
      });
    }

    addProgressListener(xhr.upload, request.onUploadProgress);
    addProgressListener(xhr, request.onDownloadProgress);

    if (request.formData) {
      const formData = request.formData;
      const requestForm = new FormData();
      const appendFormValue = (key: string, value: any) => {
        if (value && value.hasOwnProperty("value") && value.hasOwnProperty("options")) {
          requestForm.append(key, value.value, value.options);
        } else {
          requestForm.append(key, value);
        }
      };
      for (const formKey of Object.keys(formData)) {
        const formValue = formData[formKey];
        if (Array.isArray(formValue)) {
          for (let j = 0; j < formValue.length; j++) {
            appendFormValue(formKey, formValue[j]);
          }
        } else {
          appendFormValue(formKey, formValue);
        }
      }

      request.body = requestForm;
      request.formData = undefined;
      const contentType = request.headers.get("Content-Type");
      if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
        // browser will automatically apply a suitable content-type header
        request.headers.remove("Content-Type");
      }
    }

    xhr.open(request.method, request.url);
    xhr.timeout = request.timeout;
    xhr.withCredentials = request.withCredentials;
    for (const header of request.headers.headersArray()) {
      xhr.setRequestHeader(header.name, header.value);
    }
    xhr.responseType = request.streamResponseBody ? "blob" : "text";

    // tslint:disable-next-line:no-null-keyword
    xhr.send(request.body === undefined ? null : request.body);

    if (request.streamResponseBody) {
      return new Promise((resolve, reject) => {
        xhr.addEventListener("readystatechange", () => {
          // Resolve as soon as headers are loaded
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            const blobBody = new Promise<Blob>((resolve, reject) => {
              xhr.addEventListener("load", () => {
                resolve(xhr.response);
              });
              rejectOnTerminalEvent(request, xhr, reject);
            });
            resolve({
              request,
              status: xhr.status,
              headers: parseHeaders(xhr),
              blobBody,
            });
          }
        });
        rejectOnTerminalEvent(request, xhr, reject);
      });
    } else {
      return new Promise(function (resolve, reject) {
        xhr.addEventListener("load", () =>
          resolve({
            request,
            status: xhr.status,
            headers: parseHeaders(xhr),
            bodyAsText: xhr.responseText,
          })
        );
        rejectOnTerminalEvent(request, xhr, reject);
      });
    }
  }
}

function addProgressListener(
  xhr: XMLHttpRequestEventTarget,
  listener?: (progress: TransferProgressEvent) => void
) {
  if (listener) {
    xhr.addEventListener("progress", (rawEvent) =>
      listener({
        loadedBytes: rawEvent.loaded,
      })
    );
  }
}

// exported locally for testing
export function parseHeaders(xhr: XMLHttpRequest) {
  const responseHeaders = new HttpHeaders();
  const headerLines = xhr
    .getAllResponseHeaders()
    .trim()
    .split(/[\r\n]+/);
  for (const line of headerLines) {
    const index = line.indexOf(":");
    const headerName = line.slice(0, index);
    const headerValue = line.slice(index + 2);
    responseHeaders.set(headerName, headerValue);
  }
  return responseHeaders;
}

function rejectOnTerminalEvent(
  request: WebResourceLike,
  xhr: XMLHttpRequest,
  reject: (err: any) => void
) {
  xhr.addEventListener("error", () =>
    reject(
      new RestError(
        `Failed to send request to ${request.url}`,
        RestError.REQUEST_SEND_ERROR,
        undefined,
        request
      )
    )
  );
  xhr.addEventListener("abort", () =>
    reject(
      new RestError("The request was aborted", RestError.REQUEST_ABORTED_ERROR, undefined, request)
    )
  );
  xhr.addEventListener("timeout", () =>
    reject(
      new RestError(
        `timeout of ${xhr.timeout}ms exceeded`,
        RestError.REQUEST_SEND_ERROR,
        undefined,
        request
      )
    )
  );
}
