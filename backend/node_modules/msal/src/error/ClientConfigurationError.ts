/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ClientAuthError } from "./ClientAuthError";
import { TelemetryOptions } from "../Configuration";

interface IClientConfigurationErrorMessage {
    code: string,
    desc: string
}

export const ClientConfigurationErrorMessage: Record<string, IClientConfigurationErrorMessage> = {
    configurationNotSet: {
        code: "no_config_set",
        desc: "Configuration has not been set. Please call the UserAgentApplication constructor with a valid Configuration object."
    },
    storageNotSupported: {
        code: "storage_not_supported",
        desc: "The value for the cacheLocation is not supported."
    },
    noRedirectCallbacksSet: {
        code: "no_redirect_callbacks",
        desc: "No redirect callbacks have been set. Please call handleRedirectCallback() with the appropriate function arguments before continuing. " +
            "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
    },
    invalidCallbackObject: {
        code: "invalid_callback_object",
        desc: "The object passed for the callback was invalid. " +
          "More information is available here: https://github.com/AzureAD/microsoft-authentication-library-for-js/wiki/MSAL-basics."
    },
    scopesRequired: {
        code: "scopes_required",
        desc: "Scopes are required to obtain an access token."
    },
    emptyScopes: {
        code: "empty_input_scopes_error",
        desc: "Scopes cannot be passed as empty array."
    },
    nonArrayScopes: {
        code: "nonarray_input_scopes_error",
        desc: "Scopes cannot be passed as non-array."
    },
    invalidPrompt: {
        code: "invalid_prompt_value",
        desc: "Supported prompt values are 'login', 'select_account', 'consent' and 'none'",
    },
    invalidAuthorityType: {
        code: "invalid_authority_type",
        desc: "The given authority is not a valid type of authority supported by MSAL. Please see here for valid authorities: <insert URL here>."
    },
    authorityUriInsecure: {
        code: "authority_uri_insecure",
        desc: "Authority URIs must use https."
    },
    authorityUriInvalidPath: {
        code: "authority_uri_invalid_path",
        desc: "Given authority URI is invalid."
    },
    unsupportedAuthorityValidation: {
        code: "unsupported_authority_validation",
        desc: "The authority validation is not supported for this authority type."
    },
    untrustedAuthority: {
        code: "untrusted_authority",
        desc: "The provided authority is not a trusted authority. Please include this authority in the knownAuthorities config parameter or set validateAuthority=false."
    },
    b2cAuthorityUriInvalidPath: {
        code: "b2c_authority_uri_invalid_path",
        desc: "The given URI for the B2C authority is invalid."
    },
    b2cKnownAuthoritiesNotSet: {
        code: "b2c_known_authorities_not_set",
        desc: "Must set known authorities when validateAuthority is set to True and using B2C"
    },
    claimsRequestParsingError: {
        code: "claims_request_parsing_error",
        desc: "Could not parse the given claims request object."
    },
    emptyRequestError: {
        code: "empty_request_error",
        desc: "Request object is required."
    },
    invalidCorrelationIdError: {
        code: "invalid_guid_sent_as_correlationId",
        desc: "Please set the correlationId as a valid guid"
    },
    telemetryConfigError: {
        code: "telemetry_config_error",
        desc: "Telemetry config is not configured with required values"
    },
    ssoSilentError: {
        code: "sso_silent_error",
        desc: "request must contain either sid or login_hint"
    },
    invalidAuthorityMetadataError: {
        code: "authority_metadata_error",
        desc: "Invalid authorityMetadata. Must be a JSON object containing authorization_endpoint, end_session_endpoint, and issuer fields."
    }
};

/**
 * Error thrown when there is an error in configuration of the .js library.
 */
export class ClientConfigurationError extends ClientAuthError {

    constructor(errorCode: string, errorMessage?: string) {
        super(errorCode, errorMessage);
        this.name = "ClientConfigurationError";
        Object.setPrototypeOf(this, ClientConfigurationError.prototype);
    }

    static createNoSetConfigurationError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.configurationNotSet.code,
            `${ClientConfigurationErrorMessage.configurationNotSet.desc}`);
    }

    static createStorageNotSupportedError(givenCacheLocation: string) : ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.storageNotSupported.code,
            `${ClientConfigurationErrorMessage.storageNotSupported.desc} Given location: ${givenCacheLocation}`);
    }

    static createRedirectCallbacksNotSetError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.noRedirectCallbacksSet.code, ClientConfigurationErrorMessage.noRedirectCallbacksSet.desc);
    }

    static createInvalidCallbackObjectError(callbackObject: object): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCallbackObject.code,
            `${ClientConfigurationErrorMessage.invalidCallbackObject.desc} Given value for callback function: ${callbackObject}`);
    }

    static createEmptyScopesArrayError(scopesValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.emptyScopes.code,
            `${ClientConfigurationErrorMessage.emptyScopes.desc} Given value: ${scopesValue}.`);
    }

    static createScopesNonArrayError(scopesValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.nonArrayScopes.code,
            `${ClientConfigurationErrorMessage.nonArrayScopes.desc} Given value: ${scopesValue}.`);
    }

    static createScopesRequiredError(scopesValue: string[]): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.scopesRequired.code,
            `${ClientConfigurationErrorMessage.scopesRequired.desc} Given value: ${scopesValue}`);
    }

    static createInvalidPromptError(promptValue: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidPrompt.code,
            `${ClientConfigurationErrorMessage.invalidPrompt.desc} Given value: ${promptValue}`);
    }

    static createClaimsRequestParsingError(claimsRequestParseError: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.claimsRequestParsingError.code,
            `${ClientConfigurationErrorMessage.claimsRequestParsingError.desc} Given value: ${claimsRequestParseError}`);
    }

    static createEmptyRequestError(): ClientConfigurationError {
        const { code, desc } = ClientConfigurationErrorMessage.emptyRequestError;
        return new ClientConfigurationError(code, desc);
    }

    static createInvalidCorrelationIdError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidCorrelationIdError.code,
            ClientConfigurationErrorMessage.invalidCorrelationIdError.desc);
    }

    static createKnownAuthoritiesNotSetError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.code,
            ClientConfigurationErrorMessage.b2cKnownAuthoritiesNotSet.desc);
    }

    static createInvalidAuthorityTypeError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityType.code,
            ClientConfigurationErrorMessage.invalidAuthorityType.desc);
    }

    static createUntrustedAuthorityError(host: string): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.untrustedAuthority.code,
            `${ClientConfigurationErrorMessage.untrustedAuthority.desc} Provided Authority: ${host}`);
    }

    static createTelemetryConfigError(config: TelemetryOptions): ClientConfigurationError {
        const { code, desc } = ClientConfigurationErrorMessage.telemetryConfigError;
        const requiredKeys = {
            applicationName: "string",
            applicationVersion: "string",
            telemetryEmitter: "function"
        };

        const missingKeys = Object.keys(requiredKeys)
            .reduce((keys, key) => {
                return config[key] ? keys : keys.concat([ `${key} (${requiredKeys[key]})` ]);
            }, []);

        return new ClientConfigurationError(code, `${desc} mising values: ${missingKeys.join(",")}`);
    }

    static createSsoSilentError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.ssoSilentError.code,
            ClientConfigurationErrorMessage.ssoSilentError.desc);
    }

    static createInvalidAuthorityMetadataError(): ClientConfigurationError {
        return new ClientConfigurationError(ClientConfigurationErrorMessage.invalidAuthorityMetadataError.code, ClientConfigurationErrorMessage.invalidAuthorityMetadataError.desc);
    }
}
