// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
import { __extends } from "tslib";
import * as utils from "../util/utils";
import { BaseRequestPolicy, } from "./requestPolicy";
import { RestError } from "../restError";
export function exponentialRetryPolicy(retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
    return {
        create: function (nextPolicy, options) {
            return new ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval);
        },
    };
}
var DEFAULT_CLIENT_RETRY_INTERVAL = 1000 * 30;
var DEFAULT_CLIENT_RETRY_COUNT = 3;
var DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 1000 * 90;
var DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 1000 * 3;
/**
 * @class
 * Instantiates a new "ExponentialRetryPolicyFilter" instance.
 */
var ExponentialRetryPolicy = /** @class */ (function (_super) {
    __extends(ExponentialRetryPolicy, _super);
    /**
     * @constructor
     * @param {RequestPolicy} nextPolicy The next RequestPolicy in the pipeline chain.
     * @param {RequestPolicyOptionsLike} options The options for this RequestPolicy.
     * @param {number} [retryCount]        The client retry count.
     * @param {number} [retryInterval]     The client retry interval, in milliseconds.
     * @param {number} [minRetryInterval]  The minimum retry interval, in milliseconds.
     * @param {number} [maxRetryInterval]  The maximum retry interval, in milliseconds.
     */
    function ExponentialRetryPolicy(nextPolicy, options, retryCount, retryInterval, minRetryInterval, maxRetryInterval) {
        var _this = _super.call(this, nextPolicy, options) || this;
        function isNumber(n) {
            return typeof n === "number";
        }
        _this.retryCount = isNumber(retryCount) ? retryCount : DEFAULT_CLIENT_RETRY_COUNT;
        _this.retryInterval = isNumber(retryInterval) ? retryInterval : DEFAULT_CLIENT_RETRY_INTERVAL;
        _this.minRetryInterval = isNumber(minRetryInterval)
            ? minRetryInterval
            : DEFAULT_CLIENT_MIN_RETRY_INTERVAL;
        _this.maxRetryInterval = isNumber(maxRetryInterval)
            ? maxRetryInterval
            : DEFAULT_CLIENT_MAX_RETRY_INTERVAL;
        return _this;
    }
    ExponentialRetryPolicy.prototype.sendRequest = function (request) {
        var _this = this;
        return this._nextPolicy
            .sendRequest(request.clone())
            .then(function (response) { return retry(_this, request, response); })
            .catch(function (error) { return retry(_this, request, error.response, undefined, error); });
    };
    return ExponentialRetryPolicy;
}(BaseRequestPolicy));
export { ExponentialRetryPolicy };
/**
 * Determines if the operation should be retried and how long to wait until the next retry.
 *
 * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
 * @param {number} statusCode The HTTP status code.
 * @param {RetryData} retryData  The retry data.
 * @return {boolean} True if the operation qualifies for a retry; false otherwise.
 */
function shouldRetry(policy, statusCode, retryData) {
    if (statusCode == undefined ||
        (statusCode < 500 && statusCode !== 408) ||
        statusCode === 501 ||
        statusCode === 505) {
        return false;
    }
    var currentCount;
    if (!retryData) {
        throw new Error("retryData for the ExponentialRetryPolicyFilter cannot be null.");
    }
    else {
        currentCount = retryData && retryData.retryCount;
    }
    return currentCount < policy.retryCount;
}
/**
 * Updates the retry data for the next attempt.
 *
 * @param {ExponentialRetryPolicy} policy The ExponentialRetryPolicy that this function is being called against.
 * @param {RetryData} retryData  The retry data.
 * @param {RetryError} [err] The operation"s error, if any.
 */
function updateRetryData(policy, retryData, err) {
    if (!retryData) {
        retryData = {
            retryCount: 0,
            retryInterval: 0,
        };
    }
    if (err) {
        if (retryData.error) {
            err.innerError = retryData.error;
        }
        retryData.error = err;
    }
    // Adjust retry count
    retryData.retryCount++;
    // Adjust retry interval
    var incrementDelta = Math.pow(2, retryData.retryCount) - 1;
    var boundedRandDelta = policy.retryInterval * 0.8 +
        Math.floor(Math.random() * (policy.retryInterval * 1.2 - policy.retryInterval * 0.8));
    incrementDelta *= boundedRandDelta;
    retryData.retryInterval = Math.min(policy.minRetryInterval + incrementDelta, policy.maxRetryInterval);
    return retryData;
}
function retry(policy, request, response, retryData, requestError) {
    retryData = updateRetryData(policy, retryData, requestError);
    var isAborted = request.abortSignal && request.abortSignal.aborted;
    if (!isAborted && shouldRetry(policy, response && response.status, retryData)) {
        return utils
            .delay(retryData.retryInterval)
            .then(function () { return policy._nextPolicy.sendRequest(request.clone()); })
            .then(function (res) { return retry(policy, request, res, retryData, undefined); })
            .catch(function (err) { return retry(policy, request, response, retryData, err); });
    }
    else if (isAborted || requestError || !response) {
        // If the operation failed in the end, return all errors instead of just the last one
        var err = retryData.error ||
            new RestError("Failed to send the request.", RestError.REQUEST_SEND_ERROR, response && response.status, response && response.request, response);
        return Promise.reject(err);
    }
    else {
        return Promise.resolve(response);
    }
}
//# sourceMappingURL=exponentialRetryPolicy.js.map