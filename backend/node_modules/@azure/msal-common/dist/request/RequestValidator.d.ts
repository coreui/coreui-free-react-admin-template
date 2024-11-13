import { StringDict } from "../utils/MsalTypes";
/**
 * Validates server consumable params from the "request" objects
 */
export declare class RequestValidator {
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    static validateRedirectUri(redirectUri: string): void;
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    static validatePrompt(prompt: string): void;
    static validateClaims(claims: string): void;
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    static validateCodeChallengeParams(codeChallenge: string, codeChallengeMethod: string): void;
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    static validateCodeChallengeMethod(codeChallengeMethod: string): void;
    /**
     * Removes unnecessary or duplicate query parameters from extraQueryParameters
     * @param request
     */
    static sanitizeEQParams(eQParams: StringDict, queryParams: Map<string, string>): StringDict;
}
//# sourceMappingURL=RequestValidator.d.ts.map