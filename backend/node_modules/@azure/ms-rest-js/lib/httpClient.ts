// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { RequestPolicy } from "./policies/requestPolicy";

/**
 * An interface that can send HttpRequests and receive promised HttpResponses.
 */
export interface HttpClient extends RequestPolicy {}
