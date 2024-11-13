/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Account } from "./Account";
import { ClientConfigurationError } from "./error/ClientConfigurationError";
import { StringDict } from "./MsalTypes";

/**
 * @link AuthenticationParameters}AuthenticationParameters
 */
export type AuthenticationParameters = {
    scopes?: Array<string>;
    extraScopesToConsent?: Array<string>;
    prompt?: string;
    extraQueryParameters?: StringDict;
    claimsRequest?: string;
    authority?: string;
    state?: string;
    correlationId?: string;
    account?: Account;
    sid?: string;
    loginHint?: string;
    forceRefresh?: boolean;
    redirectUri?: string;
    redirectStartPage?: string;
    authorityMetadata?: string;
    onRedirectNavigate?: ((url: string) => void | boolean)
};

export function validateClaimsRequest(request: AuthenticationParameters): void {
    if (!request.claimsRequest) {
        return;
    }
    try {
        JSON.parse(request.claimsRequest);
    } catch (e) {
        throw ClientConfigurationError.createClaimsRequestParsingError(e);
    }

    // TODO: More validation will be added when the server team tells us how they have actually implemented claims
}
