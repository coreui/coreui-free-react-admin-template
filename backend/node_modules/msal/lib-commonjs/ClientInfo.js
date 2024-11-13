"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientInfo = void 0;
var CryptoUtils_1 = require("./utils/CryptoUtils");
var ClientAuthError_1 = require("./error/ClientAuthError");
var StringUtils_1 = require("./utils/StringUtils");
/**
 * @hidden
 */
var ClientInfo = /** @class */ (function () {
    function ClientInfo(rawClientInfo, authority) {
        if (!rawClientInfo || StringUtils_1.StringUtils.isEmpty(rawClientInfo)) {
            this.uid = "";
            this.utid = "";
            return;
        }
        try {
            var decodedClientInfo = CryptoUtils_1.CryptoUtils.base64Decode(rawClientInfo);
            var clientInfo = JSON.parse(decodedClientInfo);
            if (clientInfo) {
                if (clientInfo.hasOwnProperty("uid")) {
                    this.uid = authority ? ClientInfo.stripPolicyFromUid(clientInfo.uid, authority) : clientInfo.uid;
                }
                if (clientInfo.hasOwnProperty("utid")) {
                    this.utid = clientInfo.utid;
                }
            }
        }
        catch (e) {
            throw ClientAuthError_1.ClientAuthError.createClientInfoDecodingError(e);
        }
    }
    Object.defineProperty(ClientInfo.prototype, "uid", {
        get: function () {
            return this._uid ? this._uid : "";
        },
        set: function (uid) {
            this._uid = uid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClientInfo.prototype, "utid", {
        get: function () {
            return this._utid ? this._utid : "";
        },
        set: function (utid) {
            this._utid = utid;
        },
        enumerable: false,
        configurable: true
    });
    ClientInfo.createClientInfoFromIdToken = function (idToken, authority) {
        var clientInfo = {
            uid: idToken.subject,
            utid: ""
        };
        return new ClientInfo(CryptoUtils_1.CryptoUtils.base64Encode(JSON.stringify(clientInfo)), authority);
    };
    ClientInfo.stripPolicyFromUid = function (uid, authority) {
        var uidSegments = uid.split("-");
        // Reverse the url segments so the last one is more easily accessible
        var urlSegments = authority.split("/").reverse();
        var policy = "";
        if (!StringUtils_1.StringUtils.isEmpty(urlSegments[0])) {
            policy = urlSegments[0];
        }
        else if (urlSegments.length > 1) {
            // If the original url had a trailing slash, urlSegments[0] would be "" so take the next element
            policy = urlSegments[1];
        }
        if (uidSegments[uidSegments.length - 1] === policy) {
            // If the last segment of uid matches the last segment of authority url, remove the last segment of uid
            return uidSegments.slice(0, uidSegments.length - 1).join("-");
        }
        return uid;
    };
    ClientInfo.prototype.encodeClientInfo = function () {
        var clientInfo = JSON.stringify({ uid: this.uid, utid: this.utid });
        return CryptoUtils_1.CryptoUtils.base64Encode(clientInfo);
    };
    return ClientInfo;
}());
exports.ClientInfo = ClientInfo;
//# sourceMappingURL=ClientInfo.js.map