// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import AbortController from "abort-controller";
import FormData from "form-data";

import { HttpClient } from "./httpClient";
import { WebResourceLike } from "./webResource";
import { HttpOperationResponse } from "./httpOperationResponse";
import { HttpHeaders, HttpHeadersLike } from "./httpHeaders";
import { RestError } from "./restError";
import { Readable, Transform } from "stream";

interface FetchError extends Error {
  code?: string;
  errno?: string;
  type?: string;
}

export type CommonRequestInfo = string; // we only call fetch() on string urls.

export type CommonRequestInit = Omit<RequestInit, "body" | "headers" | "signal"> & {
  body?: any;
  headers?: any;
  signal?: any;
};

export type CommonResponse = Omit<Response, "body" | "trailer" | "formData"> & {
  body: any;
  trailer: any;
  formData: any;
};

export abstract class FetchHttpClient implements HttpClient {
  async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
    if (!httpRequest && typeof httpRequest !== "object") {
      throw new Error(
        "'httpRequest' (WebResource) cannot be null or undefined and must be of type object."
      );
    }

    const abortController = new AbortController();
    let abortListener: ((event: any) => void) | undefined;
    if (httpRequest.abortSignal) {
      if (httpRequest.abortSignal.aborted) {
        throw new RestError(
          "The request was aborted",
          RestError.REQUEST_ABORTED_ERROR,
          undefined,
          httpRequest
        );
      }

      abortListener = (event: Event) => {
        if (event.type === "abort") {
          abortController.abort();
        }
      };
      httpRequest.abortSignal.addEventListener("abort", abortListener);
    }

    if (httpRequest.timeout) {
      setTimeout(() => {
        abortController.abort();
      }, httpRequest.timeout);
    }

    if (httpRequest.formData) {
      const formData: any = httpRequest.formData;
      const requestForm = new FormData();
      const appendFormValue = (key: string, value: any) => {
        // value function probably returns a stream so we can provide a fresh stream on each retry
        if (typeof value === "function") {
          value = value();
        }
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

      httpRequest.body = requestForm;
      httpRequest.formData = undefined;
      const contentType = httpRequest.headers.get("Content-Type");
      if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
        if (typeof requestForm.getBoundary === "function") {
          httpRequest.headers.set(
            "Content-Type",
            `multipart/form-data; boundary=${requestForm.getBoundary()}`
          );
        } else {
          // browser will automatically apply a suitable content-type header
          httpRequest.headers.remove("Content-Type");
        }
      }
    }

    let body = httpRequest.body
      ? typeof httpRequest.body === "function"
        ? httpRequest.body()
        : httpRequest.body
      : undefined;
    if (httpRequest.onUploadProgress && httpRequest.body) {
      let loadedBytes = 0;
      const uploadReportStream = new Transform({
        transform: (chunk: string | Buffer, _encoding, callback) => {
          loadedBytes += chunk.length;
          httpRequest.onUploadProgress!({ loadedBytes });
          callback(undefined, chunk);
        },
      });

      if (isReadableStream(body)) {
        body.pipe(uploadReportStream);
      } else {
        uploadReportStream.end(body);
      }

      body = uploadReportStream;
    }

    const platformSpecificRequestInit: Partial<RequestInit> = await this.prepareRequest(
      httpRequest
    );

    const requestInit: RequestInit = {
      body: body,
      headers: httpRequest.headers.rawHeaders(),
      method: httpRequest.method,
      signal: abortController.signal,
      redirect: "manual",
      ...platformSpecificRequestInit,
    };

    let operationResponse: HttpOperationResponse | undefined;
    try {
      const response: CommonResponse = await this.fetch(httpRequest.url, requestInit);

      const headers = parseHeaders(response.headers);
      operationResponse = {
        headers: headers,
        request: httpRequest,
        status: response.status,
        readableStreamBody: httpRequest.streamResponseBody
          ? ((response.body as unknown) as NodeJS.ReadableStream)
          : undefined,
        bodyAsText: !httpRequest.streamResponseBody ? await response.text() : undefined,
        redirected: response.redirected,
        url: response.url,
      };

      const onDownloadProgress = httpRequest.onDownloadProgress;
      if (onDownloadProgress) {
        const responseBody: ReadableStream<Uint8Array> | undefined = response.body || undefined;

        if (isReadableStream(responseBody)) {
          let loadedBytes = 0;
          const downloadReportStream = new Transform({
            transform: (chunk: string | Buffer, _encoding, callback) => {
              loadedBytes += chunk.length;
              onDownloadProgress({ loadedBytes });
              callback(undefined, chunk);
            },
          });
          responseBody.pipe(downloadReportStream);
          operationResponse.readableStreamBody = downloadReportStream;
        } else {
          const length = parseInt(headers.get("Content-Length")!) || undefined;
          if (length) {
            // Calling callback for non-stream response for consistency with browser
            onDownloadProgress({ loadedBytes: length });
          }
        }
      }

      await this.processRequest(operationResponse);

      return operationResponse;
    } catch (error) {
      const fetchError: FetchError = error;
      if (fetchError.code === "ENOTFOUND") {
        throw new RestError(
          fetchError.message,
          RestError.REQUEST_SEND_ERROR,
          undefined,
          httpRequest
        );
      } else if (fetchError.type === "aborted") {
        throw new RestError(
          "The request was aborted",
          RestError.REQUEST_ABORTED_ERROR,
          undefined,
          httpRequest
        );
      }

      throw fetchError;
    } finally {
      // clean up event listener
      if (httpRequest.abortSignal && abortListener) {
        let uploadStreamDone = Promise.resolve();
        if (isReadableStream(body)) {
          uploadStreamDone = isStreamComplete(body);
        }
        let downloadStreamDone = Promise.resolve();
        if (isReadableStream(operationResponse?.readableStreamBody)) {
          downloadStreamDone = isStreamComplete(operationResponse!.readableStreamBody);
        }

        Promise.all([uploadStreamDone, downloadStreamDone])
          .then(() => {
            httpRequest.abortSignal?.removeEventListener("abort", abortListener!);
            return;
          })
          .catch((_e) => {});
      }
    }
  }

  abstract async prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>>;
  abstract async processRequest(operationResponse: HttpOperationResponse): Promise<void>;
  abstract async fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse>;
}

function isReadableStream(body: any): body is Readable {
  return body && typeof body.pipe === "function";
}

function isStreamComplete(stream: Readable): Promise<void> {
  return new Promise((resolve) => {
    stream.on("close", resolve);
    stream.on("end", resolve);
    stream.on("error", resolve);
  });
}

export function parseHeaders(headers: Headers): HttpHeadersLike {
  const httpHeaders = new HttpHeaders();

  headers.forEach((value, key) => {
    httpHeaders.set(key, value);
  });

  return httpHeaders;
}
