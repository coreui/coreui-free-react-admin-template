/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 * Constants
 */
export class Constants {
    static get libraryName(): string { return "Msal.js"; } // used in telemetry sdkName
    static get claims(): string { return "claims"; }
    static get clientId(): string { return "clientId"; }

    static get adalIdToken(): string { return "adal.idtoken"; }
    static get cachePrefix(): string { return "msal"; }
    static get scopes(): string { return "scopes"; }

    static get no_account(): string { return "NO_ACCOUNT"; }
    static get upn(): string { return "upn"; }
    static get domain_hint(): string { return "domain_hint"; }

    static get prompt_select_account(): string { return "&prompt=select_account"; }
    static get prompt_none(): string { return "&prompt=none"; }
    static get prompt(): string { return "prompt"; }

    static get response_mode_fragment(): string { return "&response_mode=fragment"; }
    static get resourceDelimiter(): string { return "|"; }
    static get cacheDelimiter(): string { return "."; }

    private static _popUpWidth: number = 483;
    static get popUpWidth(): number { return this._popUpWidth; }
    static set popUpWidth(width: number) {
        this._popUpWidth = width;
    }
    private static _popUpHeight: number = 600;
    static get popUpHeight(): number { return this._popUpHeight; }
    static set popUpHeight(height: number) {
        this._popUpHeight = height;
    }

    static get login(): string { return "LOGIN"; }
    static get renewToken(): string { return "RENEW_TOKEN"; }
    static get unknown(): string { return "UNKNOWN"; }

    static get ADFS(): string { return "adfs"; }

    static get homeAccountIdentifier(): string { return "homeAccountIdentifier"; }

    static get common(): string { return "common"; }
    static get openidScope(): string { return "openid"; }
    static get profileScope(): string { return "profile"; }
    static get oidcScopes(): Array<string> { return [this.openidScope, this.profileScope] ;}

    static get interactionTypeRedirect(): InteractionType { return "redirectInteraction"; }
    static get interactionTypePopup(): InteractionType { return "popupInteraction"; }
    static get interactionTypeSilent(): InteractionType { return "silentInteraction"; }
    static get inProgress(): string { return "inProgress"; }
}

export const SESSION_STORAGE = "sessionStorage";

/**
 * Keys in the hashParams
 */
export enum ServerHashParamKeys {
    SCOPE = "scope",
    STATE = "state",
    ERROR = "error",
    ERROR_DESCRIPTION = "error_description",
    ACCESS_TOKEN = "access_token",
    ID_TOKEN = "id_token",
    EXPIRES_IN = "expires_in",
    SESSION_STATE = "session_state",
    CLIENT_INFO = "client_info"
}

/**
 * @hidden
 * @ignore
 * response_type from OpenIDConnect
 * References: https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html & https://tools.ietf.org/html/rfc6749#section-4.2.1
 *
 */
export const ResponseTypes = {
    id_token: "id_token",
    token: "token",
    id_token_token: "id_token token"
};

/**
 * @hidden
 * CacheKeys for MSAL
 */
export enum TemporaryCacheKeys {
    AUTHORITY = "authority",
    ACQUIRE_TOKEN_ACCOUNT = "acquireTokenAccount",
    SESSION_STATE = "session.state",
    STATE_LOGIN = "state.login",
    STATE_ACQ_TOKEN = "state.acquireToken",
    STATE_RENEW = "state.renew",
    NONCE_IDTOKEN = "nonce.idtoken",
    LOGIN_REQUEST = "login.request",
    RENEW_STATUS = "token.renew.status",
    URL_HASH = "urlHash",
    INTERACTION_STATUS = "interaction.status",
    REDIRECT_REQUEST = "redirect_request"
}

export enum PersistentCacheKeys {
    IDTOKEN = "idtoken",
    CLIENT_INFO = "client.info"
}

export enum ErrorCacheKeys {
    LOGIN_ERROR = "login.error",
    ERROR = "error",
    ERROR_DESC = "error.description"
}

export const DEFAULT_AUTHORITY: string = "https://login.microsoftonline.com/common/";
export const AAD_INSTANCE_DISCOVERY_ENDPOINT: string = `${DEFAULT_AUTHORITY}/discovery/instance?api-version=1.1&authorization_endpoint=`;
export const WELL_KNOWN_SUFFIX: string = ".well-known/openid-configuration";

/**
 * @hidden
 * SSO Types - generated to populate hints
 */
export enum SSOTypes {
    ACCOUNT = "account",
    SID = "sid",
    LOGIN_HINT = "login_hint",
    ORGANIZATIONS = "organizations",
    CONSUMERS = "consumers",
    ID_TOKEN ="id_token",
    ACCOUNT_ID = "accountIdentifier",
    HOMEACCOUNT_ID = "homeAccountIdentifier"
}

/**
 * @hidden
 */
export const DisallowedEQParams = [
    SSOTypes.SID,
    SSOTypes.LOGIN_HINT
];

export type InteractionType = "redirectInteraction" | "popupInteraction" | "silentInteraction";

export const NetworkRequestType = {
    GET: "GET",
    POST: "POST"
};

/**
 * we considered making this "enum" in the request instead of string, however it looks like the allowed list of
 * prompt values kept changing over past couple of years. There are some undocumented prompt values for some
 * internal partners too, hence the choice of generic "string" type instead of the "enum"
 * @hidden
 */
export const PromptState = {
    LOGIN: "login",
    SELECT_ACCOUNT: "select_account",
    CONSENT: "consent",
    NONE: "none"
};

/**
 * Frame name prefixes for the hidden iframe created in silent frames
 */
export const FramePrefix = {
    ID_TOKEN_FRAME: "msalIdTokenFrame",
    TOKEN_FRAME: "msalRenewFrame"
};
