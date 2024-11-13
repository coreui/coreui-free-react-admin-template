import { ICrypto } from "./ICrypto";
import { BaseAuthRequest } from "../request/BaseAuthRequest";
export declare class PopTokenGenerator {
    private cryptoUtils;
    constructor(cryptoUtils: ICrypto);
    generateCnf(request: BaseAuthRequest): Promise<string>;
    signPopToken(accessToken: string, request: BaseAuthRequest): Promise<string>;
}
//# sourceMappingURL=PopTokenGenerator.d.ts.map