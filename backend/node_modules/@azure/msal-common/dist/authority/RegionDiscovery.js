/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { __awaiter, __generator } from '../_virtual/_tslib.js';
import { RegionDiscoverySources, ResponseCodes, Constants } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var RegionDiscovery = /** @class */ (function () {
    function RegionDiscovery(networkInterface) {
        this.networkInterface = networkInterface;
    }
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    RegionDiscovery.prototype.detectRegion = function (environmentRegion, regionDiscoveryMetadata) {
        return __awaiter(this, void 0, void 0, function () {
            var autodetectedRegionName, localIMDSVersionResponse, currentIMDSVersion, currentIMDSVersionResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        autodetectedRegionName = environmentRegion;
                        if (!!autodetectedRegionName) return [3 /*break*/, 8];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.getRegionFromIMDS(Constants.IMDS_VERSION)];
                    case 2:
                        localIMDSVersionResponse = _a.sent();
                        if (localIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                            autodetectedRegionName = localIMDSVersionResponse.body;
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                        }
                        if (!(localIMDSVersionResponse.status === ResponseCodes.httpBadRequest)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getCurrentVersion()];
                    case 3:
                        currentIMDSVersion = _a.sent();
                        if (!currentIMDSVersion) {
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getRegionFromIMDS(currentIMDSVersion)];
                    case 4:
                        currentIMDSVersionResponse = _a.sent();
                        if (currentIMDSVersionResponse.status === ResponseCodes.httpSuccess) {
                            autodetectedRegionName = currentIMDSVersionResponse.body;
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.IMDS;
                        }
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a.sent();
                        regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        return [2 /*return*/, null];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        regionDiscoveryMetadata.region_source = RegionDiscoverySources.ENVIRONMENT_VARIABLE;
                        _a.label = 9;
                    case 9:
                        // If no region was auto detected from the environment or from the IMDS endpoint, mark the attempt as a FAILED_AUTO_DETECTION
                        if (!autodetectedRegionName) {
                            regionDiscoveryMetadata.region_source = RegionDiscoverySources.FAILED_AUTO_DETECTION;
                        }
                        return [2 /*return*/, autodetectedRegionName || null];
                }
            });
        });
    };
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    RegionDiscovery.prototype.getRegionFromIMDS = function (version) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?api-version=" + version + "&format=text", RegionDiscovery.IMDS_OPTIONS, Constants.IMDS_TIMEOUT)];
            });
        });
    };
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    RegionDiscovery.prototype.getCurrentVersion = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.networkInterface.sendGetRequestAsync(Constants.IMDS_ENDPOINT + "?format=json", RegionDiscovery.IMDS_OPTIONS)];
                    case 1:
                        response = _a.sent();
                        // When IMDS endpoint is called without the api version query param, bad request response comes back with latest version.
                        if (response.status === ResponseCodes.httpBadRequest && response.body && response.body["newest-versions"] && response.body["newest-versions"].length > 0) {
                            return [2 /*return*/, response.body["newest-versions"][0]];
                        }
                        return [2 /*return*/, null];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Options for the IMDS endpoint request
    RegionDiscovery.IMDS_OPTIONS = { headers: { "Metadata": "true" } };
    return RegionDiscovery;
}());

export { RegionDiscovery };
//# sourceMappingURL=RegionDiscovery.js.map
