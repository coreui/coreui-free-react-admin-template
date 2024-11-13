// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ApiKeyCredentials } from "@azure/ms-rest-js";

/**
 * Creates a new CognitiveServicesCredentials object.
 */
export class TopicCredentials extends ApiKeyCredentials {
  /**
   * Creates a new EventGrid TopicCredentials object.
   *
   *
   * @param topicKey -   The EventGrid topic key
   */
  constructor(topicKey: string) {
    if (!topicKey || (topicKey && typeof topicKey !== "string")) {
      throw new Error(`topicKey cannot be null or undefined and must be of type string.`);
    }

    const options = {
      inHeader: {
        "aeg-sas-key": topicKey
      }
    };

    super(options);
  }
}
