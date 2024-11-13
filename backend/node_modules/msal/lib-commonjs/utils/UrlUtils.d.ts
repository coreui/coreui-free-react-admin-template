import { IUri } from "../IUri";
import { ServerRequestParameters } from "../ServerRequestParameters";
/**
 * @hidden
 */
export declare class UrlUtils {
    /**
     * generates the URL with QueryString Parameters
     * @param scopes
     */
    static createNavigateUrl(serverRequestParams: ServerRequestParameters): string;
    /**
     * Generate the array of all QueryStringParams to be sent to the server
     * @param scopes
     */
    static createNavigationUrlString(serverRequestParams: ServerRequestParameters): Array<string>;
    /**
     * Returns current window URL as redirect uri
     */
    static getCurrentUrl(): string;
    /**
     * Returns given URL with query string removed
     */
    static removeHashFromUrl(url: string): string;
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    static replaceTenantPath(url: string, tenantId: string): string;
    static constructAuthorityUriFromObject(urlObject: IUri, pathArray: string[]): string;
    /**
     * Checks if an authority is common (ex. https://a:b/common/)
     * @param url The url
     * @returns true if authority is common and false otherwise
     */
    static isCommonAuthority(url: string): boolean;
    /**
     * Checks if an authority is for organizations (ex. https://a:b/organizations/)
     * @param url The url
     * @returns true if authority is for  and false otherwise
     */
    static isOrganizationsAuthority(url: string): boolean;
    /**
     * Checks if an authority is for consumers (ex. https://a:b/consumers/)
     * @param url The url
     * @returns true if authority is for  and false otherwise
     */
    static isConsumersAuthority(url: string): boolean;
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    static GetUrlComponents(url: string): IUri;
    /**
     * Given a url or path, append a trailing slash if one doesnt exist
     *
     * @param url
     */
    static CanonicalizeUri(url: string): string;
    /**
     * Checks to see if the url ends with the suffix
     * Required because we are compiling for es5 instead of es6
     * @param url
     * @param str
     */
    static endsWith(url: string, suffix: string): boolean;
    /**
     * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
     * @param url
     * @param name
     */
    static urlRemoveQueryStringParameter(url: string, name: string): string;
    /**
     * @hidden
     * @ignore
     *
     * Returns the anchor part(#) of the URL
     */
    static getHashFromUrl(urlStringOrFragment: string): string;
    /**
     * @hidden
     * Check if the url contains a hash with known properties
     * @ignore
     */
    static urlContainsHash(urlString: string): boolean;
    /**
     * @hidden
     * Returns deserialized portion of URL hash
     * @ignore
     */
    static deserializeHash(urlFragment: string): object;
    /**
     * @ignore
     * @param {string} URI
     * @returns {string} host from the URI
     *
     * extract URI from the host
     */
    static getHostFromUri(uri: string): string;
}
