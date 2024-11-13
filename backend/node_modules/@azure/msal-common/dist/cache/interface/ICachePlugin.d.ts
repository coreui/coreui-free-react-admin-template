import { TokenCacheContext } from "../persistence/TokenCacheContext";
export interface ICachePlugin {
    beforeCacheAccess: (tokenCacheContext: TokenCacheContext) => Promise<void>;
    afterCacheAccess: (tokenCacheContext: TokenCacheContext) => Promise<void>;
}
//# sourceMappingURL=ICachePlugin.d.ts.map