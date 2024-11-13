import TelemetryEvent from "./TelemetryEvent";
import { TelemetryConfig, TelemetryEmitter } from "./TelemetryTypes";
import ApiEvent, { API_EVENT_IDENTIFIER } from "./ApiEvent";
import { Logger } from "../Logger";
import HttpEvent from "./HttpEvent";
export default class TelemetryManager {
    private completedEvents;
    private inProgressEvents;
    private eventCountByCorrelationId;
    private onlySendFailureTelemetry;
    private telemetryPlatform;
    private clientId;
    private telemetryEmitter;
    private logger;
    constructor(config: TelemetryConfig, telemetryEmitter: TelemetryEmitter, logger: Logger);
    static getTelemetrymanagerStub(clientId: string, logger: Logger): TelemetryManager;
    startEvent(event: TelemetryEvent): void;
    stopEvent(event: TelemetryEvent): void;
    flush(correlationId: string): void;
    createAndStartApiEvent(correlationId: string, apiEventIdentifier: API_EVENT_IDENTIFIER): ApiEvent;
    stopAndFlushApiEvent(correlationId: string, apiEvent: ApiEvent, wasSuccessful: boolean, errorCode?: string): void;
    createAndStartHttpEvent(correlation: string, httpMethod: string, url: string, eventLabel: string): HttpEvent;
    private incrementEventCount;
    private getOrphanedEvents;
}
