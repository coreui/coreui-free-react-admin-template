/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { StringUtils } from '../utils/StringUtils.js';
import { ClientConfigurationError } from '../error/ClientConfigurationError.js';
import { CodeChallengeMethodValues, PromptValue } from '../utils/Constants.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Validates server consumable params from the "request" objects
 */
var RequestValidator = /** @class */ (function () {
    function RequestValidator() {
    }
    /**
     * Utility to check if the `redirectUri` in the request is a non-null value
     * @param redirectUri
     */
    RequestValidator.validateRedirectUri = function (redirectUri) {
        if (StringUtils.isEmpty(redirectUri)) {
            throw ClientConfigurationError.createRedirectUriEmptyError();
        }
    };
    /**
     * Utility to validate prompt sent by the user in the request
     * @param prompt
     */
    RequestValidator.validatePrompt = function (prompt) {
        var promptValues = [];
        for (var value in PromptValue) {
            promptValues.push(PromptValue[value]);
        }
        if (promptValues.indexOf(prompt) < 0) {
            throw ClientConfigurationError.createInvalidPromptError(prompt);
        }
    };
    RequestValidator.validateClaims = function (claims) {
        try {
            JSON.parse(claims);
        }
        catch (e) {
            throw ClientConfigurationError.createInvalidClaimsRequestError();
        }
    };
    /**
     * Utility to validate code_challenge and code_challenge_method
     * @param codeChallenge
     * @param codeChallengeMethod
     */
    RequestValidator.validateCodeChallengeParams = function (codeChallenge, codeChallengeMethod) {
        if (StringUtils.isEmpty(codeChallenge) || StringUtils.isEmpty(codeChallengeMethod)) {
            throw ClientConfigurationError.createInvalidCodeChallengeParamsError();
        }
        else {
            this.validateCodeChallengeMethod(codeChallengeMethod);
        }
    };
    /**
     * Utility to validate code_challenge_method
     * @param codeChallengeMethod
     */
    RequestValidator.validateCodeChallengeMethod = function (codeChallengeMethod) {
        if ([
            CodeChallengeMethodValues.PLAIN,
            CodeChallengeMethodValues.S256
        ].indexOf(codeChallengeMethod) < 0) {
            throw ClientConfigurationError.createInvalidCodeChallengeMethodError();
        }
    };
    /**
     * Removes unnecessary or duplicate query parameters from extraQueryParameters
     * @param request
     */
    RequestValidator.sanitizeEQParams = function (eQParams, queryParams) {
        if (!eQParams) {
            return {};
        }
        // Remove any query parameters already included in SSO params
        queryParams.forEach(function (value, key) {
            if (eQParams[key]) {
                delete eQParams[key];
            }
        });
        return eQParams;
    };
    return RequestValidator;
}());

export { RequestValidator };
//# sourceMappingURL=RequestValidator.js.map
