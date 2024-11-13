import { NetworkResponse } from "./NetworkManager";
/**
 * Options allowed by network request APIs.
 */
export declare type NetworkRequestOptions = {
    headers?: Record<string, string>;
    body?: string;
};
/**
 * Client network interface to send backend requests.
 * @interface
 */
export interface INetworkModule {
    /**
     * Interface function for async network "GET" requests. Based on the Fetch standard: https://fetch.spec.whatwg.org/
     * @param url
     * @param requestParams
     * @param enableCaching
     */
    sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions, cancellationToken?: number): Promise<NetworkResponse<T>>;
    /**
     * Interface function for async network "POST" requests. Based on the Fetch standard: https://fetch.spec.whatwg.org/
     * @param url
     * @param requestParams
     * @param enableCaching
     */
    sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
}
export declare const StubbedNetworkModule: INetworkModule;
//# sourceMappingURL=INetworkModule.d.ts.map