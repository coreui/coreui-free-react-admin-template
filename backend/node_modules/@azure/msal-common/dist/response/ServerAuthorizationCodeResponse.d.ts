/**
 * Deserialized response object from server authorization code request.
 * - code: authorization code from server
 * - client_info: client info object
 * - state: OAuth2 request state
 * - error: error sent back in hash
 * - error: description
 */
export declare type ServerAuthorizationCodeResponse = {
    code?: string;
    client_info?: string;
    state?: string;
    cloud_instance_name?: string;
    cloud_instance_host_name?: string;
    cloud_graph_host_name?: string;
    msgraph_host?: string;
    error?: string;
    error_description?: string;
    suberror?: string;
};
//# sourceMappingURL=ServerAuthorizationCodeResponse.d.ts.map