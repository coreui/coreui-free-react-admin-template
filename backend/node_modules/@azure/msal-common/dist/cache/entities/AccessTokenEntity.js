/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../../_virtual/_tslib.js';
import { CredentialEntity } from './CredentialEntity.js';
import { CredentialType, AuthenticationScheme } from '../../utils/Constants.js';
import { TimeUtils } from '../../utils/TimeUtils.js';
import { StringUtils } from '../../utils/StringUtils.js';
import { AuthToken } from '../../account/AuthToken.js';
import { ClientAuthError } from '../../error/ClientAuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ACCESS_TOKEN Credential Type
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-accesstoken-clientId-contoso.com-user.read
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      familyId: Family ID identifier, usually only used for refresh tokens
 *      realm: Full tenant or organizational identifier that the account belongs to
 *      target: Permissions that are included in the token, or for refresh tokens, the resource identifier.
 *      cachedAt: Absolute device time when entry was created in the cache.
 *      expiresOn: Token expiry time, calculated based on current UTC time in seconds. Represented as a string.
 *      extendedExpiresOn: Additional extended expiry time until when token is valid in case of server-side outage. Represented as string in UTC seconds.
 *      keyId: used for POP and SSH tokenTypes
 *      tokenType: Type of the token issued. Usually "Bearer"
 * }
 */
var AccessTokenEntity = /** @class */ (function (_super) {
    __extends(AccessTokenEntity, _super);
    function AccessTokenEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create AccessTokenEntity
     * @param homeAccountId
     * @param environment
     * @param accessToken
     * @param clientId
     * @param tenantId
     * @param scopes
     * @param expiresOn
     * @param extExpiresOn
     */
    AccessTokenEntity.createAccessTokenEntity = function (homeAccountId, environment, accessToken, clientId, tenantId, scopes, expiresOn, extExpiresOn, cryptoUtils, refreshOn, tokenType, oboAssertion) {
        var _a;
        var atEntity = new AccessTokenEntity();
        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;
        var currentTime = TimeUtils.nowSeconds();
        atEntity.cachedAt = currentTime.toString();
        /*
         * Token expiry time.
         * This value should be  calculated based on the current UTC time measured locally and the value  expires_in Represented as a string in JSON.
         */
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();
        if (refreshOn) {
            atEntity.refreshOn = refreshOn.toString();
        }
        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;
        atEntity.oboAssertion = oboAssertion;
        atEntity.tokenType = StringUtils.isEmpty(tokenType) ? AuthenticationScheme.BEARER : tokenType;
        // Create Access Token With AuthScheme instead of regular access token
        if (atEntity.tokenType === AuthenticationScheme.POP) {
            atEntity.credentialType = CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME;
            // Make sure keyId is present and add it to credential
            var tokenClaims = AuthToken.extractTokenClaims(accessToken, cryptoUtils);
            if (!((_a = tokenClaims === null || tokenClaims === void 0 ? void 0 : tokenClaims.cnf) === null || _a === void 0 ? void 0 : _a.kid)) {
                throw ClientAuthError.createTokenClaimsRequiredError();
            }
            atEntity.keyId = tokenClaims.cnf.kid;
        }
        return atEntity;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    AccessTokenEntity.isAccessTokenEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity.hasOwnProperty("target") &&
            (entity["credentialType"] === CredentialType.ACCESS_TOKEN || entity["credentialType"] === CredentialType.ACCESS_TOKEN_WITH_AUTH_SCHEME));
    };
    return AccessTokenEntity;
}(CredentialEntity));

export { AccessTokenEntity };
//# sourceMappingURL=AccessTokenEntity.js.map
