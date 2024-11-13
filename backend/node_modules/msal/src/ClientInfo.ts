/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { CryptoUtils } from "./utils/CryptoUtils";
import { ClientAuthError } from "./error/ClientAuthError";
import { StringUtils } from "./utils/StringUtils";
import { IdToken } from "./IdToken";

/**
 * @hidden
 */
export class ClientInfo {

    private _uid: string;
    get uid(): string {
        return this._uid ? this._uid : "";
    }

    set uid(uid: string) {
        this._uid = uid;
    }

    private _utid: string;
    get utid(): string {
        return this._utid ? this._utid : "";
    }

    set utid(utid: string) {
        this._utid = utid;
    }

    static createClientInfoFromIdToken(idToken:IdToken, authority: string): ClientInfo {
        const clientInfo = {
            uid: idToken.subject, 
            utid: ""
        };

        return new ClientInfo(CryptoUtils.base64Encode(JSON.stringify(clientInfo)), authority);
    }

    constructor(rawClientInfo: string, authority: string) {
        if (!rawClientInfo || StringUtils.isEmpty(rawClientInfo)) {
            this.uid = "";
            this.utid = "";
            return;
        }

        try {
            const decodedClientInfo: string = CryptoUtils.base64Decode(rawClientInfo);
            const clientInfo: ClientInfo = <ClientInfo>JSON.parse(decodedClientInfo);
            if (clientInfo) {
                if (clientInfo.hasOwnProperty("uid")) {
                    this.uid = authority ? ClientInfo.stripPolicyFromUid(clientInfo.uid, authority): clientInfo.uid;
                }

                if (clientInfo.hasOwnProperty("utid")) {
                    this.utid = clientInfo.utid;
                }
            }
        } catch (e) {
            throw ClientAuthError.createClientInfoDecodingError(e);
        }
    }

    static stripPolicyFromUid(uid: string, authority: string): string {
        const uidSegments = uid.split("-");
        // Reverse the url segments so the last one is more easily accessible
        const urlSegments = authority.split("/").reverse();
        let policy = "";

        if (!StringUtils.isEmpty(urlSegments[0])) {
            policy = urlSegments[0];
        } else if (urlSegments.length > 1) {
            // If the original url had a trailing slash, urlSegments[0] would be "" so take the next element
            policy = urlSegments[1];
        }

        if (uidSegments[uidSegments.length - 1] ===  policy) {
            // If the last segment of uid matches the last segment of authority url, remove the last segment of uid
            return uidSegments.slice(0, uidSegments.length - 1).join("-");
        }

        return uid;
    }

    public encodeClientInfo(): string {
        const clientInfo = JSON.stringify({uid: this.uid, utid: this.utid});

        return CryptoUtils.base64Encode(clientInfo);
    }
}
