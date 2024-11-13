// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { __awaiter } from "tslib";
import { AggregateAuthenticationError, CredentialUnavailable } from "../client/errors";
import { createSpan } from "../util/tracing";
import { SpanStatusCode } from "@azure/core-tracing";
import { credentialLogger, formatSuccess, formatError } from "../util/logging";
const logger = credentialLogger("ChainedTokenCredential");
/**
 * Enables multiple `TokenCredential` implementations to be tried in order
 * until one of the getToken methods returns an access token.
 */
export class ChainedTokenCredential {
    /**
     * Creates an instance of ChainedTokenCredential using the given credentials.
     *
     * @param sources - `TokenCredential` implementations to be tried in order.
     *
     * Example usage:
     * ```javascript
     * const firstCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);
     * const secondCredential = new ClientSecretCredential(tenantId, anotherClientId, anotherSecret);
     * const credentialChain = new ChainedTokenCredential(firstCredential, secondCredential);
     * ```
     */
    constructor(...sources) {
        /**
         * The message to use when the chained token fails to get a token
         */
        this.UnavailableMessage = "ChainedTokenCredential => failed to retrieve a token from the included credentials";
        this._sources = [];
        this._sources = sources;
    }
    /**
     * Returns the first access token returned by one of the chained
     * `TokenCredential` implementations.  Throws an {@link AggregateAuthenticationError}
     * when one or more credentials throws an {@link AuthenticationError} and
     * no credentials have returned an access token.
     *
     * This method is called automatically by Azure SDK client libraries. You may call this method
     * directly, but you must also handle token caching and token refreshing.
     *
     * @param scopes - The list of scopes for which the token will have access.
     * @param options - The options used to configure any requests this
     *                `TokenCredential` implementation might make.
     */
    getToken(scopes, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = null;
            const errors = [];
            const { span, updatedOptions: newOptions } = createSpan("ChainedTokenCredential-getToken", options);
            for (let i = 0; i < this._sources.length && token === null; i++) {
                try {
                    token = yield this._sources[i].getToken(scopes, newOptions);
                }
                catch (err) {
                    if (err instanceof CredentialUnavailable) {
                        errors.push(err);
                    }
                    else {
                        logger.getToken.info(formatError(scopes, err));
                        throw err;
                    }
                }
            }
            if (!token && errors.length > 0) {
                const err = new AggregateAuthenticationError(errors);
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: err.message
                });
                logger.getToken.info(formatError(scopes, err));
                throw err;
            }
            span.end();
            logger.getToken.info(formatSuccess(scopes));
            return token;
        });
    }
}
//# sourceMappingURL=chainedTokenCredential.js.map