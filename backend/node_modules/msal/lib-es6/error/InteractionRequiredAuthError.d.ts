import { ServerError } from "./ServerError";
export declare const InteractionRequiredAuthErrorMessage: {
    interactionRequired: {
        code: string;
    };
    consentRequired: {
        code: string;
    };
    loginRequired: {
        code: string;
    };
};
/**
 * Error thrown when the user is required to perform an interactive token request.
 */
export declare class InteractionRequiredAuthError extends ServerError {
    constructor(errorCode: string, errorMessage?: string);
    static isInteractionRequiredError(errorString: string): boolean;
    static createLoginRequiredAuthError(errorDesc: string): InteractionRequiredAuthError;
    static createInteractionRequiredAuthError(errorDesc: string): InteractionRequiredAuthError;
    static createConsentRequiredAuthError(errorDesc: string): InteractionRequiredAuthError;
}
