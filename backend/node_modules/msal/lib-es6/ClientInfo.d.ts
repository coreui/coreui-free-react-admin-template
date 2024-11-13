import { IdToken } from "./IdToken";
/**
 * @hidden
 */
export declare class ClientInfo {
    private _uid;
    get uid(): string;
    set uid(uid: string);
    private _utid;
    get utid(): string;
    set utid(utid: string);
    static createClientInfoFromIdToken(idToken: IdToken, authority: string): ClientInfo;
    constructor(rawClientInfo: string, authority: string);
    static stripPolicyFromUid(uid: string, authority: string): string;
    encodeClientInfo(): string;
}
