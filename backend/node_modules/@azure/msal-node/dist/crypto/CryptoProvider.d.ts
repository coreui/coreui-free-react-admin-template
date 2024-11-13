import { ICrypto, PkceCodes } from "@azure/msal-common";
/**
 * This class implements MSAL node's crypto interface, which allows it to perform base64 encoding and decoding, generating cryptographically random GUIDs and
 * implementing Proof Key for Code Exchange specs for the OAuth Authorization Code Flow using PKCE (rfc here: https://tools.ietf.org/html/rfc7636).
 * @public
 */
export declare class CryptoProvider implements ICrypto {
    private pkceGenerator;
    constructor();
    /**
     * Creates a new random GUID - used to populate state and nonce.
     * @returns string (GUID)
     */
    createNewGuid(): string;
    /**
     * Encodes input string to base64.
     * @param input - string to be encoded
     */
    base64Encode(input: string): string;
    /**
     * Decodes input string from base64.
     * @param input - string to be decoded
     */
    base64Decode(input: string): string;
    /**
     * Generates PKCE codes used in Authorization Code Flow.
     */
    generatePkceCodes(): Promise<PkceCodes>;
    /**
     * Generates a keypair, stores it and returns a thumbprint - not yet implemented for node
     */
    getPublicKeyThumbprint(): Promise<string>;
    /**
     * Signs the given object as a jwt payload with private key retrieved by given kid - currently not implemented for node
     */
    signJwt(): Promise<string>;
}
//# sourceMappingURL=CryptoProvider.d.ts.map