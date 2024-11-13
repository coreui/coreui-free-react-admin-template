export declare const AuthErrorMessage: {
    unexpectedError: {
        code: string;
        desc: string;
    };
    noWindowObjectError: {
        code: string;
        desc: string;
    };
};
/**
 * General error class thrown by the MSAL.js library.
 */
export declare class AuthError extends Error {
    errorCode: string;
    errorMessage: string;
    constructor(errorCode: string, errorMessage?: string);
    static createUnexpectedError(errDesc: string): AuthError;
    static createNoWindowObjectError(errDesc: string): AuthError;
}
