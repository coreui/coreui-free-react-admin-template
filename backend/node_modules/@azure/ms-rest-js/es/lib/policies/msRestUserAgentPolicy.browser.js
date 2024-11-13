// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
export function getDefaultUserAgentKey() {
    return "x-ms-command-name";
}
export function getPlatformSpecificData() {
    var navigator = self.navigator;
    var osInfo = {
        key: "OS",
        value: (navigator.oscpu || navigator.platform).replace(" ", ""),
    };
    return [osInfo];
}
//# sourceMappingURL=msRestUserAgentPolicy.browser.js.map