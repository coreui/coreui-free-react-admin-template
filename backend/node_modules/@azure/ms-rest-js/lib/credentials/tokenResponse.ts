// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/**
 * TokenResponse is defined in `@azure/ms-rest-nodeauth` and is copied here to not
 * add an unnecessary dependency.
 */
export interface TokenResponse {
  readonly tokenType: string;
  readonly accessToken: string;
  readonly [x: string]: any;
}
