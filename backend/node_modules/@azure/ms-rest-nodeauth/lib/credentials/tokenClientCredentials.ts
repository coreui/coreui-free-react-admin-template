// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ServiceClientCredentials } from "@azure/ms-rest-js";

export interface TokenResponse {
  readonly tokenType: string;
  readonly accessToken: string;
  readonly [x: string]: any;
}

export interface TokenClientCredentials extends ServiceClientCredentials {
  getToken<TTokenResponse extends TokenResponse>(): Promise<TokenResponse | TTokenResponse>;
}
