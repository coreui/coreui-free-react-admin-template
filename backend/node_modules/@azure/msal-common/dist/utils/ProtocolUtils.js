/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { StringUtils } from './StringUtils.js';
import { Constants } from './Constants.js';
import { ClientAuthError } from '../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Class which provides helpers for OAuth 2.0 protocol specific values
 */
var ProtocolUtils = /** @class */ (function () {
    function ProtocolUtils() {
    }
    /**
     * Appends user state with random guid, or returns random guid.
     * @param userState
     * @param randomGuid
     */
    ProtocolUtils.setRequestState = function (cryptoObj, userState, meta) {
        var libraryState = ProtocolUtils.generateLibraryState(cryptoObj, meta);
        return !StringUtils.isEmpty(userState) ? "" + libraryState + Constants.RESOURCE_DELIM + userState : libraryState;
    };
    /**
     * Generates the state value used by the common library.
     * @param randomGuid
     * @param cryptoObj
     */
    ProtocolUtils.generateLibraryState = function (cryptoObj, meta) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("generateLibraryState");
        }
        // Create a state object containing a unique id and the timestamp of the request creation
        var stateObj = {
            id: cryptoObj.createNewGuid()
        };
        if (meta) {
            stateObj.meta = meta;
        }
        var stateString = JSON.stringify(stateObj);
        return cryptoObj.base64Encode(stateString);
    };
    /**
     * Parses the state into the RequestStateObject, which contains the LibraryState info and the state passed by the user.
     * @param state
     * @param cryptoObj
     */
    ProtocolUtils.parseRequestState = function (cryptoObj, state) {
        if (!cryptoObj) {
            throw ClientAuthError.createNoCryptoObjectError("parseRequestState");
        }
        if (StringUtils.isEmpty(state)) {
            throw ClientAuthError.createInvalidStateError(state, "Null, undefined or empty state");
        }
        try {
            // Split the state between library state and user passed state and decode them separately
            var splitState = state.split(Constants.RESOURCE_DELIM);
            var libraryState = splitState[0];
            var userState = splitState.length > 1 ? splitState.slice(1).join(Constants.RESOURCE_DELIM) : "";
            var libraryStateString = cryptoObj.base64Decode(libraryState);
            var libraryStateObj = JSON.parse(libraryStateString);
            return {
                userRequestState: !StringUtils.isEmpty(userState) ? userState : "",
                libraryState: libraryStateObj
            };
        }
        catch (e) {
            throw ClientAuthError.createInvalidStateError(state, e);
        }
    };
    return ProtocolUtils;
}());

export { ProtocolUtils };
//# sourceMappingURL=ProtocolUtils.js.map
