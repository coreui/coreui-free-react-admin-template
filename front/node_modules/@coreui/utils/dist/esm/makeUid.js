/**
 * --------------------------------------------------------------------------
 * CoreUI Utils (v2.0.1): makeUid.ts
 * Licensed under MIT (https://github.com/coreui/coreui-utils/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
//function for UI releted ID assignment, due to one in 10^15 probability of duplication
var makeUid = function () {
    var key = Math.random().toString(36).substr(2);
    return 'uid-' + key;
};

export { makeUid as default };
//# sourceMappingURL=makeUid.js.map
