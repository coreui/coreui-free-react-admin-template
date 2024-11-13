import { __extends } from "tslib";
import * as utils from "../util/utils";
import { BaseRequestPolicy, } from "./requestPolicy";
export function rpRegistrationPolicy(retryTimeout) {
    if (retryTimeout === void 0) { retryTimeout = 30; }
    return {
        create: function (nextPolicy, options) {
            return new RPRegistrationPolicy(nextPolicy, options, retryTimeout);
        },
    };
}
var RPRegistrationPolicy = /** @class */ (function (_super) {
    __extends(RPRegistrationPolicy, _super);
    function RPRegistrationPolicy(nextPolicy, options, _retryTimeout) {
        if (_retryTimeout === void 0) { _retryTimeout = 30; }
        var _this = _super.call(this, nextPolicy, options) || this;
        _this._retryTimeout = _retryTimeout;
        return _this;
    }
    RPRegistrationPolicy.prototype.sendRequest = function (request) {
        var _this = this;
        return this._nextPolicy
            .sendRequest(request.clone())
            .then(function (response) { return registerIfNeeded(_this, request, response); });
    };
    return RPRegistrationPolicy;
}(BaseRequestPolicy));
export { RPRegistrationPolicy };
function registerIfNeeded(policy, request, response) {
    if (response.status === 409) {
        var rpName = checkRPNotRegisteredError(response.bodyAsText);
        if (rpName) {
            var urlPrefix = extractSubscriptionUrl(request.url);
            return (registerRP(policy, urlPrefix, rpName, request)
                // Autoregistration of ${provider} failed for some reason. We will not return this error
                // instead will return the initial response with 409 status code back to the user.
                // do nothing here as we are returning the original response at the end of this method.
                .catch(function () { return false; })
                .then(function (registrationStatus) {
                if (registrationStatus) {
                    // Retry the original request. We have to change the x-ms-client-request-id
                    // otherwise Azure endpoint will return the initial 409 (cached) response.
                    request.headers.set("x-ms-client-request-id", utils.generateUuid());
                    return policy._nextPolicy.sendRequest(request.clone());
                }
                return response;
            }));
        }
    }
    return Promise.resolve(response);
}
/**
 * Reuses the headers of the original request and url (if specified).
 * @param {WebResourceLike} originalRequest The original request
 * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
 * @returns {object} A new request object with desired headers.
 */
function getRequestEssentials(originalRequest, reuseUrlToo) {
    if (reuseUrlToo === void 0) { reuseUrlToo = false; }
    var reqOptions = originalRequest.clone();
    if (reuseUrlToo) {
        reqOptions.url = originalRequest.url;
    }
    // We have to change the x-ms-client-request-id otherwise Azure endpoint
    // will return the initial 409 (cached) response.
    reqOptions.headers.set("x-ms-client-request-id", utils.generateUuid());
    // Set content-type to application/json
    reqOptions.headers.set("Content-Type", "application/json; charset=utf-8");
    return reqOptions;
}
/**
 * Validates the error code and message associated with 409 response status code. If it matches to that of
 * RP not registered then it returns the name of the RP else returns undefined.
 * @param {string} body The response body received after making the original request.
 * @returns {string} The name of the RP if condition is satisfied else undefined.
 */
function checkRPNotRegisteredError(body) {
    var result, responseBody;
    if (body) {
        try {
            responseBody = JSON.parse(body);
        }
        catch (err) {
            // do nothing;
        }
        if (responseBody &&
            responseBody.error &&
            responseBody.error.message &&
            responseBody.error.code &&
            responseBody.error.code === "MissingSubscriptionRegistration") {
            var matchRes = responseBody.error.message.match(/.*'(.*)'/i);
            if (matchRes) {
                result = matchRes.pop();
            }
        }
    }
    return result;
}
/**
 * Extracts the first part of the URL, just after subscription:
 * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
 * @param {string} url The original request url
 * @returns {string} The url prefix as explained above.
 */
function extractSubscriptionUrl(url) {
    var result;
    var matchRes = url.match(/.*\/subscriptions\/[a-f0-9-]+\//gi);
    if (matchRes && matchRes[0]) {
        result = matchRes[0];
    }
    else {
        throw new Error("Unable to extract subscriptionId from the given url - " + url + ".");
    }
    return result;
}
/**
 * Registers the given provider.
 * @param {RPRegistrationPolicy} policy The RPRegistrationPolicy this function is being called against.
 * @param {string} urlPrefix https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
 * @param {string} provider The provider name to be registered.
 * @param {WebResourceLike} originalRequest The original request sent by the user that returned a 409 response
 * with a message that the provider is not registered.
 * @param {registrationCallback} callback The callback that handles the RP registration
 */
function registerRP(policy, urlPrefix, provider, originalRequest) {
    var postUrl = urlPrefix + "providers/" + provider + "/register?api-version=2016-02-01";
    var getUrl = urlPrefix + "providers/" + provider + "?api-version=2016-02-01";
    var reqOptions = getRequestEssentials(originalRequest);
    reqOptions.method = "POST";
    reqOptions.url = postUrl;
    return policy._nextPolicy.sendRequest(reqOptions).then(function (response) {
        if (response.status !== 200) {
            throw new Error("Autoregistration of " + provider + " failed. Please try registering manually.");
        }
        return getRegistrationStatus(policy, getUrl, originalRequest);
    });
}
/**
 * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
 * Polling will happen till the registrationState property of the response body is "Registered".
 * @param {RPRegistrationPolicy} policy The RPRegistrationPolicy this function is being called against.
 * @param {string} url The request url for polling
 * @param {WebResourceLike} originalRequest The original request sent by the user that returned a 409 response
 * with a message that the provider is not registered.
 * @returns {Promise<boolean>} True if RP Registration is successful.
 */
function getRegistrationStatus(policy, url, originalRequest) {
    var reqOptions = getRequestEssentials(originalRequest);
    reqOptions.url = url;
    reqOptions.method = "GET";
    return policy._nextPolicy.sendRequest(reqOptions).then(function (res) {
        var obj = res.parsedBody;
        if (res.parsedBody && obj.registrationState && obj.registrationState === "Registered") {
            return true;
        }
        else {
            return utils
                .delay(policy._retryTimeout * 1000)
                .then(function () { return getRegistrationStatus(policy, url, originalRequest); });
        }
    });
}
//# sourceMappingURL=rpRegistrationPolicy.js.map