// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

/*
 * NOTE: When moving this file, please update "browser" section in package.json
 * and "plugins" section in webpack.testconfig.ts.
 */

import { TelemetryInfo } from "./userAgentPolicy";

interface NavigatorEx extends Navigator {
  // oscpu is not yet standards-compliant, but can not be undefined in TypeScript 3.6.2
  readonly oscpu: string;
}

export function getDefaultUserAgentKey(): string {
  return "x-ms-command-name";
}

export function getPlatformSpecificData(): TelemetryInfo[] {
  const navigator = self.navigator as NavigatorEx;
  const osInfo = {
    key: "OS",
    value: (navigator.oscpu || navigator.platform).replace(" ", ""),
  };

  return [osInfo];
}
