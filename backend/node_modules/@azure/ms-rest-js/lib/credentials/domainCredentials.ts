// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ApiKeyCredentials, ApiKeyCredentialOptions } from "./apiKeyCredentials";

export class DomainCredentials extends ApiKeyCredentials {
  /**
   * Creates a new EventGrid DomainCredentials object.
   *
   * @constructor
   * @param {string} domainKey   The EventGrid domain key
   */
  constructor(domainKey: string) {
    if (!domainKey || (domainKey && typeof domainKey !== "string")) {
      throw new Error("domainKey cannot be null or undefined and must be of type string.");
    }
    const options: ApiKeyCredentialOptions = {
      inHeader: {
        "aeg-sas-key": domainKey,
      },
    };
    super(options);
  }
}
