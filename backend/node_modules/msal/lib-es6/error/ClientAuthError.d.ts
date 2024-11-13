import { AuthError } from "./AuthError";
import { IdToken } from "../IdToken";
export declare const ClientAuthErrorMessage: {
    endpointResolutionError: {
        code: string;
        desc: string;
    };
    popUpWindowError: {
        code: string;
        desc: string;
    };
    tokenRenewalError: {
        code: string;
        desc: string;
    };
    invalidIdToken: {
        code: string;
        desc: string;
    };
    invalidStateError: {
        code: string;
        desc: string;
    };
    nonceMismatchError: {
        code: string;
        desc: string;
    };
    loginProgressError: {
        code: string;
        desc: string;
    };
    acquireTokenProgressError: {
        code: string;
        desc: string;
    };
    userCancelledError: {
        code: string;
        desc: string;
    };
    callbackError: {
        code: string;
        desc: string;
    };
    userLoginRequiredError: {
        code: string;
        desc: string;
    };
    userDoesNotExistError: {
        code: string;
        desc: string;
    };
    clientInfoDecodingError: {
        code: string;
        desc: string;
    };
    clientInfoNotPopulatedError: {
        code: string;
        desc: string;
    };
    nullOrEmptyIdToken: {
        code: string;
        desc: string;
    };
    idTokenNotParsed: {
        code: string;
        desc: string;
    };
    tokenEncodingError: {
        code: string;
        desc: string;
    };
    invalidInteractionType: {
        code: string;
        desc: string;
    };
    cacheParseError: {
        code: string;
        desc: string;
    };
    blockTokenRequestsInHiddenIframe: {
        code: string;
        desc: string;
    };
};
/**
 * Error thrown when there is an error in the client code running on the browser.
 */
export declare class ClientAuthError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    static createEndpointResolutionError(errDetail?: string): ClientAuthError;
    static createPopupWindowError(errDetail?: string): ClientAuthError;
    static createTokenRenewalTimeoutError(): ClientAuthError;
    static createInvalidIdTokenError(idToken: IdToken): ClientAuthError;
    static createInvalidStateError(invalidState: string, actualState: string): ClientAuthError;
    static createNonceMismatchError(invalidNonce: string, actualNonce: string): ClientAuthError;
    static createLoginInProgressError(): ClientAuthError;
    static createAcquireTokenInProgressError(): ClientAuthError;
    static createUserCancelledError(): ClientAuthError;
    static createErrorInCallbackFunction(errorDesc: string): ClientAuthError;
    static createUserLoginRequiredError(): ClientAuthError;
    static createUserDoesNotExistError(): ClientAuthError;
    static createClientInfoDecodingError(caughtError: string): ClientAuthError;
    static createClientInfoNotPopulatedError(caughtError: string): ClientAuthError;
    static createIdTokenNullOrEmptyError(invalidRawTokenString: string): ClientAuthError;
    static createIdTokenParsingError(caughtParsingError: string): ClientAuthError;
    static createTokenEncodingError(incorrectlyEncodedToken: string): ClientAuthError;
    static createInvalidInteractionTypeError(): ClientAuthError;
    static createCacheParseError(key: string): ClientAuthError;
    static createBlockTokenRequestsInHiddenIframeError(): ClientAuthError;
}
