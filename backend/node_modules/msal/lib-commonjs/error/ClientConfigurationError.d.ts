import { ClientAuthError } from "./ClientAuthError";
import { TelemetryOptions } from "../Configuration";
interface IClientConfigurationErrorMessage {
    code: string;
    desc: string;
}
export declare const ClientConfigurationErrorMessage: Record<string, IClientConfigurationErrorMessage>;
/**
 * Error thrown when there is an error in configuration of the .js library.
 */
export declare class ClientConfigurationError extends ClientAuthError {
    constructor(errorCode: string, errorMessage?: string);
    static createNoSetConfigurationError(): ClientConfigurationError;
    static createStorageNotSupportedError(givenCacheLocation: string): ClientConfigurationError;
    static createRedirectCallbacksNotSetError(): ClientConfigurationError;
    static createInvalidCallbackObjectError(callbackObject: object): ClientConfigurationError;
    static createEmptyScopesArrayError(scopesValue: string): ClientConfigurationError;
    static createScopesNonArrayError(scopesValue: string): ClientConfigurationError;
    static createScopesRequiredError(scopesValue: string[]): ClientConfigurationError;
    static createInvalidPromptError(promptValue: string): ClientConfigurationError;
    static createClaimsRequestParsingError(claimsRequestParseError: string): ClientConfigurationError;
    static createEmptyRequestError(): ClientConfigurationError;
    static createInvalidCorrelationIdError(): ClientConfigurationError;
    static createKnownAuthoritiesNotSetError(): ClientConfigurationError;
    static createInvalidAuthorityTypeError(): ClientConfigurationError;
    static createUntrustedAuthorityError(host: string): ClientConfigurationError;
    static createTelemetryConfigError(config: TelemetryOptions): ClientConfigurationError;
    static createSsoSilentError(): ClientConfigurationError;
    static createInvalidAuthorityMetadataError(): ClientConfigurationError;
}
export {};
