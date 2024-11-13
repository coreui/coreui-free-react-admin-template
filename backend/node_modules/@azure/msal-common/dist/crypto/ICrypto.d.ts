import { BaseAuthRequest } from "../request/BaseAuthRequest";
import { SignedHttpRequest } from "./SignedHttpRequest";
/**
 * The PkceCodes type describes the structure
 * of objects that contain PKCE code
 * challenge and verifier pairs
 */
export declare type PkceCodes = {
    verifier: string;
    challenge: string;
};
/**
 * Interface for crypto functions used by library
 */
export interface ICrypto {
    /**
     * Creates a guid randomly.
     */
    createNewGuid(): string;
    /**
     * base64 Encode string
     * @param input
     */
    base64Encode(input: string): string;
    /**
     * base64 decode string
     * @param input
     */
    base64Decode(input: string): string;
    /**
     * Generate PKCE codes for OAuth. See RFC here: https://tools.ietf.org/html/rfc7636
     */
    generatePkceCodes(): Promise<PkceCodes>;
    /**
     * Generates an JWK RSA S256 Thumbprint
     * @param request
     */
    getPublicKeyThumbprint(request: BaseAuthRequest): Promise<string>;
    /**
     * Returns a signed proof-of-possession token with a given acces token that contains a cnf claim with the required kid.
     * @param accessToken
     */
    signJwt(payload: SignedHttpRequest, kid: string): Promise<string>;
}
export declare const DEFAULT_CRYPTO_IMPLEMENTATION: ICrypto;
//# sourceMappingURL=ICrypto.d.ts.map