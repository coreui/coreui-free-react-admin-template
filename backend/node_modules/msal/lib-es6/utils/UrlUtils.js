/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { Constants, SSOTypes, ServerHashParamKeys } from "./Constants";
import { ScopeSet } from "../ScopeSet";
import { StringUtils } from "./StringUtils";
import { CryptoUtils } from "./CryptoUtils";
/**
 * @hidden
 */
var UrlUtils = /** @class */ (function () {
    function UrlUtils() {
    }
    /**
     * generates the URL with QueryString Parameters
     * @param scopes
     */
    UrlUtils.createNavigateUrl = function (serverRequestParams) {
        var str = this.createNavigationUrlString(serverRequestParams);
        var authEndpoint = serverRequestParams.authorityInstance.AuthorizationEndpoint;
        // if the endpoint already has queryparams, lets add to it, otherwise add the first one
        if (authEndpoint.indexOf("?") < 0) {
            authEndpoint += "?";
        }
        else {
            authEndpoint += "&";
        }
        var requestUrl = "" + authEndpoint + str.join("&");
        return requestUrl;
    };
    /**
     * Generate the array of all QueryStringParams to be sent to the server
     * @param scopes
     */
    UrlUtils.createNavigationUrlString = function (serverRequestParams) {
        var scopes = ScopeSet.appendDefaultScopes(serverRequestParams.scopes);
        var str = [];
        str.push("response_type=" + serverRequestParams.responseType);
        str.push("scope=" + encodeURIComponent(ScopeSet.parseScope(scopes)));
        str.push("client_id=" + encodeURIComponent(serverRequestParams.clientId));
        str.push("redirect_uri=" + encodeURIComponent(serverRequestParams.redirectUri));
        str.push("state=" + encodeURIComponent(serverRequestParams.state));
        str.push("nonce=" + encodeURIComponent(serverRequestParams.nonce));
        str.push("client_info=1");
        str.push("x-client-SKU=" + serverRequestParams.xClientSku);
        str.push("x-client-Ver=" + serverRequestParams.xClientVer);
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
    };
    /**
     * Returns current window URL as redirect uri
     */
    UrlUtils.getCurrentUrl = function () {
        return window.location.href.split("?")[0].split("#")[0];
    };
    /**
     * Returns given URL with query string removed
     */
    UrlUtils.removeHashFromUrl = function (url) {
        return url.split("#")[0];
    };
    /**
     * Given a url like https://a:b/common/d?e=f#g, and a tenantId, returns https://a:b/tenantId/d
     * @param href The url
     * @param tenantId The tenant id to replace
     */
    UrlUtils.replaceTenantPath = function (url, tenantId) {
        var lowerCaseUrl = url.toLowerCase();
        var urlObject = this.GetUrlComponents(lowerCaseUrl);
        var pathArray = urlObject.PathSegments;
        if (tenantId && (pathArray.length !== 0 && (pathArray[0] === Constants.common || pathArray[0] === SSOTypes.ORGANIZATIONS || pathArray[0] === SSOTypes.CONSUMERS))) {
            pathArray[0] = tenantId;
        }
        return this.constructAuthorityUriFromObject(urlObject, pathArray);
    };
    UrlUtils.constructAuthorityUriFromObject = function (urlObject, pathArray) {
        return this.CanonicalizeUri(urlObject.Protocol + "//" + urlObject.HostNameAndPort + "/" + pathArray.join("/"));
    };
    /**
     * Checks if an authority is common (ex. https://a:b/common/)
     * @param url The url
     * @returns true if authority is common and false otherwise
     */
    UrlUtils.isCommonAuthority = function (url) {
        var authority = this.CanonicalizeUri(url);
        var pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === Constants.common);
    };
    /**
     * Checks if an authority is for organizations (ex. https://a:b/organizations/)
     * @param url The url
     * @returns true if authority is for  and false otherwise
     */
    UrlUtils.isOrganizationsAuthority = function (url) {
        var authority = this.CanonicalizeUri(url);
        var pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === SSOTypes.ORGANIZATIONS);
    };
    /**
     * Checks if an authority is for consumers (ex. https://a:b/consumers/)
     * @param url The url
     * @returns true if authority is for  and false otherwise
     */
    UrlUtils.isConsumersAuthority = function (url) {
        var authority = this.CanonicalizeUri(url);
        var pathArray = this.GetUrlComponents(authority).PathSegments;
        return (pathArray.length !== 0 && pathArray[0] === SSOTypes.CONSUMERS);
    };
    /**
     * Parses out the components from a url string.
     * @returns An object with the various components. Please cache this value insted of calling this multiple times on the same url.
     */
    UrlUtils.GetUrlComponents = function (url) {
        if (!url) {
            throw "Url required";
        }
        // https://gist.github.com/curtisz/11139b2cfcaef4a261e0
        var regEx = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
        var match = url.match(regEx);
        if (!match || match.length < 6) {
            throw "Valid url required";
        }
        var urlComponents = {
            Protocol: match[1],
            HostNameAndPort: match[4],
            AbsolutePath: match[5]
        };
        var pathSegments = urlComponents.AbsolutePath.split("/");
        pathSegments = pathSegments.filter(function (val) { return val && val.length > 0; }); // remove empty elements
        urlComponents.PathSegments = pathSegments;
        if (match[6]) {
            urlComponents.Search = match[6];
        }
        if (match[8]) {
            urlComponents.Hash = match[8];
        }
        return urlComponents;
    };
    /**
     * Given a url or path, append a trailing slash if one doesnt exist
     *
     * @param url
     */
    UrlUtils.CanonicalizeUri = function (url) {
        if (url) {
            var lowerCaseUrl = url.toLowerCase();
            if (!UrlUtils.endsWith(lowerCaseUrl, "/")) {
                lowerCaseUrl += "/";
            }
            return lowerCaseUrl;
        }
        return url;
    };
    /**
     * Checks to see if the url ends with the suffix
     * Required because we are compiling for es5 instead of es6
     * @param url
     * @param str
     */
    // TODO: Rename this, not clear what it is supposed to do
    UrlUtils.endsWith = function (url, suffix) {
        if (!url || !suffix) {
            return false;
        }
        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    };
    /**
     * Utils function to remove the login_hint and domain_hint from the i/p extraQueryParameters
     * @param url
     * @param name
     */
    UrlUtils.urlRemoveQueryStringParameter = function (url, name) {
        if (StringUtils.isEmpty(url)) {
            return url;
        }
        var updatedUrl = url;
        var regex = new RegExp("(\\&" + name + "=)[^\&]+");
        updatedUrl = url.replace(regex, "");
        // name=value&
        regex = new RegExp("(" + name + "=)[^\&]+&");
        updatedUrl = url.replace(regex, "");
        // name=value
        regex = new RegExp("(" + name + "=)[^\&]+");
        updatedUrl = url.replace(regex, "");
        return updatedUrl;
    };
    /**
     * @hidden
     * @ignore
     *
     * Returns the anchor part(#) of the URL
     */
    UrlUtils.getHashFromUrl = function (urlStringOrFragment) {
        var hashIndex1 = urlStringOrFragment.indexOf("#");
        var hashIndex2 = urlStringOrFragment.indexOf("#/");
        if (hashIndex2 > -1) {
            return urlStringOrFragment.substring(hashIndex2 + 2);
        }
        else if (hashIndex1 > -1) {
            return urlStringOrFragment.substring(hashIndex1 + 1);
        }
        return urlStringOrFragment;
    };
    /**
     * @hidden
     * Check if the url contains a hash with known properties
     * @ignore
     */
    UrlUtils.urlContainsHash = function (urlString) {
        var parameters = UrlUtils.deserializeHash(urlString);
        return (parameters.hasOwnProperty(ServerHashParamKeys.ERROR_DESCRIPTION) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ERROR) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ACCESS_TOKEN) ||
            parameters.hasOwnProperty(ServerHashParamKeys.ID_TOKEN));
    };
    /**
     * @hidden
     * Returns deserialized portion of URL hash
     * @ignore
     */
    UrlUtils.deserializeHash = function (urlFragment) {
        var hash = UrlUtils.getHashFromUrl(urlFragment);
        return CryptoUtils.deserialize(hash);
    };
    /**
     * @ignore
     * @param {string} URI
     * @returns {string} host from the URI
     *
     * extract URI from the host
     */
    UrlUtils.getHostFromUri = function (uri) {
        // remove http:// or https:// from uri
        var extractedUri = String(uri).replace(/^(https?:)\/\//, "");
        extractedUri = extractedUri.split("/")[0];
        return extractedUri;
    };
    return UrlUtils;
}());
export { UrlUtils };
//# sourceMappingURL=UrlUtils.js.map