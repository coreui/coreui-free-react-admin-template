export declare class ScopeSet {
    /**
     * Check if there are dup scopes in a given request
     *
     * @param cachedScopes
     * @param scopes
     */
    static isIntersectingScopes(cachedScopes: Array<string>, scopes: Array<string>): boolean;
    /**
     * Check if a given scope is present in the request
     *
     * @param cachedScopes
     * @param scopes
     */
    static containsScope(cachedScopes: Array<string>, scopes: Array<string>): boolean;
    /**
     *  Trims and converts string to lower case
     *
     * @param scopes
     */
    static trimAndConvertToLowerCase(scope: string): string;
    /**
     * Performs trimAndConvertToLowerCase on string array
     * @param scopes
     */
    static trimAndConvertArrayToLowerCase(scopes: Array<string>): Array<string>;
    /**
     * Trims each scope in scopes array
     * @param scopes
     */
    static trimScopes(scopes: Array<string>): Array<string>;
    /**
     * Remove one element from a scope array
     *
     * @param scopes
     * @param scope
     */
    static removeElement(scopes: Array<string>, scope: string): Array<string>;
    /**
     * Parse the scopes into a formatted scopeList
     * @param scopes
     */
    static parseScope(scopes: Array<string>): string;
    /**
     * @hidden
     *
     * Used to validate the scopes input parameter requested  by the developer.
     * @param {Array<string>} scopes - Developer requested permissions. Not all scopes are guaranteed to be included in the access token returned.
     * @param {boolean} scopesRequired - Boolean indicating whether the scopes array is required or not
     * @ignore
     */
    static validateInputScope(scopes: Array<string>, scopesRequired: boolean): void;
    /**
     * @hidden
     *
     * Extracts scope value from the state sent with the authentication request.
     * @param {string} state
     * @returns {string} scope.
     * @ignore
     */
    static getScopeFromState(state: string): string;
    /**
     * @ignore
     * Appends extraScopesToConsent if passed
     * @param {@link AuthenticationParameters}
     */
    static appendScopes(reqScopes: Array<string>, reqExtraScopesToConsent: Array<string>): Array<string>;
    /**
     * @ignore
     * Returns true if the scopes array only contains openid and/or profile
     */
    static onlyContainsOidcScopes(scopes: Array<string>): boolean;
    /**
     * @ignore
     * Returns true if the scopes array only contains openid and/or profile
     */
    static containsAnyOidcScopes(scopes: Array<string>): boolean;
    /**
     * @ignore
     * Returns true if the clientId is the only scope in the array
     */
    static onlyContainsClientId(scopes: Array<String>, clientId: string): boolean;
    /**
     * @ignore
     * Adds missing OIDC scopes to scopes array without duplication. Since STS requires OIDC scopes for
     * all implicit flow requests, 'openid' and 'profile' should always be included in the final request
     */
    static appendDefaultScopes(scopes: Array<string>): Array<string>;
    /**
     * @ignore
     * Removes present OIDC scopes from scopes array.
     */
    static removeDefaultScopes(scopes: Array<string>): Array<string>;
    /**
     * @ignore
     * Removes clientId from scopes array if included as only scope. If it's not the only scope, it is treated as a resource scope.
     * @param scopes Array<string>: Pre-normalized scopes array
     * @param clientId string: The application's clientId that is searched for in the scopes array
     */
    static translateClientIdIfSingleScope(scopes: Array<string>, clientId: string): Array<string>;
}
