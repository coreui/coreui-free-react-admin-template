import TelemetryEvent from "./TelemetryEvent";
export declare const EVENT_KEYS: {
    USER_CANCELLED: string;
    ACCESS_DENIED: string;
};
export default class UiEvent extends TelemetryEvent {
    constructor(correlationId: string);
    set userCancelled(userCancelled: boolean);
    set accessDenied(accessDenied: boolean);
}
