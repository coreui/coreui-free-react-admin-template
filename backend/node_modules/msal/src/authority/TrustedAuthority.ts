/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import TelemetryManager from "../telemetry/TelemetryManager";
import { XhrClient, XhrResponse } from "../XHRClient";
import HttpEvent from "../telemetry/HttpEvent";
import { AAD_INSTANCE_DISCOVERY_ENDPOINT, NetworkRequestType } from "../utils/Constants";
import { UrlUtils } from "../utils/UrlUtils";

export class TrustedAuthority {
    private static TrustedHostList: Array<string> = [];

    /**
     * 
     * @param validateAuthority 
     * @param knownAuthorities 
     */
    public static setTrustedAuthoritiesFromConfig(validateAuthority: boolean, knownAuthorities: Array<string>): void{
        if (validateAuthority && !this.getTrustedHostList().length){
            knownAuthorities.forEach(function(authority) {
                TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
            });
        }
    }

    /**
     * 
     * @param telemetryManager 
     * @param correlationId 
     */
    private static async getAliases(authorityToVerify: string, telemetryManager: TelemetryManager, correlationId?: string): Promise<Array<object>> {
        const client: XhrClient = new XhrClient();

        const httpMethod = NetworkRequestType.GET;
        const instanceDiscoveryEndpoint = `${AAD_INSTANCE_DISCOVERY_ENDPOINT}${authorityToVerify}oauth2/v2.0/authorize`;
        const httpEvent: HttpEvent = telemetryManager.createAndStartHttpEvent(correlationId, httpMethod, instanceDiscoveryEndpoint, "getAliases");
        return client.sendRequestAsync(instanceDiscoveryEndpoint, httpMethod, true)
            .then((response: XhrResponse) => {
                httpEvent.httpResponseStatus = response.statusCode;
                telemetryManager.stopEvent(httpEvent);
                return response.body["metadata"];
            })
            .catch(err => {
                httpEvent.serverErrorCode = err;
                telemetryManager.stopEvent(httpEvent);
                throw err;
            });
    }

    /**
     * 
     * @param telemetryManager 
     * @param correlationId 
     */
    public static async setTrustedAuthoritiesFromNetwork(authorityToVerify: string, telemetryManager: TelemetryManager, correlationId?: string): Promise<void> {
        const metadata = await this.getAliases(authorityToVerify, telemetryManager, correlationId);
        metadata.forEach(function(entry: object){
            const authorities: Array<string> = entry["aliases"];
            authorities.forEach(function(authority: string) {
                TrustedAuthority.TrustedHostList.push(authority.toLowerCase());
            });
        });

        const host = UrlUtils.GetUrlComponents(authorityToVerify).HostNameAndPort;
        if (TrustedAuthority.getTrustedHostList().length && !TrustedAuthority.IsInTrustedHostList(host)){
            // Custom Domain scenario, host is trusted because Instance Discovery call succeeded
            TrustedAuthority.TrustedHostList.push(host.toLowerCase());
        }
    } 

    public static getTrustedHostList(): Array<string> {
        return this.TrustedHostList;
    }

    /**
     * Checks to see if the host is in a list of trusted hosts
     * @param host 
     */
    public static IsInTrustedHostList(host: string): boolean {
        return this.TrustedHostList.indexOf(host.toLowerCase()) > -1;
    }
}
