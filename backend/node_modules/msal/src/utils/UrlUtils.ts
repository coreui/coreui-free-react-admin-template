/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IUri } from "../IUri";
import { Constants, SSOTypes, ServerHashParamKeys } from "./Constants";
import { ServerRequestParameters } from "../ServerRequestParameters";
import { ScopeSet } from "../ScopeSet";
import { StringUtils } from "./StringUtils";
import { CryptoUtils } from "./CryptoUtils";

/**
 * @hidden
 */
export class UrlUtils {

    /**
     * generates the URL with QueryString Parameters
     * @param scopes
     */
    static createNavigateUrl(serverRequestParams: ServerRequestParameters): string {
        const str = this.createNavigationUrlString(serverRequestParams);
        let authEndpoint: string = serverRequestParams.authorityInstance.AuthorizationEndpoint;
        // if the endpoint already has queryparams, lets add to it, otherwise add the first one
        if (authEndpoint.indexOf("?") < 0) {
            authEndpoint += "?";
        } else {
            authEndpoint += "&";
        }

        const requestUrl: string = `${authEndpoint}${str.join("&")}`;
        return requestUrl;
    }

    /**
     * Generate the array of all QueryStringParams to be sent to the server
     * @param scopes
     */
    static createNavigationUrlString(serverRequestParams: ServerRequestParameters): Array<string> {
        const scopes = ScopeSet.appendDefaultScopes(serverRequestParams.scopes);

        const str: Array<string> = [];
        str.push("response_type=" + serverRequestParams.responseType);
        str.push("scope=" + encodeURIComponent(ScopeSet.parseScope(scopes)));
        str.push("client_id=" + encodeURIComponent(serverRequestParams.clientId));
        str.push("redirect_uri=" + encodeURIComponent(serverRequestParams.redirectUri));

        str.push("state=" + encodeURIComponent(serverRequestParams.state));
        str.push("nonce=" + encodeURIComponent(serverRequestParams.nonce));

        str.push("client_info=1");
        str.push(`x-client-SKU=${serverRequestParams.xClientSku}`);
        str.push(`x-client-Ver=${serverRequestParams.xClientVer}`);
        if (serverRequestParams.promptValue) {
            str.push("prompt=" + encodeURIComponent(serverRequestParams.promptValue));
        }

        if (serverRequestParams.claimsValue) {
            str.push("claims=" + encodeURIComponent(serverRequestParams.claimsValue));
        }

        if (serverRequestParams.queryParameters) {
            str.push(serverRequestParams.queryParameters);
        }

        if (serverRequestParams.extraQueryParameters) {
            str.push(serverRequestParams.extraQueryParameters);
        }

        str.push("client-request-id=" + encodeURIComponent(serverRequestParams.correlationId));
        return str;
    }

    /**
     * Returns current window URL as redirect uri
     */
    static getCurrentUrl(): string {
        return window.location.href.split("?")[0].split("#")[0];
    }

    /**
     * Returns given URL with query string removed
     */
    static removeHashFromUrl(url: string): string {
        return url.split("#")[0];
    }

    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    static replaceTenantPath(url: string, tenantId: string): string {
        const lowerCaseUrl = url.toLowerCase();
        const urlObject = this.GetUrlComponents(lowerCaseUrl);
        const pathArray = urlObject.PathSegments;
        if (tenantId && (pathArray.length !== 0 && (pathArray[0] === Constants.common || pathArray[0] === SSOTypes.ORGANIZATIONS || pathArray[0] === SSOTypes.CONSUMERS))) {
            pathArray[0] = tenantId;
        }
        return this.constructAuthorityUriFromObject(urlObject, pathArray);
    }

    static constructAuthorityUriFromObject(urlObject: IUri, pathArray: string[]): string {
        return this.CanonicalizeUri(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/"));
    }
    
    /**
     * Checks if an authority is common (ex. https://a:b/common/)
     * @param url The url
     * @returns true if authority is common and false otherwise 
     */
    static isCommonAuthority(url: string): boolean {
        const authority =  this.CanonicalizeUri(url);
        const pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === Constants.common);
    }

    /**
     * Checks if an authority is for organizations (ex. https://a:b/organizations/)
     * @param url The url
     * @returns true if authority is for  and false otherwise 
     */
    static isOrganizationsAuthority(url: string): boolean {
        const authority =  this.CanonicalizeUri(url);
        const pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === SSOTypes.ORGANIZATIONS);
    }

    /**
     * Checks if an authority is for consumers (ex. https://a:b/consumers/)
     * @param url The url
     * @returns true if authority is for  and false otherwise 
     */
    static isConsumersAuthority(url: string): boolean {
        const authority =  this.CanonicalizeUri(url);
        const pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === SSOTypes.CONSUMERS);
    }

    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    static GetUrlComponents(url: string): IUri {
        if (!url) {
            throw "Url required";
        }

        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        const regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");

        const match = url.match(regEx);

        if (!match || match.length < 6) {
            throw "Valid url required";
        }

        const urlComponents = <IUri>{
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5]
        };

        let pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter((val) => val && val.length > 0); // remove empty elements
        urlComponents.PathSegments = pathSegments;

        if (match[6]){
            urlComponents.Search = match[6];
        }
        if (match[8]){
            urlComponents.Hash = match[8];
        }
        
        return urlComponents;
    }

    /**
     * Given a url or path, append a trailing slash if one doesnt exist
     *
     * @param url
     */
    static CanonicalizeUri(url: string): string {
        if (url) {
            let lowerCaseUrl = url.toLowerCase();

            if (!UrlUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }

            return lowerCaseUrl;
        }

        return url;
    }

    /**
     * Checks to see if the url ends with the suffix
     * Required because we are compiling for es5 instead of es6
     * @param url
     * @param str
     */
    // TODO: Rename this, not clear what it is supposed to do
    static endsWith(url: string, suffix: string): boolean {
        if (!url || !suffix) {
            return false;
        }

        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    }

    /**
     * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
     * @param url
     * @param name
     */
    static urlRemoveQueryStringParameter(url: string, name: string): string {
        if (StringUtils.isEmpty(url)) {
            return url;
        }

        let updatedUrl = url;
        let regex = new RegExp("(\\&" + name + "=)[^\&]+");
        updatedUrl = url.replace(regex, "");
        // name=value&
        regex = new RegExp("(" + name + "=)[^\&]+&");
        updatedUrl = url.replace(regex, "");
        // name=value
        regex = new RegExp("(" + name + "=)[^\&]+");
        updatedUrl = url.replace(regex, "");
        return updatedUrl;
    }

    /**
     * @hidden
     * @ignore
     *
     * Returns the anchor part(#) of the URL
     */
    static getHashFromUrl(urlStringOrFragment: string): string {
        const hashIndex1 = urlStringOrFragment.indexOf("#");
        const hashIndex2 = urlStringOrFragment.indexOf("#/");
        if (hashIndex2 > -1) {
            return urlStringOrFragment.substring(hashIndex2 + 2);
        } else if (hashIndex1 > -1) {
            return urlStringOrFragment.substring(hashIndex1 + 1);
        }
        return urlStringOrFragment;
    }

    /**
     * @hidden
     * Check if the url contains a hash with known properties
     * @ignore
     */
    static urlContainsHash(urlString: string): boolean {
        const parameters = UrlUtils.deserializeHash(urlString);
        return (
            parameters.hasOwnProperty(ServerHashParamKeys.ERROR_DESCRIPTION) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ERROR) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ACCESS_TOKEN) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ID_TOKEN)
        );
    }

    /**
     * @hidden
     * Returns deserialized portion of URL hash
     * @ignore
     */
    static deserializeHash(urlFragment: string): object {
        const hash = UrlUtils.getHashFromUrl(urlFragment);
        return CryptoUtils.deserialize(hash);
    }

    /**
     * @ignore
     * @param {string} URI
     * @returns {string} host from the URI
     *
     * extract URI from the host
     */
    static getHostFromUri(uri: string): string {
        // remove http:// or https:// from uri
        let extractedUri = String(uri).replace(/^(https?:)\/\//, "");
        extractedUri = extractedUri.split("/")[0];
        return extractedUri;
    }
}
