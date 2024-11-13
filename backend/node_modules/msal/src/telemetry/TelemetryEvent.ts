/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import {
    TELEMETRY_BLOB_EVENT_NAMES,
    EVENT_NAME_KEY,
    START_TIME_KEY,
    ELAPSED_TIME_KEY
} from "./TelemetryConstants";
import { prependEventNamePrefix, startBrowserPerformanceMeasurement, endBrowserPerformanceMeasurement } from "./TelemetryUtils";
import { CryptoUtils } from "../utils/CryptoUtils";

export default class TelemetryEvent {

    private startTimestamp: number;
    // eslint-disable-next-line
    protected event: any; // TODO TYPE THIS
    public eventId: string;
    private label: string;

    constructor(eventName: string, correlationId: string, eventLabel: string) {
        this.eventId = CryptoUtils.createNewGuid();
        this.label = eventLabel;
        this.event = {
            [prependEventNamePrefix(EVENT_NAME_KEY)]: eventName,
            [prependEventNamePrefix(ELAPSED_TIME_KEY)]: -1,
            [`${TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey}`]: correlationId
        };
    }

    private setElapsedTime(time: Number): void {
        this.event[prependEventNamePrefix(ELAPSED_TIME_KEY)] = time;
    }

    public stop(): void {
        // Set duration of event
        this.setElapsedTime(+Date.now() - +this.startTimestamp);

        endBrowserPerformanceMeasurement(this.displayName, this.perfStartMark, this.perfEndMark);
    }

    public start(): void {
        this.startTimestamp = Date.now();
        this.event[prependEventNamePrefix(START_TIME_KEY)] = this.startTimestamp;

        startBrowserPerformanceMeasurement(this.perfStartMark);
    }

    public get telemetryCorrelationId(): string {
        return this.event[`${TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey}`];
    }

    public set telemetryCorrelationId(value: string) {
        this.event[`${TELEMETRY_BLOB_EVENT_NAMES.MsalCorrelationIdConstStrKey}`] = value;
    }

    public get eventName(): string {
        return this.event[prependEventNamePrefix(EVENT_NAME_KEY)];
    }

    public get(): object {
        return {
            ...this.event,
            eventId: this.eventId
        };
    }

    public get key(): string {
        return `${this.telemetryCorrelationId}_${this.eventId}-${this.eventName}`;
    }

    public get displayName(): string {
        return `Msal-${this.label}-${this.telemetryCorrelationId}`;
    }

    private get perfStartMark() {
        return `start-${this.key}`;
    }

    private get perfEndMark() {
        return `end-${this.key}`;
    }
}
