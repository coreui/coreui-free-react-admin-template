import { WebResourceLike } from "../webResource";
export interface ServiceClientCredentials {
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResourceLike} webResource The WebResourceLike/request to be signed.
     * @returns {Promise<WebResourceLike>} The signed request object;
     */
    signRequest(webResource: WebResourceLike): Promise<WebResourceLike>;
}
//# sourceMappingURL=serviceClientCredentials.d.ts.map