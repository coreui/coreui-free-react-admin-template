/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import TelemetryEvent from "./TelemetryEvent";
import { TELEMETRY_BLOB_EVENT_NAMES } from "./TelemetryConstants";
import { scrubTenantFromUri, hashPersonalIdentifier, prependEventNamePrefix } from "./TelemetryUtils";

export const EVENT_KEYS = {
    AUTHORITY: prependEventNamePrefix("authority"),
    AUTHORITY_TYPE: prependEventNamePrefix("authority_type"),
    PROMPT: prependEventNamePrefix("ui_behavior"),
    TENANT_ID: prependEventNamePrefix("tenant_id"),
    USER_ID: prependEventNamePrefix("user_id"),
    WAS_SUCESSFUL: prependEventNamePrefix("was_successful"),
    API_ERROR_CODE: prependEventNamePrefix("api_error_code"),
    LOGIN_HINT: prependEventNamePrefix("login_hint")
};

export enum API_CODE {
    AcquireTokenRedirect = 2001,
    AcquireTokenSilent = 2002,
    AcquireTokenPopup = 2003,
    LoginRedirect = 2004,
    LoginPopup = 2005,
    Logout = 2006
}

export enum API_EVENT_IDENTIFIER {
    AcquireTokenRedirect = "AcquireTokenRedirect",
    AcquireTokenSilent = "AcquireTokenSilent",
    AcquireTokenPopup = "AcquireTokenPopup",
    LoginRedirect = "LoginRedirect",
    LoginPopup = "LoginPopup",
    Logout = "Logout"
}

const mapEventIdentiferToCode = {
    [API_EVENT_IDENTIFIER.AcquireTokenSilent]: API_CODE.AcquireTokenSilent,
    [API_EVENT_IDENTIFIER.AcquireTokenPopup]: API_CODE.AcquireTokenPopup,
    [API_EVENT_IDENTIFIER.AcquireTokenRedirect]: API_CODE.AcquireTokenRedirect,
    [API_EVENT_IDENTIFIER.LoginPopup]: API_CODE.LoginPopup,
    [API_EVENT_IDENTIFIER.LoginRedirect]: API_CODE.LoginRedirect,
    [API_EVENT_IDENTIFIER.Logout]: API_CODE.Logout
};

export default class ApiEvent extends TelemetryEvent {

    private piiEnabled: boolean;

    constructor(correlationId: string, piiEnabled: boolean, apiEventIdentifier?: API_EVENT_IDENTIFIER) {
        super(prependEventNamePrefix("api_event"), correlationId, apiEventIdentifier);
        if (apiEventIdentifier) {
            this.apiCode = mapEventIdentiferToCode[apiEventIdentifier];
            this.apiEventIdentifier = apiEventIdentifier;
        }
        this.piiEnabled = piiEnabled;
    }

    public set apiEventIdentifier(apiEventIdentifier: string) {
        this.event[TELEMETRY_BLOB_EVENT_NAMES.ApiTelemIdConstStrKey] = apiEventIdentifier;
    }

    public set apiCode(apiCode: number) {
        this.event[TELEMETRY_BLOB_EVENT_NAMES.ApiIdConstStrKey] = apiCode;
    }

    public set authority(uri: string) {
        this.event[EVENT_KEYS.AUTHORITY] = scrubTenantFromUri(uri).toLowerCase();
    }

    public set apiErrorCode(errorCode: string) {
        this.event[EVENT_KEYS.API_ERROR_CODE] = errorCode;
    }

    public set tenantId(tenantId: string) {
        this.event[EVENT_KEYS.TENANT_ID] = this.piiEnabled && tenantId ?
            hashPersonalIdentifier(tenantId)
            : null;
    }

    public set accountId(accountId: string) {
        this.event[EVENT_KEYS.USER_ID] = this.piiEnabled && accountId ?
            hashPersonalIdentifier(accountId)
            : null;
    }

    public set wasSuccessful(wasSuccessful: boolean) {
        this.event[EVENT_KEYS.WAS_SUCESSFUL] = wasSuccessful;
    }

    public get wasSuccessful(): boolean {
        return this.event[EVENT_KEYS.WAS_SUCESSFUL] === true;
    }

    public set loginHint(loginHint: string) {
        this.event[EVENT_KEYS.LOGIN_HINT] = this.piiEnabled && loginHint ?
            hashPersonalIdentifier(loginHint)
            : null;
    }

    public set authorityType(authorityType: string) {
        this.event[EVENT_KEYS.AUTHORITY_TYPE] = authorityType.toLowerCase();
    }

    public set promptType(promptType: string) {
        this.event[EVENT_KEYS.PROMPT] = promptType.toLowerCase();
    }

}
