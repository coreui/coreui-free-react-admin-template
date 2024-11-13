/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * @hidden
 */
export class TimeUtils {
    /**
     * Returns time in seconds for expiration based on string value passed in.
     *
     * @param expiresIn
     */
    static parseExpiresIn(expiresIn: string): number {
        // if AAD did not send "expires_in" property, use default expiration of 3599 seconds, for some reason AAD sends 3599 as "expires_in" value instead of 3600
        const expires = expiresIn || "3599";
        return parseInt(expires, 10);
    }

    /**
     * Return the current time in Unix time (seconds). Date.getTime() returns in milliseconds.
     */
    static now(): number {
        return Math.round(new Date().getTime() / 1000.0);
    }

    /**
     * Returns the amount of time in milliseconds since the page loaded.
     */
    static relativeNowMs(): number {
        return window.performance.now();
    }
}
