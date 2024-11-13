import { IdTokenEntity } from "./IdTokenEntity";
import { AccessTokenEntity } from "./AccessTokenEntity";
import { RefreshTokenEntity } from "./RefreshTokenEntity";
import { AccountEntity } from "./AccountEntity";
import { AppMetadataEntity } from "./AppMetadataEntity";
export declare class CacheRecord {
    account: AccountEntity | null;
    idToken: IdTokenEntity | null;
    accessToken: AccessTokenEntity | null;
    refreshToken: RefreshTokenEntity | null;
    appMetadata: AppMetadataEntity | null;
    constructor(accountEntity?: AccountEntity | null, idTokenEntity?: IdTokenEntity | null, accessTokenEntity?: AccessTokenEntity | null, refreshTokenEntity?: RefreshTokenEntity | null, appMetadataEntity?: AppMetadataEntity | null);
}
//# sourceMappingURL=CacheRecord.d.ts.map