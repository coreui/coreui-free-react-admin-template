/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ServerError } from "./ServerError";

export const InteractionRequiredAuthErrorMessage = {
    interactionRequired: {
        code: "interaction_required"
    },
    consentRequired: {
        code: "consent_required"
    },
    loginRequired: {
        code: "login_required"
    },
};

/**
 * Error thrown when the user is required to perform an interactive token request.
 */
export class InteractionRequiredAuthError extends ServerError {

    constructor(errorCode: string, errorMessage?: string) {
        super(errorCode, errorMessage);
        this.name = "InteractionRequiredAuthError";

        Object.setPrototypeOf(this, InteractionRequiredAuthError.prototype);
    }

    static isInteractionRequiredError(errorString: string) : boolean {
        const interactionRequiredCodes = [
            InteractionRequiredAuthErrorMessage.interactionRequired.code,
            InteractionRequiredAuthErrorMessage.consentRequired.code,
            InteractionRequiredAuthErrorMessage.loginRequired.code
        ];

        return errorString && interactionRequiredCodes.indexOf(errorString) > -1;
    }

    static createLoginRequiredAuthError(errorDesc: string): InteractionRequiredAuthError {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.loginRequired.code, errorDesc);
    }

    static createInteractionRequiredAuthError(errorDesc: string): InteractionRequiredAuthError {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.interactionRequired.code, errorDesc);
    }

    static createConsentRequiredAuthError(errorDesc: string): InteractionRequiredAuthError {
        return new InteractionRequiredAuthError(InteractionRequiredAuthErrorMessage.consentRequired.code, errorDesc);
    }
}
