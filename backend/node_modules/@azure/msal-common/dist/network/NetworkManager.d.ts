import { INetworkModule, NetworkRequestOptions } from "./INetworkModule";
import { RequestThumbprint } from "./RequestThumbprint";
import { CacheManager } from "../cache/CacheManager";
export declare type NetworkResponse<T> = {
    headers: Record<string, string>;
    body: T;
    status: number;
};
export declare class NetworkManager {
    private networkClient;
    private cacheManager;
    constructor(networkClient: INetworkModule, cacheManager: CacheManager);
    /**
     * Wraps sendPostRequestAsync with necessary preflight and postflight logic
     * @param thumbprint
     * @param tokenEndpoint
     * @param options
     */
    sendPostRequest<T>(thumbprint: RequestThumbprint, tokenEndpoint: string, options: NetworkRequestOptions): Promise<NetworkResponse<T>>;
}
//# sourceMappingURL=NetworkManager.d.ts.map