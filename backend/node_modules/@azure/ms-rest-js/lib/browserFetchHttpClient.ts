// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  CommonRequestInfo,
  CommonRequestInit,
  CommonResponse,
  FetchHttpClient,
} from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";

export class BrowserFetchHttpClient extends FetchHttpClient {
  prepareRequest(_httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    return Promise.resolve({});
  }

  processRequest(_operationResponse: HttpOperationResponse): Promise<void> {
    return Promise.resolve();
  }

  fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse> {
    return fetch(input, init);
  }
}
