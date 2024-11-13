import TelemetryEvent from "./TelemetryEvent";
import { EventCount, TelemetryPlatform } from "./TelemetryTypes";
export default class DefaultEvent extends TelemetryEvent {
    constructor(platform: TelemetryPlatform, correlationId: string, clientId: string, eventCount: EventCount);
    private getEventCount;
}
