/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { CryptoUtils } from "../utils/CryptoUtils";
import { UrlUtils } from "../utils/UrlUtils";

/**
 * @hidden
 */
export class AccessTokenKey {

    authority: string;
    clientId: string;
    scopes: string;
    homeAccountIdentifier: string;

    constructor(authority: string, clientId: string, scopes: string, uid: string, utid: string) {
        this.authority = UrlUtils.CanonicalizeUri(authority);
        this.clientId = clientId;
        this.scopes = scopes;
        this.homeAccountIdentifier = CryptoUtils.base64Encode(uid) + "." + CryptoUtils.base64Encode(utid);
    }
}
