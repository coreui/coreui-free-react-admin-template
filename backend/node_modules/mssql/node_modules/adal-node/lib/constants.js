/*
 * @copyright
 * Copyright © Microsoft Open Technologies, Inc.
 *
 * All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: *www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
 * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
 *
 * See the Apache License, Version 2.0 for the specific language
 * governing permissions and limitations under the License.
 */
'use strict';

var Constants = {
  OAuth2 : {
      Parameters : {
        GRANT_TYPE : 'grant_type',
        CLIENT_ASSERTION : 'client_assertion',
        CLIENT_ASSERTION_TYPE : 'client_assertion_type',
        CLIENT_ID : 'client_id',
        CLIENT_SECRET : 'client_secret',
        REDIRECT_URI : 'redirect_uri',
        RESOURCE : 'resource',
        CODE : 'code',
        SCOPE : 'scope',
        ASSERTION : 'assertion',
        AAD_API_VERSION : 'api-version',
        USERNAME : 'username',
        PASSWORD : 'password',
        REFRESH_TOKEN : 'refresh_token', 
        LANGUAGE : 'mkt', 
        DEVICE_CODE : 'device_code', 
      },

      GrantType : {
        AUTHORIZATION_CODE : 'authorization_code',
        REFRESH_TOKEN : 'refresh_token',
        CLIENT_CREDENTIALS : 'client_credentials',
        JWT_BEARER : 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        PASSWORD : 'password',
        SAML1 : 'urn:ietf:params:oauth:grant-type:saml1_1-bearer',
        SAML2 : 'urn:ietf:params:oauth:grant-type:saml2-bearer',
        DEVICE_CODE: 'device_code'
      },

      ResponseParameters : {
        CODE : 'code',
        TOKEN_TYPE : 'token_type',
        ACCESS_TOKEN : 'access_token',
        ID_TOKEN : 'id_token',
        REFRESH_TOKEN : 'refresh_token',
        CREATED_ON : 'created_on',
        EXPIRES_ON : 'expires_on',
        EXPIRES_IN : 'expires_in',
        RESOURCE : 'resource',
        ERROR : 'error',
        ERROR_DESCRIPTION : 'error_description'
      },

      DeviceCodeResponseParameters : {
         USER_CODE : 'user_code', 
         DEVICE_CODE : 'device_code', 
         VERIFICATION_URL : 'verification_url',
         EXPIRES_IN : 'expires_in', 
         INTERVAL: 'interval', 
         MESSAGE: 'message', 
         ERROR: 'error', 
         ERROR_DESCRIPTION: 'error_description'
      },

      Scope : {
        OPENID : 'openid'
      },

      IdTokenMap : {
        'tid' : 'tenantId',
        'given_name' : 'givenName',
        'family_name' : 'familyName',
        'idp' : 'identityProvider',
        'oid': 'oid'
      }
    },

    TokenResponseFields : {
      TOKEN_TYPE : 'tokenType',
      ACCESS_TOKEN : 'accessToken',
      REFRESH_TOKEN : 'refreshToken',
      CREATED_ON : 'createdOn',
      EXPIRES_ON : 'expiresOn',
      EXPIRES_IN : 'expiresIn',
      RESOURCE : 'resource',
      USER_ID : 'userId',
      ERROR : 'error',
      ERROR_DESCRIPTION : 'errorDescription'
    },

    UserCodeResponseFields : {
        USER_CODE : 'userCode', 
        DEVICE_CODE: 'deviceCode', 
        VERIFICATION_URL: 'verificationUrl',
        EXPIRES_IN: 'expiresIn', 
        INTERVAL: 'interval', 
        MESSAGE: 'message', 
        ERROR: 'error', 
        ERROR_DESCRIPTION: 'errorDescription'
    },

    IdTokenFields : {
      USER_ID : 'userId',
      IS_USER_ID_DISPLAYABLE : 'isUserIdDisplayable',
      TENANT_ID : 'tenantId',
      GIVE_NAME : 'givenName',
      FAMILY_NAME : 'familyName',
      IDENTITY_PROVIDER : 'identityProvider'
    },

    Misc : {
      MAX_DATE : 0xffffffff,
      CLOCK_BUFFER : 5 // In minutes.
    },

    Jwt : {
      SELF_SIGNED_JWT_LIFETIME : 10, // 10 mins in mins
      AUDIENCE : 'aud',
      ISSUER : 'iss',
      SUBJECT : 'sub',
      NOT_BEFORE : 'nbf',
      EXPIRES_ON : 'exp',
      JWT_ID : 'jti'
    },

    AADConstants : {
      WORLD_WIDE_AUTHORITY : 'login.windows.net',
      WELL_KNOWN_AUTHORITY_HOSTS : ['login.windows.net', 'login.microsoftonline.com', 'login.chinacloudapi.cn', 'login-us.microsoftonline.com', 'login.microsoftonline.de', 'login.microsoftonline.us'],
      INSTANCE_DISCOVERY_ENDPOINT_TEMPLATE : 'https://{authorize_host}/common/discovery/instance?authorization_endpoint={authorize_endpoint}&api-version=1.0',
      AUTHORIZE_ENDPOINT_PATH : '/oauth2/authorize',
      TOKEN_ENDPOINT_PATH : '/oauth2/token', 
      DEVICE_ENDPOINT_PATH : '/oauth2/devicecode'
    },

    UserRealm : {
      FederationProtocolType : {
        WSFederation : 'wstrust',
        SAML2 : 'saml20',
        Unknown : 'unknown'
      },

      AccountType : {
        Federated : 'federated',
        Managed : 'managed',
        Unknown : 'unknown'
      }
    },

    Saml : {
      TokenTypeV1 : 'urn:oasis:names:tc:SAML:1.0:assertion',
      TokenTypeV2 : 'urn:oasis:names:tc:SAML:2.0:assertion'
    },

    XmlNamespaces : {
      wsdl   : 'http://schemas.xmlsoap.org/wsdl/',
      sp     : 'http://docs.oasis-open.org/ws-sx/ws-securitypolicy/200702',
      sp2005 : 'http://schemas.xmlsoap.org/ws/2005/07/securitypolicy',
      wsu    : 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd',
      wsa10  : 'http://www.w3.org/2005/08/addressing',
      http   : 'http://schemas.microsoft.com/ws/06/2004/policy/http',
      soap12 : 'http://schemas.xmlsoap.org/wsdl/soap12/',
      wsp    : 'http://schemas.xmlsoap.org/ws/2004/09/policy',
      s      : 'http://www.w3.org/2003/05/soap-envelope',
      wsa    : 'http://www.w3.org/2005/08/addressing',
      wst    : 'http://docs.oasis-open.org/ws-sx/ws-trust/200512', 
      t      : 'http://schemas.xmlsoap.org/ws/2005/02/trust'
    },

    Cache : {
      HASH_ALGORITHM : 'sha256'
    },

    HttpError : {
      UNAUTHORIZED : 401
    },

    AdalIdParameters : {
      SKU : 'x-client-SKU',
      VERSION : 'x-client-Ver',
      OS : 'x-client-OS',
      CPU : 'x-client-CPU',
      NODE_SKU : 'Node'
    },

    WSTrustVersion : {
       UNDEFINED : 'undefined', 
       WSTRUST13 : 'wstrust13', 
       WSTRUST2005 : 'wstrust2005'
    } 
  };

module.exports = Constants;
