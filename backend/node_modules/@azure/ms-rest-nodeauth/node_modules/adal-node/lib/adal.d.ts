import * as http from "http";


/**
 * Describes the available logging levels.
 * ERROR: 0,
 * WARN: 1,
 * INFO: 2,
 * VERBOSE: 3
 * @type {number}
 */
export type LoggingLevel = 0 | 1 | 2 | 3;

/**
 * @callback LoggingCallback
 * @memberOf Logging
 * @param {LoggingLevel} level The level of this log entry.
 * @param {string} message The text content of the log entry.
 * @param {Error}  [error] An Error object if this is an {@link Logging.LOGGING_LEVEL.ERROR|ERROR} level log entry.
 */
type LoggingCallback = (level: LoggingLevel, message: string, error?: Error) => void;

/**
 * @typedef LoggingOptions
 * @memberOf Logging
 * @property {LoggingCallback} [log] The function to call when ADAL generates a log entry.
 * @property {LoggingLevel} [level] The maximum level of log entries to generate.
 * @property {boolean} [loggingWithPII] This value indicts if personal identity related information such as token and claims should be logged. The default value is false.
 */
interface LoggingOptions {
  log?: LoggingCallback;
  level?: LoggingLevel;
  loggingWithPII?: boolean;
}

export class Logging {
  /**
   * @property {LoggingLevel} LOGGING_LEVEL Provides information about the logging levels.
   * ERROR: 0,
   * WARN: 1,
   * INFO: 2,
   * VERBOSE: 3
   */
  static LOGGING_LEVEL: LoggingLevel;
  /**
   * Sets global logging options for ADAL.
   * @param {LoggingOptions} options
   */
  static setLoggingOptions(options: LoggingOptions): void;
  /**
   * Get's the current global logging options.
   * @return {LoggingOptions}
   */
  static getLoggingOptions(): LoggingOptions;
}

export function setGlobalADALOptions(): any; // TODO

export function getGlobalADALOptions(): any; // TODO

/**
 * Contains tokens and metadata upon successful completion of an acquireToken call.
 * @typedef TokenResponse
 */
export interface TokenResponse {
  /**
   * @property {string} tokenType The type of token returned. Example 'Bearer'.
   */
  tokenType: string;
  /**
   *  @property {int} expiresIn The amount of time, in seconds, for which the token is valid.
   */
  expiresIn: number;
  /**
   *  @property {Date} expiresOn The Date on which the access token expires.
   */
  expiresOn: Date | string;
  /**
   * @property {string} resource The resource for which the token was requested for. Example: 'https://management.core.windows.net/'.
   */
  resource: string;
  /**
   * @property {string} accessToken The returned access token.
   */
  accessToken: string;
  /**
   * @property {string} [refreshToken] A refresh token.
   */
  refreshToken?: string;

  /**
   * @property {Date} [createdOn] The date on which the access token was created.
   */
  createdOn?: Date | string;
  /**
   * @property {string} [userId] An id for the user.  May be a displayable value if is_user_id_displayable is true.
   */
  userId?: string;
  /**
   * @property {boolean}   [isUserIdDisplayable] Indicates whether the user_id property will be meaningful if displayed to a user.
   */
  isUserIdDisplayable?: boolean;
  /**
   * @property {string} [tenantId] The identifier of the tenant under which the access token was issued.
   */
  tenantId?: string;
  /**
   * @property {string} [oid] The object id of the user in the tenant
   */
  oid?: string;
  /**
   * @property {string} [givenName] The given name of the principal represented by the access token.
   */
  givenName?: string;
  /**
   * @property {string} [familyName] The family name of the principal represented by the access token.
   */
  familyName?: string;
  /**
   * @property {string} [identityProvider] Identifies the identity provider that issued the access token.
   */
  identityProvider?: string;

  /**
   * @property {any} [error] Provides information about error if any.
   */
  error?: any;

  /**
   * @property {any} [errorDescription] Short description about error if any.
   */
  errorDescription?: any;

  [x: string]: any;
}

/**
 * This will be returned in case the OAuth 2 service returns an error.
 * @typedef ErrorResponse
 * @property {string} [error] A server error.
 * @property {string} [errorDescription] A description of the error returned.
 */
export interface ErrorResponse {
  error: string;
  errorDescription: string;
}

/**
 * This is the callback that is passed to all acquireToken variants below.
 * @callback AcquireTokenCallback
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {TokenResponse|ErrorResponse} [response]   On a succesful request returns a {@link TokenResposne}.
 */
export type AcquireTokenCallback = (error: Error, response: TokenResponse | ErrorResponse) => void;

/**
 * This is the callback that is passed to all acquireUserCode method below.
 * @callback AcquireTokenCallback
 * @param {Error}  [error]           If the request fails this parameter will contain an Error object.
 * @param {UserCodeInfo} [response]   On a succesful request returns a {@link UserCodeInfo}.
 */
export type AcquireUserCodeCallback = (error: Error, response: UserCodeInfo) => void;

/**
 * This is an interface that can be implemented to provide custom token cache persistence.
 * @public
 * @interface TokenCache
 */
export interface TokenCache {
  /**
   * Removes a collection of entries from the cache in a single batch operation.
   * @param  {Array}   entries  An array of cache entries to remove.
   * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
   *                             first parameter.
   */
  remove(entires: TokenResponse[], callback: { (err: Error, result: null): void }): void;

  /**
   * Adds a collection of entries to the cache in a single batch operation.
   * @param {Array}   entries  An array of entries to add to the cache.
   * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
   *                             first parameter.
   */
  add(entries: TokenResponse[], callback: { (err: Error, result: boolean): void }): void;

  /**
   * Finds all entries in the cache that match all of the passed in values.
   * @param  {object}   query    This object will be compared to each entry in the cache.  Any entries that
   *                             match all of the values in this object will be returned.  All the values
   *                             in the passed in object must match values in a potentialy returned object
   *                             exactly.  The returned object may have more values than the passed in query
   *                             object. Please take a look at http://underscorejs.org/#where for an example 
   *                             on how to provide query.
   * @param  {TokenCacheFindCallback} callback
   */
  find(query: any, callback: { (err: Error, results: any[]): void }): void
}

/**
 * @class MemoryCache - Describes the in memory implementation of the token cache.
 */
export class MemoryCache implements TokenCache {
  /**
   * @private
   * @property {Array<TokenResponse>} _entries An array of entries in the TokenCache.
   */
  private _entries: TokenResponse[];

  /**
   * @constructor Creates an instance of MemoryCache
   */
  constructor();

  /**
   * Removes a collection of entries from the cache in a single batch operation.
   * @param  {Array}   entries  An array of cache entries to remove.
   * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
   *                             first parameter.
   */
  remove(entires: TokenResponse[], callback: { (err: Error, result: null): void }): void;

  /**
   * Adds a collection of entries to the cache in a single batch operation.
   * @param {Array}   entries  An array of entries to add to the cache.
   * @param  {Function} callback This function is called when the operation is complete.  Any error is provided as the
   *                             first parameter.
   */
  add(entries: TokenResponse[], callback: { (err: Error, result: boolean): void }): void;

  /**
   * Finds all entries in the cache that match all of the passed in values.
   * @param  {object}   query    This object will be compared to each entry in the cache.  Any entries that
   *                             match all of the values in this object will be returned.  All the values
   *                             in the passed in object must match values in a potentialy returned object
   *                             exactly.  The returned object may have more values than the passed in query
   *                             object. Please take a look at http://underscorejs.org/#where for an example 
   *                             on how to provide query.
   * @param  {TokenCacheFindCallback} callback
   */
  find(query: any, callback: { (err: Error, results: any[]): void }): void
}

export class AuthenticationContext {
  /**
   * @property {string}  authority A URL that identifies a token authority.
   */
  public authority: string;
  /**
   * @property {string} correlationId The correlation id that will be used for the next acquireToken request.
   */
  public correlationId: string;
  /**
   * @property {any} options Options that are applied to requests generated by this AuthenticationContext instance.
   */
  public options: any;
  /**
   * @property {TokenCache} cache The token cache used by this AuthenticationContext instance
   */
  public cache: TokenCache;

  /**
   * Creates a new AuthenticationContext object.  By default the authority will be checked against
   * a list of known Azure Active Directory authorities.  If the authority is not recognized as
   * one of these well known authorities then token acquisition will fail.  This behavior can be
   * turned off via the validateAuthority parameter below.
   * @constructor
   * @param {string}  authority            A URL that identifies a token authority.
   * @param {bool}   [validateAuthority]   Turns authority validation on or off.  This parameter default to true.
   * @param {TokenCache}   [cache]         Sets the token cache used by this AuthenticationContext instance.  If this parameter is not set
   *                                       then a default, in memory cache is used.  The default in memory cache is global to the process and is
   *                                       shared by all AuthenticationContexts that are created with an empty cache parameter.  To control the
   *                                       scope and lifetime of a cache you can either create a {@link MemoryCache} instance and pass it when
   *                                       constructing an AuthenticationContext or implement a custom {@link TokenCache} and pass that.  Cache
   *                                       instances passed at AuthenticationContext construction time are only used by that instance of
   *                                       the AuthenticationContext and are not shared unless it has been manually passed during the
   *                                       construction of other AuthenticationContexts.
   *
   */
  constructor(authority: string, validateAuthority?: boolean, cache?: TokenCache, aadApiVersion?: string);

  /**
   * Gets a token for a given resource.
   * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
   * @param {string}   clientId                            The OAuth client id of the calling application.
   * @param {string}   clientSecret                        The OAuth client secret of the calling application.
   * @param {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithClientCredentials(resource: string, clientId: string, clientSecret: string, callback: AcquireTokenCallback): void;

  /**
   * Gets a token for a given resource.
   * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
   * @param {string}   username                            The username of the user on behalf this application is authenticating.
   * @param {string}   password                            The password of the user named in the username parameter.
   * @param {string}   clientId                            The OAuth client id of the calling application.
   * @param {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithUsernamePassword(resource: string, username: string, password: string, clientId: string, callback: AcquireTokenCallback): void;

  /**
   * Gets a token for a given resource.
   * @param {string}   authorizationCode                   An authorization code returned from a client.
   * @param {string}   redirectUri                         The redirect uri that was used in the authorize call.
   * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
   * @param {string}   clientId                            The OAuth client id of the calling application.
   * @param {string}   clientSecret                        The OAuth client secret of the calling application.
   * @param {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithAuthorizationCode(authorizationCode: string, redirectUri: string, resource: string, clientId: string, clientSecret: string, callback: AcquireTokenCallback): void;

  /**
   * Gets a new access token via a previously issued refresh token.
   * @param  {string}   refreshToken                        A refresh token returned in a tokne response from a previous invocation of acquireToken.
   * @param  {string}   clientId                            The OAuth client id of the calling application.
   * @param  {string}   [clientSecret]                      The OAuth client secret of the calling application.  (Note: this parameter is a late addition.
   *                                                        This parameter may be ommitted entirely so that applications built before this change will continue
   *                                                        to work unchanged.)
   * @param  {string}   resource                            The OAuth resource for which a token is being request.  This parameter is optional and can be set to null.
   * @param  {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithRefreshToken(refreshToken: string, clientId: string, resource: string, callback: AcquireTokenCallback): void;
  public acquireTokenWithRefreshToken(refreshToken: string, clientId: string, clientSecret: string, resource: string, callback: AcquireTokenCallback): void;

  /**
   * Gets a token for a given resource.
   * @param {string}   resource                            A URI that identifies the resource for which the token is valid.
   * @param {string}   userId                              The username of the user on behalf this application is authenticating.
   * @param {string}   clientId                            The OAuth client id of the calling application.
   * @param {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireToken(resource: string, userId: string, clientId: string, callback: AcquireTokenCallback): void

  /**
   * Gets the userCodeInfo which contains user_code, device_code for authenticating user on device. 
   * @param  {string}   resource                            A URI that identifies the resource for which the device_code and user_code is valid for.
   * @param  {string}   clientId                            The OAuth client id of the calling application.
   * @param  {string}   language                            The language code specifying how the message should be localized to. 
   * @param  {AcquireUserCodeCallback}   callback              The callback function.
   */
  public acquireUserCode(resource: string, clientId: string, language: string, callback: AcquireUserCodeCallback): void;

  /**
   * Gets a new access token using via a certificate credential.
   * @param  {string}   resource                            A URI that identifies the resource for which the token is valid.
   * @param  {string}   clientId                            The OAuth client id of the calling application.
   * @param  {string}   certificate                         A PEM encoded certificate private key.
   * @param  {string}   thumbprint                          A hex encoded thumbprint of the certificate.
   * @param  {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithClientCertificate(resource: string, clientId: string, certificate: string, thumbprint: string, callback: AcquireTokenCallback): void;

  /**
   * Gets a new access token using via a device code.
   * @note This method doesn't look up the cache, it only stores the returned token into cache. To look up cache before making a new request, 
   *       please use acquireToken.  
   * @param  {string}   clientId                            The OAuth client id of the calling application.
   * @param  {object}   userCodeInfo                        Contains device_code, retry interval, and expire time for the request for get the token. 
   * @param  {AcquireTokenCallback}   callback              The callback function.
   */
  public acquireTokenWithDeviceCode(resource: string, clientId: string, userCodeInfo: UserCodeInfo, callback: AcquireTokenCallback): void;

  /**
   * Cancels the polling request to get token with device code. 
   * @param  {object}   userCodeInfo                        Contains device_code, retry interval, and expire time for the request for get the token. 
   * @param  {AcquireTokenCallback}   callback              The callback function.
   */
  public cancelRequestToGetTokenWithDeviceCode(userCodeInfo: UserCodeInfo, callback: AcquireTokenCallback): void;
}

/**
 * Describes the user code information that is provided by ADAL while authenticating via DeviceCode.
 */
export interface UserCodeInfo {
  deviceCode: string;
  expiresIn: number;
  interval: number;
  message: string;
  userCode: string;
  verificationUrl: string;
  error?: any;
  errorDescription?: any;
  [x: string]: any;
}

/**
 * Creates a new AuthenticationContext object.  By default the authority will be checked against
 * a list of known Azure Active Directory authorities.  If the authority is not recognized as
 * one of these well known authorities then token acquisition will fail.  This behavior can be
 * turned off via the validateAuthority parameter below.
 * @function
 * @param {string}  authority            A URL that identifies a token authority.
 * @param {bool}    [validateAuthority]  Turns authority validation on or off.  This parameter default to true.
 * @returns {AuthenticationContext}      A new authentication context.
 */
export function createAuthenticationContext(authority: string, validateAuthority?: boolean): AuthenticationContext;

/**
 * @class
 * Describes the parameters that are parsed from an OAuth challenge in the www-authenticate header.
 */
export class AuthenticationParameters {
  authorizationUri: string;
  resource: string;
  /**
   * @constructor Provides an instance of AuthenticationParameters
   * @param {string} authorizationUri The URI of an authority that can issues tokens for the resource that issued the challenge.
   * @param {string} resource         The resource for a which a token should be requested from the authority.
   */
  constructor(authorizationUri: string, resource: string);
}

/**
 * Creates an {@link AuthenticationParameters} object from the contents of a
 * www-authenticate header received from a HTTP 401 response from a resource server.
 * @param  {string} challenge The content fo the www-authenticate header.
 * @return {AuthenticationParameters}           An AuthenticationParameters object containing the parsed values from the header.
 */
export function createAuthenticationParametersFromHeader(challenge: string): AuthenticationParameters;

/**
 * Create an {@link AuthenticationParameters} object from a node http.IncomingMessage
 * object that was created as a result of a request to a resource server.  This function
 * expects the response to contain a HTTP 401 error code with a www-authenticate
 * header.
 * @param  {http.IncomingMessage} response A response from a http request to a resource server.
 * @return {AuthenticationParameters}
 */
export function createAuthenticationParametersFromResponse(response: http.IncomingMessage): AuthenticationParameters;

/**
 * Creates an {@link AuthenticationParameters} object by sending a get request
 * to the url passed to this function, and parsing the resulting http 401
 * response.
 * @param  {string|url}               url               The url of a resource server.
 * @param  {AuthenticationParameters} callback          Called on error or request completion.
 * @param  {string}                   [correlationId]   An optional correlationId to pass along with the request and to include in any logs.
 */
export function createAuthenticationParametersFromUrl(url: string, callback: { (error: Error, parameters: AuthenticationParameters): void }, correlationId?: string): AuthenticationParameters;