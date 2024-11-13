"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransientErrorLookup = void 0;

// This simple piece of code is factored out into a separate class to make it
// easy to stub it out in tests. It's hard, if not impossible, to cause a
// transient error on demand in tests.
class TransientErrorLookup {
  isTransientError(error) {
    // This list of transient errors comes from Microsoft implementation of SqlClient:
    //  - https://github.com/dotnet/corefx/blob/master/src/System.Data.SqlClient/src/System/Data/SqlClient/SqlInternalConnectionTds.cs#L115
    const transientErrors = [4060, 10928, 10929, 40197, 40501, 40613];
    return transientErrors.indexOf(error) !== -1;
  }

}

exports.TransientErrorLookup = TransientErrorLookup;