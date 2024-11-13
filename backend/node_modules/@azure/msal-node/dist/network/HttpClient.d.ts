import { INetworkModule, NetworkRequestOptions, NetworkResponse } from "@azure/msal-common";
/**
 * This class implements the API for network requests.
 */
export declare class HttpClient implements INetworkModule {
    /**
     * Http Get request
     * @param url
     * @param options
     */
    sendGetRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
    /**
     * Http Post request
     * @param url
     * @param options
     */
    sendPostRequestAsync<T>(url: string, options?: NetworkRequestOptions): Promise<NetworkResponse<T>>;
}
//# sourceMappingURL=HttpClient.d.ts.map