/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { TELEMETRY_BLOB_EVENT_NAMES } from "./TelemetryConstants";
import TelemetryEvent from "./TelemetryEvent";
import { EventCount, TelemetryPlatform } from "./TelemetryTypes";
import { prependEventNamePrefix } from "./TelemetryUtils";

export default class DefaultEvent extends TelemetryEvent {
    // TODO Platform Type
    constructor(platform: TelemetryPlatform, correlationId: string, clientId: string, eventCount: EventCount) {
        super(prependEventNamePrefix("default_event"), correlationId, "DefaultEvent");
        this.event[prependEventNamePrefix("client_id")] = clientId;
        this.event[prependEventNamePrefix("sdk_plaform")] = platform.sdk;
        this.event[prependEventNamePrefix("sdk_version")] = platform.sdkVersion;
        this.event[prependEventNamePrefix("application_name")] = platform.applicationName;
        this.event[prependEventNamePrefix("application_version")] = platform.applicationVersion;
        this.event[prependEventNamePrefix("effective_connection_speed")] = platform.networkInformation && platform.networkInformation.connectionSpeed;
        this.event[`${TELEMETRY_BLOB_EVENT_NAMES.UiEventCountTelemetryBatchKey}`] = this.getEventCount(prependEventNamePrefix("ui_event"), eventCount);
        this.event[`${TELEMETRY_BLOB_EVENT_NAMES.HttpEventCountTelemetryBatchKey}`] = this.getEventCount(prependEventNamePrefix("http_event"), eventCount);
        this.event[`${TELEMETRY_BLOB_EVENT_NAMES.CacheEventCountConstStrKey}`] = this.getEventCount(prependEventNamePrefix("cache_event"), eventCount);
        // / Device id?
    }

    private getEventCount(eventName: string, eventCount: EventCount): number {
        if (!eventCount[eventName]) {
            return 0;
        }
        return eventCount[eventName];
    }
}
