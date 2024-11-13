/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    globals: {
        crypto: require("crypto")
    },
    testEnvironmentOptions: {
        url: "https://localhost:8081/index.html"
    },
    collectCoverageFrom: ["src/**/*.ts"],
    coverageReporters: [["lcov", {"projectRoot": "../../"}]]
};
