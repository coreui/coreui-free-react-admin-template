export interface EnvironmentParameters {
    /**
     * The Environment name.
     */
    readonly name: string;
    /**
     * The management portal URL.
     */
    readonly portalUrl: string;
    /**
     * The management service endpoint.
     */
    readonly managementEndpointUrl: string;
    /**
     * The resource management endpoint.
     */
    readonly resourceManagerEndpointUrl: string;
    /**
     * The Active Directory login endpoint.
     */
    readonly activeDirectoryEndpointUrl: string;
    /**
     * The resource ID to obtain AD tokens for (token audience).
     */
    readonly activeDirectoryResourceId: string;
    /**
     * The publish settings file URL.
     */
    readonly publishingProfileUrl?: string;
    /**
     * The sql server management endpoint for mobile commands.
     */
    readonly sqlManagementEndpointUrl?: string;
    /**
     * The dns suffix for sql servers.
     */
    readonly sqlServerHostnameSuffix?: string;
    /**
     * The template gallery endpoint.
     */
    readonly galleryEndpointUrl?: string;
    /**
     * The Active Directory resource ID.
     */
    readonly activeDirectoryGraphResourceId?: string;
    /**
     * The batch resource ID.
     */
    readonly batchResourceId?: string;
    /**
     * The Active Directory api version.
     */
    readonly activeDirectoryGraphApiVersion?: string;
    /**
     * The endpoint suffix for storage accounts.
     */
    readonly storageEndpointSuffix?: string;
    /**
     * The keyvault service dns suffix.
     */
    readonly keyVaultDnsSuffix?: string;
    /**
     * The data lake store filesystem service dns suffix.
     */
    readonly azureDataLakeStoreFileSystemEndpointSuffix?: string;
    /**
     * The data lake analytics job and catalog service dns suffix.
     */
    readonly azureDataLakeAnalyticsCatalogAndJobEndpointSuffix?: string;
    /**
     * Determines whether the authentication endpoint should be validated with Azure AD. Default value is true.
     */
    readonly validateAuthority?: boolean;
}
export declare class Environment {
    /**
     * The Environment name.
     */
    readonly name: string;
    /**
     * The management portal URL.
     */
    readonly portalUrl: string;
    /**
     * The management service endpoint.
     */
    readonly managementEndpointUrl: string;
    /**
     * The resource management endpoint.
     */
    readonly resourceManagerEndpointUrl: string;
    /**
     * The Active Directory login endpoint.
     */
    readonly activeDirectoryEndpointUrl: string;
    /**
     * The resource ID to obtain AD tokens for (token audience).
     */
    readonly activeDirectoryResourceId: string;
    /**
     * The publish settings file URL.
     */
    readonly publishingProfileUrl?: string;
    /**
     * The sql server management endpoint for mobile commands.
     */
    readonly sqlManagementEndpointUrl?: string;
    /**
     * The dns suffix for sql servers.
     */
    readonly sqlServerHostnameSuffix?: string;
    /**
     * The template gallery endpoint.
     */
    readonly galleryEndpointUrl?: string;
    /**
     * The batch resource ID.
     */
    readonly batchResourceId?: string;
    /**
     * The Active Directory resource ID.
     */
    readonly activeDirectoryGraphResourceId?: string;
    /**
     * The Active Directory api version.
     */
    readonly activeDirectoryGraphApiVersion?: string;
    /**
     * The endpoint suffix for storage accounts.
     */
    readonly storageEndpointSuffix?: string;
    /**
     * The keyvault service dns suffix.
     */
    readonly keyVaultDnsSuffix?: string;
    /**
     * The data lake store filesystem service dns suffix.
     */
    readonly azureDataLakeStoreFileSystemEndpointSuffix?: string;
    /**
     * The data lake analytics job and catalog service dns suffix.
     */
    readonly azureDataLakeAnalyticsCatalogAndJobEndpointSuffix?: string;
    /**
     * Determines whether the authentication endpoint should be validated with Azure AD. Default value is true.
     */
    readonly validateAuthority: boolean;
    constructor(parameters: EnvironmentParameters);
    static add(parameters: EnvironmentParameters): void;
    static get(name: string): Environment;
    static readonly AzureCloud: {
        name: string;
        portalUrl: string;
        publishingProfileUrl: string;
        managementEndpointUrl: string;
        resourceManagerEndpointUrl: string;
        sqlManagementEndpointUrl: string;
        sqlServerHostnameSuffix: string;
        galleryEndpointUrl: string;
        activeDirectoryEndpointUrl: string;
        activeDirectoryResourceId: string;
        activeDirectoryGraphResourceId: string;
        batchResourceId: string;
        activeDirectoryGraphApiVersion: string;
        storageEndpointSuffix: string;
        keyVaultDnsSuffix: string;
        azureDataLakeStoreFileSystemEndpointSuffix: string;
        azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: string;
        validateAuthority: boolean;
    };
    static readonly ChinaCloud: {
        name: string;
        portalUrl: string;
        publishingProfileUrl: string;
        managementEndpointUrl: string;
        resourceManagerEndpointUrl: string;
        sqlManagementEndpointUrl: string;
        sqlServerHostnameSuffix: string;
        galleryEndpointUrl: string;
        activeDirectoryEndpointUrl: string;
        activeDirectoryResourceId: string;
        activeDirectoryGraphResourceId: string;
        activeDirectoryGraphApiVersion: string;
        batchResourceId: string;
        storageEndpointSuffix: string;
        keyVaultDnsSuffix: string;
        azureDataLakeStoreFileSystemEndpointSuffix: string;
        azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: string;
        validateAuthority: boolean;
    };
    static readonly USGovernment: {
        name: string;
        portalUrl: string;
        publishingProfileUrl: string;
        managementEndpointUrl: string;
        resourceManagerEndpointUrl: string;
        sqlManagementEndpointUrl: string;
        sqlServerHostnameSuffix: string;
        galleryEndpointUrl: string;
        activeDirectoryEndpointUrl: string;
        activeDirectoryResourceId: string;
        activeDirectoryGraphResourceId: string;
        batchResourceId: string;
        activeDirectoryGraphApiVersion: string;
        storageEndpointSuffix: string;
        keyVaultDnsSuffix: string;
        azureDataLakeStoreFileSystemEndpointSuffix: string;
        azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: string;
        validateAuthority: boolean;
    };
    static readonly GermanCloud: {
        name: string;
        portalUrl: string;
        publishingProfileUrl: string;
        managementEndpointUrl: string;
        resourceManagerEndpointUrl: string;
        sqlManagementEndpointUrl: string;
        sqlServerHostnameSuffix: string;
        galleryEndpointUrl: string;
        activeDirectoryEndpointUrl: string;
        activeDirectoryResourceId: string;
        activeDirectoryGraphResourceId: string;
        batchResourceId: string;
        activeDirectoryGraphApiVersion: string;
        storageEndpointSuffix: string;
        keyVaultDnsSuffix: string;
        azureDataLakeStoreFileSystemEndpointSuffix: string;
        azureDataLakeAnalyticsCatalogAndJobEndpointSuffix: string;
        validateAuthority: boolean;
    };
}
//# sourceMappingURL=azureEnvironment.d.ts.map