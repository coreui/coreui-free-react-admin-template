/*! @azure/msal-common v4.5.1 2021-08-02 */
'use strict';
import { AuthError } from '../error/AuthError.js';

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var StubbedNetworkModule = {
    sendGetRequestAsync: function () {
        var notImplErr = "Network interface - sendGetRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    },
    sendPostRequestAsync: function () {
        var notImplErr = "Network interface - sendPostRequestAsync() has not been implemented for the Network interface.";
        return Promise.reject(AuthError.createUnexpectedError(notImplErr));
    }
};

export { StubbedNetworkModule };
//# sourceMappingURL=INetworkModule.js.map
