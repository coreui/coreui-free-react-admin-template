/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __extends } from '../../_virtual/_tslib.js';
import { CredentialEntity } from './CredentialEntity.js';
import { CredentialType } from '../../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * ID_TOKEN Cache
 *
 * Key:Value Schema:
 *
 * Key Example: uid.utid-login.microsoftonline.com-idtoken-clientId-contoso.com-
 *
 * Value Schema:
 * {
 *      homeAccountId: home account identifier for the auth scheme,
 *      environment: entity that issued the token, represented as a full host
 *      credentialType: Type of credential as a string, can be one of the following: RefreshToken, AccessToken, IdToken, Password, Cookie, Certificate, Other
 *      clientId: client ID of the application
 *      secret: Actual credential as a string
 *      realm: Full tenant or organizational identifier that the account belongs to
 * }
 */
var IdTokenEntity = /** @class */ (function (_super) {
    __extends(IdTokenEntity, _super);
    function IdTokenEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Create IdTokenEntity
     * @param homeAccountId
     * @param authenticationResult
     * @param clientId
     * @param authority
     */
    IdTokenEntity.createIdTokenEntity = function (homeAccountId, environment, idToken, clientId, tenantId, oboAssertion) {
        var idTokenEntity = new IdTokenEntity();
        idTokenEntity.credentialType = CredentialType.ID_TOKEN;
        idTokenEntity.homeAccountId = homeAccountId;
        idTokenEntity.environment = environment;
        idTokenEntity.clientId = clientId;
        idTokenEntity.secret = idToken;
        idTokenEntity.realm = tenantId;
        idTokenEntity.oboAssertion = oboAssertion;
        return idTokenEntity;
    };
    /**
     * Validates an entity: checks for all expected params
     * @param entity
     */
    IdTokenEntity.isIdTokenEntity = function (entity) {
        if (!entity) {
            return false;
        }
        return (entity.hasOwnProperty("homeAccountId") &&
            entity.hasOwnProperty("environment") &&
            entity.hasOwnProperty("credentialType") &&
            entity.hasOwnProperty("realm") &&
            entity.hasOwnProperty("clientId") &&
            entity.hasOwnProperty("secret") &&
            entity["credentialType"] === CredentialType.ID_TOKEN);
    };
    return IdTokenEntity;
}(CredentialEntity));

export { IdTokenEntity };
//# sourceMappingURL=IdTokenEntity.js.map
