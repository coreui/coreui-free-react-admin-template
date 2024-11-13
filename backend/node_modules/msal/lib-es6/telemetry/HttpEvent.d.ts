import TelemetryEvent from "./TelemetryEvent";
import { StringDict } from "../MsalTypes";
export declare const EVENT_KEYS: {
    HTTP_PATH: string;
    USER_AGENT: string;
    QUERY_PARAMETERS: string;
    API_VERSION: string;
    RESPONSE_CODE: string;
    O_AUTH_ERROR_CODE: string;
    HTTP_METHOD: string;
    REQUEST_ID_HEADER: string;
    SPE_INFO: string;
    SERVER_ERROR_CODE: string;
    SERVER_SUB_ERROR_CODE: string;
    URL: string;
};
export default class HttpEvent extends TelemetryEvent {
    constructor(correlationId: string, eventLabel: string);
    set url(url: string);
    set httpPath(httpPath: string);
    set userAgent(userAgent: string);
    set queryParams(queryParams: StringDict);
    set apiVersion(apiVersion: string);
    set httpResponseStatus(statusCode: number);
    set oAuthErrorCode(errorCode: string);
    set httpMethod(httpMethod: string);
    set requestIdHeader(requestIdHeader: string);
    /**
     * Indicates whether the request was executed on a ring serving SPE traffic.
     * An empty string indicates this occurred on an outer ring, and the string "I"
     * indicates the request occurred on the inner ring
     */
    set speInfo(speInfo: string);
    set serverErrorCode(errorCode: string);
    set serverSubErrorCode(subErrorCode: string);
}
