import { OperationParameter, OperationQueryParameter, OperationURLParameter } from "./operationParameter";
import { OperationResponse } from "./operationResponse";
import { Serializer } from "./serializer";
import { HttpMethods } from "./webResource";
/**
 * A specification that defines an operation.
 */
export interface OperationSpec {
    /**
     * The serializer to use in this operation.
     */
    readonly serializer: Serializer;
    /**
     * The HTTP method that should be used by requests for this operation.
     */
    readonly httpMethod: HttpMethods;
    /**
     * The URL that was provided in the service's specification. This will still have all of the URL
     * template variables in it. If this is not provided when the OperationSpec is created, then it
     * will be populated by a "baseUri" property on the ServiceClient.
     */
    readonly baseUrl?: string;
    /**
     * The fixed path for this operation's URL. This will still have all of the URL template variables
     * in it.
     */
    readonly path?: string;
    /**
     * The content type of the request body. This value will be used as the "Content-Type" header if
     * it is provided.
     */
    readonly contentType?: string;
    /**
     * The parameter that will be used to construct the HTTP request's body.
     */
    readonly requestBody?: OperationParameter;
    /**
     * Whether or not this operation uses XML request and response bodies.
     */
    readonly isXML?: boolean;
    /**
     * The parameters to the operation method that will be substituted into the constructed URL.
     */
    readonly urlParameters?: ReadonlyArray<OperationURLParameter>;
    /**
     * The parameters to the operation method that will be added to the constructed URL's query.
     */
    readonly queryParameters?: ReadonlyArray<OperationQueryParameter>;
    /**
     * The parameters to the operation method that will be converted to headers on the operation's
     * HTTP request.
     */
    readonly headerParameters?: ReadonlyArray<OperationParameter>;
    /**
     * The parameters to the operation method that will be used to create a formdata body for the
     * operation's HTTP request.
     */
    readonly formDataParameters?: ReadonlyArray<OperationParameter>;
    /**
     * The different types of responses that this operation can return based on what status code is
     * returned.
     */
    readonly responses: {
        [responseCode: string]: OperationResponse;
    };
}
export declare function isStreamOperation(operationSpec: OperationSpec): boolean;
//# sourceMappingURL=operationSpec.d.ts.map