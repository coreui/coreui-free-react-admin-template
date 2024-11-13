import { AuthError } from "./AuthError";
export declare const ServerErrorMessage: {
    serverUnavailable: {
        code: string;
        desc: string;
    };
    unknownServerError: {
        code: string;
    };
};
/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
export declare class ServerError extends AuthError {
    constructor(errorCode: string, errorMessage?: string);
    static createServerUnavailableError(): ServerError;
    static createUnknownServerError(errorDesc: string): ServerError;
}
