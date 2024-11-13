// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { readFileSync } from "fs";
import { createHash } from "crypto";
import { ApplicationTokenCredentialsBase } from "./applicationTokenCredentialsBase";
import { Environment } from "@azure/ms-rest-azure-env";
import { AuthConstants, TokenAudience } from "../util/authConstants";
import { TokenResponse, ErrorResponse, TokenCache } from "adal-node";
import { AzureTokenCredentialsOptions } from "../login";

export class ApplicationTokenCertificateCredentials extends ApplicationTokenCredentialsBase {
  readonly certificate: string;
  readonly thumbprint: string;

  /**
   * Creates a new ApplicationTokenCredentials object.
   * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
   * for detailed instructions on creating an Azure Active Directory application.
   *
   * @param clientId - The active directory application client id.
   * @param domain - The domain or tenant id containing this application.
   * @param certificate - A PEM encoded certificate private key.
   * @param thumbprint - A hex encoded thumbprint of the certificate.
   * @param tokenAudience - The audience for which the token is requested. Valid values are 'graph', 'batch', or any other resource like 'https://vault.azure.net/'.
   * If tokenAudience is 'graph' then domain should also be provided and its value should not be the default 'common' tenant. It must be a string (preferrably in a guid format).
   * @param environment - The azure environment to authenticate with.
   * @param tokenCache - The token cache. Default value is the MemoryCache object from adal.
   */
  public constructor(
    clientId: string,
    domain: string,
    certificate: string,
    thumbprint: string,
    tokenAudience?: TokenAudience,
    environment?: Environment,
    tokenCache?: TokenCache
  ) {
    if (!certificate || typeof certificate.valueOf() !== "string") {
      throw new Error("certificate must be a non empty string.");
    }
    if (!thumbprint || typeof thumbprint.valueOf() !== "string") {
      throw new Error("thumbprint must be a non empty string.");
    }
    super(clientId, domain, tokenAudience, environment, tokenCache);

    this.certificate = certificate;
    this.thumbprint = thumbprint;
  }

  /**
   * Tries to get the token from cache initially. If that is unsuccessfull then it tries to get the token from ADAL.
   * @returns A promise that resolves to TokenResponse and rejects with an Error.
   */
  public async getToken(): Promise<TokenResponse> {
    try {
      return await this.getTokenFromCache();
    } catch (error) {
      if (error.message.startsWith(AuthConstants.SDK_INTERNAL_ERROR)) {
        throw error;
      }

      return new Promise((resolve, reject) => {
        const resource = this.getActiveDirectoryResourceId();
        this.authContext.acquireTokenWithClientCertificate(
          resource,
          this.clientId,
          this.certificate,
          this.thumbprint,
          (error: any, tokenResponse: TokenResponse | ErrorResponse) => {
            if (error) {
              return reject(error);
            }
            if (tokenResponse.error || tokenResponse.errorDescription) {
              return reject(tokenResponse);
            }
            return resolve(tokenResponse as TokenResponse);
          }
        );
      });
    }
  }

  /**
   * Creates a new instance of ApplicationTokenCertificateCredentials.
   *
   * @param clientId  The active directory application client id also known as the SPN (ServicePrincipal Name).
   * See {@link https://azure.microsoft.com/en-us/documentation/articles/active-directory-devquickstarts-dotnet/ Active Directory Quickstart for .Net}
   * for an example.
   * @param certificateStringOrFilePath - A PEM encoded certificate and private key OR an absolute filepath to the .pem file containing that information. For example:
   * - CertificateString: "-----BEGIN PRIVATE KEY-----\n<xxxxx>\n-----END PRIVATE KEY-----\n-----BEGIN CERTIFICATE-----\n<yyyyy>\n-----END CERTIFICATE-----\n"
   * - CertificateFilePath: **Absolute** file path of the .pem file.
   * @param domain The domain or tenant id containing this application.
   * @param options AzureTokenCredentialsOptions - Object representing optional parameters.
   *
   * @returns ApplicationTokenCertificateCredentials
   */
  public static create(
    clientId: string,
    certificateStringOrFilePath: string,
    domain: string,
    options: AzureTokenCredentialsOptions
  ): ApplicationTokenCertificateCredentials {
    if (!certificateStringOrFilePath || typeof certificateStringOrFilePath.valueOf() !== "string") {
      throw new Error("'certificateStringOrFilePath' must be a non empty string.");
    }
    if (!certificateStringOrFilePath.startsWith("-----BEGIN")) {
      certificateStringOrFilePath = readFileSync(certificateStringOrFilePath, "utf8");
    }
    const certificatePattern = /(-+BEGIN CERTIFICATE-+)(\n\r?|\r\n?)([A-Za-z0-9\+\/\n\r]+\=*)(\n\r?|\r\n?)(-+END CERTIFICATE-+)/;
    const matchCert = certificateStringOrFilePath.match(certificatePattern);
    const rawCertificate = matchCert ? matchCert[3] : "";
    if (!rawCertificate) {
      throw new Error(
        "Unable to correctly parse the certificate from the value provided in 'certificateStringOrFilePath' "
      );
    }
    const thumbprint = createHash("sha1")
      .update(Buffer.from(rawCertificate, "base64"))
      .digest("hex");
    return new ApplicationTokenCertificateCredentials(
      clientId,
      domain,
      certificateStringOrFilePath,
      thumbprint,
      options.tokenAudience,
      options.environment,
      options.tokenCache
    );
  }
}
