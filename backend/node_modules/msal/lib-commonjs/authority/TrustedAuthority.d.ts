import TelemetryManager from "../telemetry/TelemetryManager";
export declare class TrustedAuthority {
    private static TrustedHostList;
    /**
     *
     * @param validateAuthority
     * @param knownAuthorities
     */
    static setTrustedAuthoritiesFromConfig(validateAuthority: boolean, knownAuthorities: Array<string>): void;
    /**
     *
     * @param telemetryManager
     * @param correlationId
     */
    private static getAliases;
    /**
     *
     * @param telemetryManager
     * @param correlationId
     */
    static setTrustedAuthoritiesFromNetwork(authorityToVerify: string, telemetryManager: TelemetryManager, correlationId?: string): Promise<void>;
    static getTrustedHostList(): Array<string>;
    /**
     * Checks to see if the host is in a list of trusted hosts
     * @param host
     */
    static IsInTrustedHostList(host: string): boolean;
}
