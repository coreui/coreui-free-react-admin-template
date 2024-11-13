import { ServiceClientCredentials } from "@azure/ms-rest-js";
export interface TokenResponse {
    readonly tokenType: string;
    readonly accessToken: string;
    readonly [x: string]: any;
}
export interface TokenClientCredentials extends ServiceClientCredentials {
    getToken<TTokenResponse extends TokenResponse>(): Promise<TokenResponse | TTokenResponse>;
}
//# sourceMappingURL=tokenClientCredentials.d.ts.map