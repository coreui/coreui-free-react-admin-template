import { ServerError } from "./ServerError";
/**
 * InteractionRequiredAuthErrorMessage class containing string constants used by error codes and messages.
 */
export declare const InteractionRequiredAuthErrorMessage: string[];
export declare const InteractionRequiredAuthSubErrorMessage: string[];
/**
 * Error thrown when user interaction is required at the auth server.
 */
export declare class InteractionRequiredAuthError extends ServerError {
    constructor(errorCode?: string, errorMessage?: string, subError?: string);
    static isInteractionRequiredError(errorCode?: string, errorString?: string, subError?: string): boolean;
}
//# sourceMappingURL=InteractionRequiredAuthError.d.ts.map