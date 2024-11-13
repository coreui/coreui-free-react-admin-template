import { Account } from "./Account";
import { IdToken } from "./IdToken";
import { StringDict } from "./MsalTypes";
export declare type AuthResponse = {
    uniqueId: string;
    tenantId: string;
    tokenType: string;
    idToken: IdToken;
    idTokenClaims: StringDict;
    accessToken: string;
    scopes: Array<string>;
    expiresOn: Date;
    account: Account;
    accountState: string;
    fromCache: boolean;
};
export declare function buildResponseStateOnly(state: string): AuthResponse;
