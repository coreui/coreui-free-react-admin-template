/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { AuthError } from "./AuthError";

export const ServerErrorMessage = {
    serverUnavailable: {
        code: "server_unavailable",
        desc: "Server is temporarily unavailable."
    },
    unknownServerError: {
        code: "unknown_server_error"
    },
};

/**
 * Error thrown when there is an error with the server code, for example, unavailability.
 */
export class ServerError extends AuthError {

    constructor(errorCode: string, errorMessage?: string) {
        super(errorCode, errorMessage);
        this.name = "ServerError";

        Object.setPrototypeOf(this, ServerError.prototype);
    }

    static createServerUnavailableError(): ServerError {
        return new ServerError(ServerErrorMessage.serverUnavailable.code,
            ServerErrorMessage.serverUnavailable.desc);
    }

    static createUnknownServerError(errorDesc: string): ServerError {
        return new ServerError(ServerErrorMessage.unknownServerError.code,
            errorDesc);
    }
}
