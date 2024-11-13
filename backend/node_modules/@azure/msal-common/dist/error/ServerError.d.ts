import { AuthError } from "./AuthError";
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
export declare class ServerError extends AuthError {
    constructor(errorCode?: string, errorMessage?: string, subError?: string);
}
//# sourceMappingURL=ServerError.d.ts.map