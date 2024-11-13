import { AuthResponse } from "../AuthResponse";
import { Account } from "../Account";
import { IdToken } from "../IdToken";
import { ServerRequestParameters } from "../ServerRequestParameters";
/**
 * @hidden
 */
export declare class ResponseUtils {
    static setResponseIdToken(originalResponse: AuthResponse, idTokenObj: IdToken): AuthResponse;
    static buildAuthResponse(idToken: IdToken, authResponse: AuthResponse, serverAuthenticationRequest: ServerRequestParameters, account: Account, scopes: Array<string>, accountState: string): AuthResponse;
}
