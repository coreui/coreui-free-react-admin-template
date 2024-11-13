import { Authority } from "./Authority";
import { INetworkModule } from "../network/INetworkModule";
import { ICacheManager } from "../cache/interface/ICacheManager";
import { AuthorityOptions } from "./AuthorityOptions";
export declare class AuthorityFactory {
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Also performs endpoint discovery.
     *
     * @param authorityUri
     * @param networkClient
     * @param protocolMode
     */
    static createDiscoveredInstance(authorityUri: string, networkClient: INetworkModule, cacheManager: ICacheManager, authorityOptions: AuthorityOptions): Promise<Authority>;
    /**
     * Create an authority object of the correct type based on the url
     * Performs basic authority validation - checks to see if the authority is of a valid type (i.e. aad, b2c, adfs)
     *
     * Does not perform endpoint discovery.
     *
     * @param authorityUrl
     * @param networkInterface
     * @param protocolMode
     */
    static createInstance(authorityUrl: string, networkInterface: INetworkModule, cacheManager: ICacheManager, authorityOptions: AuthorityOptions): Authority;
}
//# sourceMappingURL=AuthorityFactory.d.ts.map