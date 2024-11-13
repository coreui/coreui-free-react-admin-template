/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const AuthErrorMessage = {
    unexpectedError: {
        code: "unexpected_error",
        desc: "Unexpected error in authentication."
    },
    noWindowObjectError: {
        code: "no_window_object",
        desc: "No window object available. Details:"
    }
};

/**
 * General error class thrown by the MSAL.js library.
 */
export class AuthError extends Error {

    errorCode: string;
    errorMessage: string;

    constructor(errorCode: string, errorMessage?: string) {
        super(errorMessage);
        Object.setPrototypeOf(this, AuthError.prototype);

        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.name = "AuthError";
    }

    static createUnexpectedError(errDesc: string): AuthError {
        return new AuthError(AuthErrorMessage.unexpectedError.code, `${AuthErrorMessage.unexpectedError.desc}: ${errDesc}`);
    }

    static createNoWindowObjectError(errDesc: string): AuthError {
        return new AuthError(AuthErrorMessage.noWindowObjectError.code, `${AuthErrorMessage.noWindowObjectError.desc} ${errDesc}`);
    }
}
