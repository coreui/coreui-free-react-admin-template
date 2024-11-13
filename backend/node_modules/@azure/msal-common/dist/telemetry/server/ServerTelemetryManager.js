/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { SERVER_TELEM_CONSTANTS, CacheOutcome, Constants, Separators } from '../../utils/Constants.js';
import { ServerTelemetryEntity } from '../../cache/entities/ServerTelemetryEntity.js';
import { StringUtils } from '../../utils/StringUtils.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var ServerTelemetryManager = /** @class */ (function () {
    function ServerTelemetryManager(telemetryRequest, cacheManager) {
        this.cacheOutcome = CacheOutcome.NO_CACHE_HIT;
        this.cacheManager = cacheManager;
        this.apiId = telemetryRequest.apiId;
        this.correlationId = telemetryRequest.correlationId;
        this.wrapperSKU = telemetryRequest.wrapperSKU || Constants.EMPTY_STRING;
        this.wrapperVer = telemetryRequest.wrapperVer || Constants.EMPTY_STRING;
        this.telemetryCacheKey = SERVER_TELEM_CONSTANTS.CACHE_KEY + Separators.CACHE_KEY_SEPARATOR + telemetryRequest.clientId;
    }
    /**
     * API to add MSER Telemetry to request
     */
    ServerTelemetryManager.prototype.generateCurrentRequestHeaderValue = function () {
        var request = "" + this.apiId + SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR + this.cacheOutcome;
        var platformFields = [this.wrapperSKU, this.wrapperVer].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var regionDiscoveryFields = this.getRegionDiscoveryFields();
        var requestWithRegionDiscoveryFields = [request, regionDiscoveryFields].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, requestWithRegionDiscoveryFields, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    };
    /**
     * API to add MSER Telemetry for the last failed request
     */
    ServerTelemetryManager.prototype.generateLastRequestHeaderValue = function () {
        var lastRequests = this.getLastRequests();
        var maxErrors = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        var failedRequests = lastRequests.failedRequests.slice(0, 2 * maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errors = lastRequests.errors.slice(0, maxErrors).join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        var errorCount = lastRequests.errors.length;
        // Indicate whether this header contains all data or partial data
        var overflow = maxErrors < errorCount ? SERVER_TELEM_CONSTANTS.OVERFLOW_TRUE : SERVER_TELEM_CONSTANTS.OVERFLOW_FALSE;
        var platformFields = [errorCount, overflow].join(SERVER_TELEM_CONSTANTS.VALUE_SEPARATOR);
        return [SERVER_TELEM_CONSTANTS.SCHEMA_VERSION, lastRequests.cacheHits, failedRequests, errors, platformFields].join(SERVER_TELEM_CONSTANTS.CATEGORY_SEPARATOR);
    };
    /**
     * API to cache token failures for MSER data capture
     * @param error
     */
    ServerTelemetryManager.prototype.cacheFailedRequest = function (error) {
        var lastRequests = this.getLastRequests();
        if (lastRequests.errors.length >= SERVER_TELEM_CONSTANTS.MAX_CACHED_ERRORS) {
            // Remove a cached error to make room, first in first out
            lastRequests.failedRequests.shift(); // apiId
            lastRequests.failedRequests.shift(); // correlationId
            lastRequests.errors.shift();
        }
        lastRequests.failedRequests.push(this.apiId, this.correlationId);
        if (!StringUtils.isEmpty(error.subError)) {
            lastRequests.errors.push(error.subError);
        }
        else if (!StringUtils.isEmpty(error.errorCode)) {
            lastRequests.errors.push(error.errorCode);
        }
        else if (!!error && error.toString()) {
            lastRequests.errors.push(error.toString());
        }
        else {
            lastRequests.errors.push(SERVER_TELEM_CONSTANTS.UNKNOWN_ERROR);
        }
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return;
    };
    /**
     * Update server telemetry cache entry by incrementing cache hit counter
     */
    ServerTelemetryManager.prototype.incrementCacheHits = function () {
        var lastRequests = this.getLastRequests();
        lastRequests.cacheHits += 1;
        this.cacheManager.setServerTelemetry(this.telemetryCacheKey, lastRequests);
        return lastRequests.cacheHits;
    };
    /**
     * Get the server telemetry entity from cache or initialize a new one
     */
    ServerTelemetryManager.prototype.getLastRequests = function () {
        var initialValue = new ServerTelemetryEntity();
        var lastRequests = this.cacheManager.getServerTelemetry(this.telemetryCacheKey);
        return lastRequests || initialValue;
    };
    /**
     * Remove server telemetry cache entry
     */
    ServerTelemetryManager.prototype.clearTelemetryCache = function () {
        var lastRequests = this.getLastRequests();
        var numErrorsFlushed = ServerTelemetryManager.maxErrorsToSend(lastRequests);
        var errorCount = lastRequests.errors.length;
        if (numErrorsFlushed === errorCount) {
            // All errors were sent on last request, clear Telemetry cache
            this.cacheManager.removeItem(this.telemetryCacheKey);
        }
        else {
            // Partial data was flushed to server, construct a new telemetry cache item with errors that were not flushed
            var serverTelemEntity = new ServerTelemetryEntity();
            serverTelemEntity.failedRequests = lastRequests.failedRequests.slice(numErrorsFlushed * 2); // failedRequests contains 2 items for each error
            serverTelemEntity.errors = lastRequests.errors.slice(numErrorsFlushed);
            this.cacheManager.setServerTelemetry(this.telemetryCacheKey, serverTelemEntity);
        }
    };
    /**
     * Returns the maximum number of errors that can be flushed to the server in the next network request
     * @param serverTelemetryEntity
     */
    ServerTelemetryManager.maxErrorsToSend = function (serverTelemetryEntity) {
        var i;
        var maxErrors = 0;
        var dataSize = 0;
        var errorCount = serverTelemetryEntity.errors.length;
        for (i = 0; i < errorCount; i++) {
            // failedRequests parameter contains pairs of apiId and correlationId, multiply index by 2 to preserve pairs
            var apiId = serverTelemetryEntity.failedRequests[2 * i] || Constants.EMPTY_STRING;
            var correlationId = serverTelemetryEntity.failedRequests[2 * i + 1] || Constants.EMPTY_STRING;
            var errorCode = serverTelemetryEntity.errors[i] || Constants.EMPTY_STRING;
            // Count number of characters that would be added to header, each character is 1 byte. Add 3 at the end to account for separators
            dataSize += apiId.toString().length + correlationId.toString().length + errorCode.length + 3;
            if (dataSize < SERVER_TELEM_CONSTANTS.MAX_LAST_HEADER_BYTES) {
                // Adding this entry to the header would still keep header size below the limit
                maxErrors += 1;
            }
            else {
                break;
            }
        }
        return maxErrors;
    };
    /**
     * Get the region discovery fields
     *
     * @returns string
     */
    ServerTelemetryManager.prototype.getRegionDiscoveryFields = function () {
        var regionDiscoveryFields = [];
        regionDiscoveryFields.push(this.regionUsed || "");
        regionDiscoveryFields.push(this.regionSource || "");
        regionDiscoveryFields.push(this.regionOutcome || "");
        return regionDiscoveryFields.join(",");
    };
    /**
     * Update the region discovery metadata
     *
     * @param regionDiscoveryMetadata
     * @returns void
     */
    ServerTelemetryManager.prototype.updateRegionDiscoveryMetadata = function (regionDiscoveryMetadata) {
        this.regionUsed = regionDiscoveryMetadata.region_used;
        this.regionSource = regionDiscoveryMetadata.region_source;
        this.regionOutcome = regionDiscoveryMetadata.region_outcome;
    };
    /**
     * Set cache outcome
     */
    ServerTelemetryManager.prototype.setCacheOutcome = function (cacheOutcome) {
        this.cacheOutcome = cacheOutcome;
    };
    return ServerTelemetryManager;
}());

export { ServerTelemetryManager };
//# sourceMappingURL=ServerTelemetryManager.js.map
