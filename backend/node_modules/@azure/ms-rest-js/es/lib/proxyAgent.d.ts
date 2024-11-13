/// <reference types="node" />
import * as http from "http";
import * as https from "https";
import { ProxySettings } from "./serviceClient";
import { HttpHeadersLike } from "./httpHeaders";
export declare type ProxyAgent = {
    isHttps: boolean;
    agent: http.Agent | https.Agent;
};
export declare function createProxyAgent(requestUrl: string, proxySettings: ProxySettings, headers?: HttpHeadersLike): ProxyAgent;
export interface HttpsProxyOptions {
    host: string;
    port: number;
    localAddress?: string;
    proxyAuth?: string;
    headers?: {
        [key: string]: any;
    };
    ca?: Buffer[];
    servername?: string;
    key?: Buffer;
    cert?: Buffer;
}
interface HttpsOverHttpsOptions {
    maxSockets?: number;
    ca?: Buffer[];
    key?: Buffer;
    cert?: Buffer;
    proxy?: HttpsProxyOptions;
}
export declare function createTunnel(isRequestHttps: boolean, isProxyHttps: boolean, tunnelOptions: HttpsOverHttpsOptions): http.Agent | https.Agent;
export {};
//# sourceMappingURL=proxyAgent.d.ts.map