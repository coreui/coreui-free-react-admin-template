// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
/**
 * Encodes a string in base64 format.
 * @param value the string to encode
 */
export function encodeString(value) {
    return btoa(value);
}
/**
 * Encodes a byte array in base64 format.
 * @param value the Uint8Aray to encode
 */
export function encodeByteArray(value) {
    var str = "";
    for (var i = 0; i < value.length; i++) {
        str += String.fromCharCode(value[i]);
    }
    return btoa(str);
}
/**
 * Decodes a base64 string into a byte array.
 * @param value the base64 string to decode
 */
export function decodeString(value) {
    var byteString = atob(value);
    var arr = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        arr[i] = byteString.charCodeAt(i);
    }
    return arr;
}
//# sourceMappingURL=base64.browser.js.map