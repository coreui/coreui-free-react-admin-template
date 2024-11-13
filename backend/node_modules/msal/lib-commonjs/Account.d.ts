import { ClientInfo } from "./ClientInfo";
import { IdToken } from "./IdToken";
import { StringDict } from "./MsalTypes";
/**
 * accountIdentifier       combination of idToken.uid and idToken.utid
 * homeAccountIdentifier   combination of clientInfo.uid and clientInfo.utid
 * userName                idToken.preferred_username
 * name                    idToken.name
 * idToken                 idToken
 * sid                     idToken.sid - session identifier
 * environment             idtoken.issuer (the authority that issues the token)
 */
export declare class Account {
    accountIdentifier: string;
    homeAccountIdentifier: string;
    userName: string;
    name: string;
    idToken: StringDict;
    idTokenClaims: StringDict;
    sid: string;
    environment: string;
    /**
     * Creates an Account Object
     * @praram accountIdentifier
     * @param homeAccountIdentifier
     * @param userName
     * @param name
     * @param idToken
     * @param sid
     * @param environment
     */
    constructor(accountIdentifier: string, homeAccountIdentifier: string, userName: string, name: string, idTokenClaims: StringDict, sid: string, environment: string);
    /**
     * @hidden
     * @param idToken
     * @param clientInfo
     */
    static createAccount(idToken: IdToken, clientInfo: ClientInfo): Account;
    /**
     * Utils function to compare two Account objects - used to check if the same user account is logged in
     *
     * @param a1: Account object
     * @param a2: Account object
     */
    static compareAccounts(a1: Account, a2: Account): boolean;
}
