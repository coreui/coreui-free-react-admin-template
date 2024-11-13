/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { ClientAuthError } from '../error/ClientAuthError.js';
import { StringUtils } from '../utils/StringUtils.js';
import { Constants, Separators } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Function to build a client info object from server clientInfo string
 * @param rawClientInfo
 * @param crypto
 */
function buildClientInfo(rawClientInfo, crypto) {
    if (StringUtils.isEmpty(rawClientInfo)) {
        throw ClientAuthError.createClientInfoEmptyError();
    }
    try {
        var decodedClientInfo = crypto.base64Decode(rawClientInfo);
        return JSON.parse(decodedClientInfo);
    }
    catch (e) {
        throw ClientAuthError.createClientInfoDecodingError(e);
    }
}
/**
 * Function to build a client info object from cached homeAccountId string
 * @param homeAccountId
 */
function buildClientInfoFromHomeAccountId(homeAccountId) {
    if (StringUtils.isEmpty(homeAccountId)) {
        throw ClientAuthError.createClientInfoDecodingError("Home account ID was empty.");
    }
    var clientInfoParts = homeAccountId.split(Separators.CLIENT_INFO_SEPARATOR, 2);
    return {
        uid: clientInfoParts[0],
        utid: clientInfoParts.length < 2 ? Constants.EMPTY_STRING : clientInfoParts[1]
    };
}

export { buildClientInfo, buildClientInfoFromHomeAccountId };
//# sourceMappingURL=ClientInfo.js.map
