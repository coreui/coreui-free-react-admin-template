import { AuthenticationParameters } from "../AuthenticationParameters";
import { InteractionType } from "./Constants";
import { StringDict } from "../MsalTypes";
export declare type LibraryStateObject = {
    id: string;
    ts: number;
    method: string;
};
/**
 * @hidden
 */
export declare class RequestUtils {
    /**
     * @ignore
     *
     * @param request
     * @param isLoginCall
     * @param cacheStorage
     * @param clientId
     *
     * validates all request parameters and generates a consumable request object
     */
    static validateRequest(request: AuthenticationParameters, isLoginCall: boolean, clientId: string, interactionType: InteractionType): AuthenticationParameters;
    /**
     * @ignore
     *
     * Utility to test if valid prompt value is passed in the request
     * @param request
     */
    static validatePromptParameter(prompt: string): void;
    /**
     * @ignore
     *
     * Removes unnecessary or duplicate query parameters from extraQueryParameters
     * @param request
     */
    static validateEQParameters(extraQueryParameters: StringDict, claimsRequest: string): StringDict;
    /**
     * @ignore
     *
     * Validates the claims passed in request is a JSON
     * TODO: More validation will be added when the server team tells us how they have actually implemented claims
     * @param claimsRequest
     */
    static validateClaimsRequest(claimsRequest: string): void;
    /**
     * @ignore
     *
     * generate unique state per request
     * @param userState User-provided state value
     * @returns State string include library state and user state
     */
    static validateAndGenerateState(userState: string, interactionType: InteractionType): string;
    /**
     * Generates the state value used by the library.
     *
     * @returns Base64 encoded string representing the state
     */
    static generateLibraryState(interactionType: InteractionType): string;
    /**
     * Decodes the state value into a StateObject
     *
     * @param state State value returned in the request
     * @returns Parsed values from the encoded state value
     */
    static parseLibraryState(state: string): LibraryStateObject;
    /**
     * @ignore
     *
     * validate correlationId and generate if not valid or not set by the user
     * @param correlationId
     */
    static validateAndGenerateCorrelationId(correlationId: string): string;
    /**
     * Create a request signature
     * @param request
     */
    static createRequestSignature(request: AuthenticationParameters): string;
}
