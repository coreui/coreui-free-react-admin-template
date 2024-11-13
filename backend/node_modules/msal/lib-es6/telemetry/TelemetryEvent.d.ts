export default class TelemetryEvent {
    private startTimestamp;
    protected event: any;
    eventId: string;
    private label;
    constructor(eventName: string, correlationId: string, eventLabel: string);
    private setElapsedTime;
    stop(): void;
    start(): void;
    get telemetryCorrelationId(): string;
    set telemetryCorrelationId(value: string);
    get eventName(): string;
    get(): object;
    get key(): string;
    get displayName(): string;
    private get perfStartMark();
    private get perfEndMark();
}
