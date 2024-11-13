import { TokenClaims } from "./TokenClaims";
import { ICrypto } from "../crypto/ICrypto";
/**
 * JWT Token representation class. Parses token string and generates claims object.
 */
export declare class AuthToken {
    rawToken: string;
    claims: TokenClaims;
    constructor(rawToken: string, crypto: ICrypto);
    /**
     * Extract token by decoding the rawToken
     *
     * @param encodedToken
     */
    static extractTokenClaims(encodedToken: string, crypto: ICrypto): TokenClaims;
}
//# sourceMappingURL=AuthToken.d.ts.map