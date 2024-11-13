import { TokenCredentialsBase } from "../credentials/tokenCredentialsBase";
/**
 * Provides information about user type. It can currently be "user" or "servicePrincipal".
 */
export declare type UserType = "user" | "servicePrincipal";
/**
 * Provides information about a user from the authentication perspective.
 */
export interface LinkedUser {
    /**
     * The user name. For ApplicationTokenCredentials it can be the clientId or SPN.
     */
    name: string;
    /**
     * The user type. "user" | "servicePrincipal".
     */
    type: UserType;
}
/**
 * Provides information about subscription that was found
 * during the authentication process. The structure of this type is different from the
 * subscription object that one gets by making a request to the ResourceManager API.
 */
export interface LinkedSubscription {
    /**
     * The tenant that the subscription belongs to.
     */
    readonly tenantId: string;
    /**
     * The user associated with the subscription. This could be a user or a serviceprincipal.
     */
    readonly user: LinkedUser;
    /**
     * The environment name in which the subscription exists.
     * Possible values: "AzureCloud", "AzureChinaCloud", "AzureUSGovernment", "AzureGermanCloud" or
     * some other custom/internal environment name like "Dogfood".
     */
    readonly environmentName: string;
    /**
     * The display name of the subscription.
     */
    readonly name: string;
    /**
     * The subscription id, usually a GUID.
     */
    readonly id: string;
    /**
     * The authorization source of the subscription: "RoleBased",
     *  "Legacy", "Bypassed"," Direct", "Management". It could also be a comma separated string containing
     *  more values "Bypassed, Direct, Management".
     */
    readonly authorizationSource: string;
    /**
     * The state of the subscription. Example values: "Enabled", "Disabled",
     *  "Warned", "PastDue", "Deleted".
     */
    readonly state: string;
    /**
     * Placeholder for unknown properties.
     */
    readonly [x: string]: any;
}
/**
 * Builds an array of tenantIds.
 * @param credentials - The credentials.
 * @param apiVersion - default value 2016-06-01
 * @returns A promise that resolves to an array of tenantIds and rejects with an error.
 */
export declare function buildTenantList(credentials: TokenCredentialsBase, apiVersion?: string): Promise<string[]>;
export declare function getSubscriptionsFromTenants(credentials: TokenCredentialsBase, tenantList: string[], apiVersion?: string): Promise<LinkedSubscription[]>;
//# sourceMappingURL=subscriptionUtils.d.ts.map