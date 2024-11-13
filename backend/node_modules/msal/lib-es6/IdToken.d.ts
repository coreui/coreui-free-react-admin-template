import { StringDict } from "./MsalTypes";
/**
 * @hidden
 */
export declare class IdToken {
    issuer: string;
    objectId: string;
    subject: string;
    tenantId: string;
    version: string;
    preferredName: string;
    name: string;
    homeObjectId: string;
    nonce: string;
    expiration: string;
    rawIdToken: string;
    claims: StringDict;
    sid: string;
    cloudInstance: string;
    constructor(rawIdToken: string);
}
