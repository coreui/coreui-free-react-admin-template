import { INetworkModule } from "../network/INetworkModule";
import { ICrypto } from "../crypto/ICrypto";
import { ILoggerCallback, LogLevel } from "../logger/Logger";
import { Authority } from "../authority/Authority";
import { CacheManager } from "../cache/CacheManager";
import { ServerTelemetryManager } from "../telemetry/server/ServerTelemetryManager";
import { ICachePlugin } from "../cache/interface/ICachePlugin";
import { ISerializableTokenCache } from "../cache/interface/ISerializableTokenCache";
/**
 * Use the configuration object to configure MSAL Modules and initialize the base interfaces for MSAL.
 *
 * This object allows you to configure important elements of MSAL functionality:
 * - authOptions                - Authentication for application
 * - cryptoInterface            - Implementation of crypto functions
 * - libraryInfo                - Library metadata
 * - loggerOptions              - Logging for application
 * - networkInterface           - Network implementation
 * - storageInterface           - Storage implementation
 * - systemOptions              - Additional library options
 * - clientCredentials          - Credentials options for confidential clients
 */
export declare type ClientConfiguration = {
    authOptions: AuthOptions;
    systemOptions?: SystemOptions;
    loggerOptions?: LoggerOptions;
    storageInterface?: CacheManager;
    networkInterface?: INetworkModule;
    cryptoInterface?: ICrypto;
    clientCredentials?: ClientCredentials;
    libraryInfo?: LibraryInfo;
    serverTelemetryManager?: ServerTelemetryManager | null;
    persistencePlugin?: ICachePlugin | null;
    serializableCache?: ISerializableTokenCache | null;
};
export declare type CommonClientConfiguration = {
    authOptions: Required<AuthOptions>;
    systemOptions: Required<SystemOptions>;
    loggerOptions: Required<LoggerOptions>;
    storageInterface: CacheManager;
    networkInterface: INetworkModule;
    cryptoInterface: Required<ICrypto>;
    libraryInfo: LibraryInfo;
    serverTelemetryManager: ServerTelemetryManager | null;
    clientCredentials: ClientCredentials;
    persistencePlugin: ICachePlugin | null;
    serializableCache: ISerializableTokenCache | null;
};
/**
 * Use this to configure the auth options in the ClientConfiguration object
 *
 * - clientId                    - Client ID of your app registered with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview in Microsoft Identity Platform
 * - authority                   - You can configure a specific authority, defaults to " " or "https://login.microsoftonline.com/common"
 * - knownAuthorities            - An array of URIs that are known to be valid. Used in B2C scenarios.
 * - cloudDiscoveryMetadata      - A string containing the cloud discovery response. Used in AAD scenarios.
 * - clientCapabilities          - Array of capabilities which will be added to the claims.access_token.xms_cc request property on every network request.
 * - protocolMode                - Enum that represents the protocol that msal follows. Used for configuring proper endpoints.
 */
export declare type AuthOptions = {
    clientId: string;
    authority: Authority;
    clientCapabilities?: Array<string>;
};
/**
 * Use this to configure token renewal info in the Configuration object
 *
 * - tokenRenewalOffsetSeconds    - Sets the window of offset needed to renew the token before expiry
 */
export declare type SystemOptions = {
    tokenRenewalOffsetSeconds?: number;
    preventCorsPreflight?: boolean;
};
/**
 *  Use this to configure the logging that MSAL does, by configuring logger options in the Configuration object
 *
 * - loggerCallback                - Callback for logger
 * - piiLoggingEnabled             - Sets whether pii logging is enabled
 * - logLevel                      - Sets the level at which logging happens
 * - correlationId                 - Sets the correlationId printed by the logger
 */
export declare type LoggerOptions = {
    loggerCallback?: ILoggerCallback;
    piiLoggingEnabled?: boolean;
    logLevel?: LogLevel;
    correlationId?: string;
};
/**
 * Library-specific options
 */
export declare type LibraryInfo = {
    sku: string;
    version: string;
    cpu: string;
    os: string;
};
/**
 * Credentials for confidential clients
 */
export declare type ClientCredentials = {
    clientSecret?: string;
    clientAssertion?: {
        assertion: string;
        assertionType: string;
    };
};
export declare const DEFAULT_SYSTEM_OPTIONS: Required<SystemOptions>;
/**
 * Function that sets the default options when not explicitly configured from app developer
 *
 * @param Configuration
 *
 * @returns Configuration
 */
export declare function buildClientConfiguration({ authOptions: userAuthOptions, systemOptions: userSystemOptions, loggerOptions: userLoggerOption, storageInterface: storageImplementation, networkInterface: networkImplementation, cryptoInterface: cryptoImplementation, clientCredentials: clientCredentials, libraryInfo: libraryInfo, serverTelemetryManager: serverTelemetryManager, persistencePlugin: persistencePlugin, serializableCache: serializableCache }: ClientConfiguration): CommonClientConfiguration;
//# sourceMappingURL=ClientConfiguration.d.ts.map