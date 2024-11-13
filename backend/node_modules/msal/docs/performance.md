# Performance

This document will outline techniques your application can use to improve the performance of acquire tokens using MSAL.js.

## Bypass authority metadata resolution

By default, during the process of retrieving a token MSAL.js will make two network requests to retrieve metadata from the authority configured for the request. If you would like to skip those network requests, you can provide the required metadata in the configuration of `UserAgentApplication`.

**Important:** It is your application's responsibility to ensure it is using correct, up-to-date authority metadata. Failure to do so may result in your application not working correctly.

Instructions:

1. Determine the authorize endpoint for your authority. For example, if you are using `https://login.microsoftonline.com/common/`, the authorize endpoint is `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`.
2. Determine the instance discovery endpoint for your authority. The instance discovery API is located at `https://login.microsoftonline.com/common/discovery/instance?api-version=1.0&authorization_endpoint={authorizeEndpoint}`. If you are using the `common` endpoint, this url is `https://login.microsoftonline.com/common/discovery/instance?api-version=1.0&authorization_endpoint=https://login.microsoftonline.com/common/oauth2/v2.0/authorize`.
3. Make a request to the instance discovery endpoint.
4. Parse the `tenant_discovery_endpoint` property from the response.
5. Make a request to the url for the `tenant_discovery_endpoint` property.
6. Take the **entire** response and provide the raw JSON string as the `auth.authorityMetadata` property for `UserAgentApplication`. It can also be passed per-request as a part of `AuthenticationParameters`.

Example:

```js
const msalInstance = new msal.UserAgentApplication({
    auth: {
        authorityMetadata: '{"token_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/token","token_endpoint_auth_methods_supported":["client_secret_post","private_key_jwt","client_secret_basic"],"jwks_uri":"https://login.microsoftonline.com/common/discovery/v2.0/keys","response_modes_supported":["query","fragment","form_post"],"subject_types_supported":["pairwise"],"id_token_signing_alg_values_supported":["RS256"],"response_types_supported":["code","id_token","code id_token","id_token token"],"scopes_supported":["openid","profile","email","offline_access"],"issuer":"https://login.microsoftonline.com/{tenantid}/v2.0","request_uri_parameter_supported":false,"userinfo_endpoint":"https://graph.microsoft.com/oidc/userinfo","authorization_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/authorize","http_logout_supported":true,"frontchannel_logout_supported":true,"end_session_endpoint":"https://login.microsoftonline.com/common/oauth2/v2.0/logout","claims_supported":["sub","iss","cloud_instance_name","cloud_instance_host_name","cloud_graph_host_name","msgraph_host","aud","exp","iat","auth_time","acr","nonce","preferred_username","name","tid","ver","at_hash","c_hash","email"],"tenant_region_scope":null,"cloud_instance_name":"microsoftonline.com","cloud_graph_host_name":"graph.windows.net","msgraph_host":"graph.microsoft.com","rbac_url":"https://pas.windows.net"}'
    }
});
```
