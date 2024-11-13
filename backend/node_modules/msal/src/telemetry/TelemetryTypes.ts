/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import TelemetryEvent from "./TelemetryEvent";

export interface InProgressEvents { [key: string] : TelemetryEvent; }
export interface EventCount { [eventName: string] : number; }
export interface EventCountByCorrelationId { [correlationId: string] : EventCount; }
export interface CompletedEvents { [correlationId: string ] : Array<TelemetryEvent>; }

export type TelemetryEmitter = (events: Array<object>) => void;

// SDK SHOULD BE DEFAULTED and Pulled from Package
export interface TelemetryPlatform {
    sdk?: string;
    sdkVersion?: string;
    applicationName: string;
    applicationVersion: string;
    networkInformation?: NetworkInformation
}

export interface TelemetryConfig {
    platform: TelemetryPlatform;
    onlySendFailureTelemetry?: boolean;
    clientId: string;
}

// In the browser this commes from navigator.connection
export interface NetworkInformation {
    connectionSpeed: string;
}
