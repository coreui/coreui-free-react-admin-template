import { PkceCodes } from "@azure/msal-common";
/**
 * https://tools.ietf.org/html/rfc7636#page-8
 */
export declare class PkceGenerator {
    /**
     * generates the codeVerfier and the challenge from the codeVerfier
     * reference: https://tools.ietf.org/html/rfc7636#section-4.1 and https://tools.ietf.org/html/rfc7636#section-4.2
     */
    generatePkceCodes(): Promise<PkceCodes>;
    /**
     * generates the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.1
     */
    private generateCodeVerifier;
    /**
     * generate the challenge from the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.2
     * @param codeVerifier
     */
    private generateCodeChallengeFromVerifier;
    /**
     * generate 'SHA256' hash
     * @param buffer
     */
    private sha256;
    /**
     * Accepted characters; reference: https://tools.ietf.org/html/rfc7636#section-4.1
     * @param buffer
     */
    private bufferToCVString;
}
//# sourceMappingURL=PkceGenerator.d.ts.map