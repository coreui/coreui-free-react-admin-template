import { AuthError } from "./AuthError";
/**
 * ClientAuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const ClientAuthErrorMessage: {
    clientInfoDecodingError: {
        code: string;
        desc: string;
    };
    clientInfoEmptyError: {
        code: string;
        desc: string;
    };
    tokenParsingError: {
        code: string;
        desc: string;
    };
    nullOrEmptyToken: {
        code: string;
        desc: string;
    };
    endpointResolutionError: {
        code: string;
        desc: string;
    };
    networkError: {
        code: string;
        desc: string;
    };
    unableToGetOpenidConfigError: {
        code: string;
        desc: string;
    };
    hashNotDeserialized: {
        code: string;
        desc: string;
    };
    blankGuidGenerated: {
        code: string;
        desc: string;
    };
    invalidStateError: {
        code: string;
        desc: string;
    };
    stateMismatchError: {
        code: string;
        desc: string;
    };
    stateNotFoundError: {
        code: string;
        desc: string;
    };
    nonceMismatchError: {
        code: string;
        desc: string;
    };
    nonceNotFoundError: {
        code: string;
        desc: string;
    };
    noTokensFoundError: {
        code: string;
        desc: string;
    };
    multipleMatchingTokens: {
        code: string;
        desc: string;
    };
    multipleMatchingAccounts: {
        code: string;
        desc: string;
    };
    multipleMatchingAppMetadata: {
        code: string;
        desc: string;
    };
    tokenRequestCannotBeMade: {
        code: string;
        desc: string;
    };
    appendEmptyScopeError: {
        code: string;
        desc: string;
    };
    removeEmptyScopeError: {
        code: string;
        desc: string;
    };
    appendScopeSetError: {
        code: string;
        desc: string;
    };
    emptyInputScopeSetError: {
        code: string;
        desc: string;
    };
    DeviceCodePollingCancelled: {
        code: string;
        desc: string;
    };
    DeviceCodeExpired: {
        code: string;
        desc: string;
    };
    DeviceCodeUnknownError: {
        code: string;
        desc: string;
    };
    NoAccountInSilentRequest: {
        code: string;
        desc: string;
    };
    invalidCacheRecord: {
        code: string;
        desc: string;
    };
    invalidCacheEnvironment: {
        code: string;
        desc: string;
    };
    noAccountFound: {
        code: string;
        desc: string;
    };
    CachePluginError: {
        code: string;
        desc: string;
    };
    noCryptoObj: {
        code: string;
        desc: string;
    };
    invalidCacheType: {
        code: string;
        desc: string;
    };
    unexpectedAccountType: {
        code: string;
        desc: string;
    };
    unexpectedCredentialType: {
        code: string;
        desc: string;
    };
    invalidAssertion: {
        code: string;
        desc: string;
    };
    invalidClientCredential: {
        code: string;
        desc: string;
    };
    tokenRefreshRequired: {
        code: string;
        desc: string;
    };
    userTimeoutReached: {
        code: string;
        desc: string;
    };
    tokenClaimsRequired: {
        code: string;
        desc: string;
    };
    noAuthorizationCodeFromServer: {
        code: string;
        desc: string;
    };
    noAzureRegionDetected: {
        code: string;
        desc: string;
    };
    accessTokenEntityNullError: {
        code: string;
        desc: string;
    };
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
export declare class ClientAuthError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    /**
     * Creates an error thrown when client info object doesn't decode correctly.
     * @param caughtError
     */
    static createClientInfoDecodingError(caughtError: string): ClientAuthError;
    /**
     * Creates an error thrown if the client info is empty.
     * @param rawClientInfo
     */
    static createClientInfoEmptyError(): ClientAuthError;
    /**
     * Creates an error thrown when the id token extraction errors out.
     * @param err
     */
    static createTokenParsingError(caughtExtractionError: string): ClientAuthError;
    /**
     * Creates an error thrown when the id token string is null or empty.
     * @param invalidRawTokenString
     */
    static createTokenNullOrEmptyError(invalidRawTokenString: string): ClientAuthError;
    /**
     * Creates an error thrown when the endpoint discovery doesn't complete correctly.
     */
    static createEndpointDiscoveryIncompleteError(errDetail: string): ClientAuthError;
    /**
     * Creates an error thrown when the fetch client throws
     */
    static createNetworkError(endpoint: string, errDetail: string): ClientAuthError;
    /**
     * Creates an error thrown when the openid-configuration endpoint cannot be reached or does not contain the required data
     */
    static createUnableToGetOpenidConfigError(errDetail: string): ClientAuthError;
    /**
     * Creates an error thrown when the hash cannot be deserialized.
     * @param hashParamObj
     */
    static createHashNotDeserializedError(hashParamObj: string): ClientAuthError;
    /**
     * Creates an error thrown when the state cannot be parsed.
     * @param invalidState
     */
    static createInvalidStateError(invalidState: string, errorString?: string): ClientAuthError;
    /**
     * Creates an error thrown when two states do not match.
     */
    static createStateMismatchError(): ClientAuthError;
    /**
     * Creates an error thrown when the state is not present
     * @param missingState
     */
    static createStateNotFoundError(missingState: string): ClientAuthError;
    /**
     * Creates an error thrown when the nonce does not match.
     */
    static createNonceMismatchError(): ClientAuthError;
    /**
     * Creates an error thrown when the mnonce is not present
     * @param missingNonce
     */
    static createNonceNotFoundError(missingNonce: string): ClientAuthError;
    /**
     * Creates an error thrown when the authorization code required for a token request is null or empty.
     */
    static createNoTokensFoundError(): ClientAuthError;
    /**
     * Throws error when multiple tokens are in cache.
     */
    static createMultipleMatchingTokensInCacheError(): ClientAuthError;
    /**
     * Throws error when multiple accounts are in cache for the given params
     */
    static createMultipleMatchingAccountsInCacheError(): ClientAuthError;
    /**
     * Throws error when multiple appMetada are in cache for the given clientId.
     */
    static createMultipleMatchingAppMetadataInCacheError(): ClientAuthError;
    /**
     * Throws error when no auth code or refresh token is given to ServerTokenRequestParameters.
     */
    static createTokenRequestCannotBeMadeError(): ClientAuthError;
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createAppendEmptyScopeToSetError(givenScope: string): ClientAuthError;
    /**
     * Throws error when attempting to append a null, undefined or empty scope to a set
     * @param givenScope
     */
    static createRemoveEmptyScopeFromSetError(givenScope: string): ClientAuthError;
    /**
     * Throws error when attempting to append null or empty ScopeSet.
     * @param appendError
     */
    static createAppendScopeSetError(appendError: string): ClientAuthError;
    /**
     * Throws error if ScopeSet is null or undefined.
     * @param givenScopeSet
     */
    static createEmptyInputScopeSetError(): ClientAuthError;
    /**
     * Throws error if user sets CancellationToken.cancel = true during polling of token endpoint during device code flow
     */
    static createDeviceCodeCancelledError(): ClientAuthError;
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeExpiredError(): ClientAuthError;
    /**
     * Throws error if device code is expired
     */
    static createDeviceCodeUnknownError(): ClientAuthError;
    /**
     * Throws error when silent requests are made without an account object
     */
    static createNoAccountInSilentRequestError(): ClientAuthError;
    /**
     * Throws error when cache record is null or undefined.
     */
    static createNullOrUndefinedCacheRecord(): ClientAuthError;
    /**
     * Throws error when provided environment is not part of the CloudDiscoveryMetadata object
     */
    static createInvalidCacheEnvironmentError(): ClientAuthError;
    /**
     * Throws error when account is not found in cache.
     */
    static createNoAccountFoundError(): ClientAuthError;
    /**
     * Throws error if ICachePlugin not set on CacheManager.
     */
    static createCachePluginError(): ClientAuthError;
    /**
     * Throws error if crypto object not found.
     * @param operationName
     */
    static createNoCryptoObjectError(operationName: string): ClientAuthError;
    /**
     * Throws error if cache type is invalid.
     */
    static createInvalidCacheTypeError(): ClientAuthError;
    /**
     * Throws error if unexpected account type.
     */
    static createUnexpectedAccountTypeError(): ClientAuthError;
    /**
     * Throws error if unexpected credential type.
     */
    static createUnexpectedCredentialTypeError(): ClientAuthError;
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidAssertionError(): ClientAuthError;
    /**
     * Throws error if client assertion is not valid.
     */
    static createInvalidCredentialError(): ClientAuthError;
    /**
     * Throws error if token cannot be retrieved from cache due to refresh being required.
     */
    static createRefreshRequiredError(): ClientAuthError;
    /**
     * Throws error if the user defined timeout is reached.
     */
    static createUserTimeoutReachedError(): ClientAuthError;
    static createTokenClaimsRequiredError(): ClientAuthError;
    /**
     * Throws error when the authorization code is missing from the server response
     */
    static createNoAuthCodeInServerResponseError(): ClientAuthError;
}
//# sourceMappingURL=ClientAuthError.d.ts.map