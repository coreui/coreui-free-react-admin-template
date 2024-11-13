// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Mapper } from "./serializer";

/**
 * An OperationResponse that can be returned from an operation request for a single status code.
 */
export interface OperationResponse {
  /**
   * The mapper that will be used to deserialize the response headers.
   */
  headersMapper?: Mapper;

  /**
   * The mapper that will be used to deserialize the response body.
   */
  bodyMapper?: Mapper;
}
