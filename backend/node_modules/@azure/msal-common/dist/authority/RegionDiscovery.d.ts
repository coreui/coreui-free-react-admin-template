import { INetworkModule } from "../network/INetworkModule";
import { RegionDiscoveryMetadata } from "./RegionDiscoveryMetadata";
export declare class RegionDiscovery {
    protected networkInterface: INetworkModule;
    protected static IMDS_OPTIONS: {
        headers: {
            Metadata: string;
        };
    };
    constructor(networkInterface: INetworkModule);
    /**
     * Detect the region from the application's environment.
     *
     * @returns Promise<string | null>
     */
    detectRegion(environmentRegion: string | undefined, regionDiscoveryMetadata: RegionDiscoveryMetadata): Promise<string | null>;
    /**
     * Make the call to the IMDS endpoint
     *
     * @param imdsEndpointUrl
     * @returns Promise<NetworkResponse<string>>
     */
    private getRegionFromIMDS;
    /**
     * Get the most recent version of the IMDS endpoint available
     *
     * @returns Promise<string | null>
     */
    private getCurrentVersion;
}
//# sourceMappingURL=RegionDiscovery.d.ts.map