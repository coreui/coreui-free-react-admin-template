export declare const scrubTenantFromUri: (uri: string) => String;
export declare const hashPersonalIdentifier: (valueToHash: string) => string;
export declare const prependEventNamePrefix: (suffix: string) => string;
export declare const supportsBrowserPerformance: () => boolean;
export declare const endBrowserPerformanceMeasurement: (measureName: string, startMark: string, endMark: string) => void;
export declare const startBrowserPerformanceMeasurement: (startMark: string) => void;
