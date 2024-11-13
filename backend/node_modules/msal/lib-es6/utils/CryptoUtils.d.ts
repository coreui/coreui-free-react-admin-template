/**
 * @hidden
 */
export declare class CryptoUtils {
    /**
     * Creates a new random GUID
     * @returns string (GUID)
     */
    static createNewGuid(): string;
    /**
     * verifies if a string is  GUID
     * @param guid
     */
    static isGuid(guid: string): boolean;
    /**
     * Decimal to Hex
     *
     * @param num
     */
    static decimalToHex(num: number): string;
    /**
     * encoding string to base64 - platform specific check
     *
     * @param input
     */
    static base64Encode(input: string): string;
    /**
     * Decodes a base64 encoded string.
     *
     * @param input
     */
    static base64Decode(input: string): string;
    /**
     * deserialize a string
     *
     * @param query
     */
    static deserialize(query: string): object;
}
