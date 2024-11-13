/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ClientAuthError } from "../error/ClientAuthError";
import { UrlUtils } from "./UrlUtils";
import { Logger } from "../Logger";
import { AuthCache } from "../cache/AuthCache";
import { TemporaryCacheKeys, Constants } from "./Constants";
import { TimeUtils } from "./TimeUtils";

export class WindowUtils {
    /**
     * @hidden
     * Interval in milliseconds that we poll a window
     * @ignore
     */
    private static POLLING_INTERVAL_MS = 50;

    /**
     * @hidden
     * Checks if the current page is running in an iframe.
     * @ignore
     */
    static isInIframe(): boolean {
        return window.parent !== window;
    }

    /**
     * @hidden
     * Check if the current page is running in a popup.
     * @ignore
     */
    static isInPopup(): boolean {
        return !!(window.opener && window.opener !== window);
    }

    /**
     * @hidden
     * @param prefix
     * @param scopes
     * @param authority
     */
    static generateFrameName(prefix: string, requestSignature: string): string {
        return `${prefix}${Constants.resourceDelimiter}${requestSignature}`;
    }

    /**
     * @hidden
     * Polls an iframe until it loads a url with a hash
     * @ignore
     */
    static monitorIframeForHash(contentWindow: Window, timeout: number, urlNavigate: string, logger: Logger): Promise<string> {
        return new Promise((resolve, reject) => {
            /*
             * Polling for iframes can be purely timing based,
             * since we don't need to account for interaction.
             */
            const nowMark = TimeUtils.relativeNowMs();
            const timeoutMark = nowMark + timeout;

            logger.verbose("monitorWindowForIframe polling started");

            const intervalId = setInterval(() => {
                if (TimeUtils.relativeNowMs() > timeoutMark) {
                    logger.error("monitorIframeForHash unable to find hash in url, timing out");
                    logger.errorPii(`monitorIframeForHash polling timed out for url: ${urlNavigate}`);
                    clearInterval(intervalId);
                    reject(ClientAuthError.createTokenRenewalTimeoutError());
                    return;
                }

                let href;

                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = contentWindow.location.href;
                } catch (e) {}

                if (href && UrlUtils.urlContainsHash(href)) {
                    logger.verbose("monitorIframeForHash found url in hash");
                    clearInterval(intervalId);
                    resolve(contentWindow.location.hash);
                } 
            }, WindowUtils.POLLING_INTERVAL_MS);
        });
    }

    /**
     * @hidden
     * Polls a popup until it loads a url with a hash
     * @ignore
     */
    static monitorPopupForHash(contentWindow: Window, timeout: number, urlNavigate: string, logger: Logger): Promise<string> {
        return new Promise((resolve, reject) => {
            /*
             * Polling for popups needs to be tick-based,
             * since a non-trivial amount of time can be spent on interaction (which should not count against the timeout).
             */
            const maxTicks = timeout / WindowUtils.POLLING_INTERVAL_MS;
            let ticks = 0;

            logger.verbose("monitorWindowForHash polling started");

            const intervalId = setInterval(() => {
                if (contentWindow.closed) {
                    logger.error("monitorWindowForHash window closed");
                    clearInterval(intervalId);
                    reject(ClientAuthError.createUserCancelledError());
                    return;
                }

                let href;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = contentWindow.location.href;
                } catch (e) {}

                // Don't process blank pages or cross domain
                if (!href || href === "about:blank") {
                    return;
                }

                /*
                 * Only run clock when we are on same domain for popups
                 * as popup operations can take a long time.
                 */
                ticks++;

                if (href && UrlUtils.urlContainsHash(href)) {
                    logger.verbose("monitorPopupForHash found url in hash");
                    clearInterval(intervalId);
                    const hash = contentWindow.location.hash;
                    WindowUtils.clearUrlFragment(contentWindow);
                    resolve(hash);
                } else if (ticks > maxTicks) {
                    logger.error("monitorPopupForHash unable to find hash in url, timing out");
                    logger.errorPii(`monitorPopupForHash polling timed out for url: ${urlNavigate}`);
                    clearInterval(intervalId);
                    reject(ClientAuthError.createTokenRenewalTimeoutError());
                }
            }, WindowUtils.POLLING_INTERVAL_MS);
        });
    }

    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    static loadFrame(urlNavigate: string, frameName: string, timeoutMs: number, logger: Logger): Promise<HTMLIFrameElement> {
        /*
         * This trick overcomes iframe navigation in IE
         * IE does not load the page consistently in iframe
         */
        logger.infoPii("LoadFrame: " + frameName);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const frameHandle = this.loadFrameSync(urlNavigate, frameName, logger);

                if (!frameHandle) {
                    reject(`Unable to load iframe with name: ${frameName}`);
                    return;
                }

                resolve(frameHandle);
            }, timeoutMs);
        });
    }

    /**
     * @hidden
     * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
     * @param urlNavigate
     * @param frameName
     * @param logger
     */
    static loadFrameSync(urlNavigate: string, frameName: string, logger: Logger): HTMLIFrameElement{
        const frameHandle = WindowUtils.addHiddenIFrame(frameName, logger);

        // returning to handle null in loadFrame, also to avoid null object access errors
        if (!frameHandle) {
            return null;
        }
        else if (frameHandle.src === "" || frameHandle.src === "about:blank") {
            frameHandle.src = urlNavigate;
            logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
        }

        return frameHandle;
    }

    /**
     * @hidden
     * Adds the hidden iframe for silent token renewal.
     * @ignore
     */
    static addHiddenIFrame(iframeId: string, logger: Logger): HTMLIFrameElement {
        if (typeof iframeId === "undefined") {
            return null;
        }
        
        logger.info("Add msal iframe to document");
        logger.infoPii("Add msal frame to document:" + iframeId);
        let adalFrame = document.getElementById(iframeId) as HTMLIFrameElement;
        if (!adalFrame) {
            logger.verbose("Add msal iframe does not exist");
            const ifr = document.createElement("iframe");
            ifr.setAttribute("id", iframeId);
            ifr.setAttribute("aria-hidden", "true");
            ifr.style.visibility = "hidden";
            ifr.style.position = "absolute";
            ifr.style.width = ifr.style.height = "0";
            ifr.style.border = "0";
            ifr.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
            adalFrame = (document.getElementsByTagName("body")[0].appendChild(ifr) as HTMLIFrameElement);
        } else {
            logger.verbose("Add msal iframe already exists");
        }

        return adalFrame;
    }

    /**
     * @hidden
     * Removes a hidden iframe from the page.
     * @ignore
     */
    static removeHiddenIframe(iframe: HTMLIFrameElement): void {
        if (document.body === iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    }

    /**
     * @hidden
     * Find and return the iframe element with the given hash
     * @ignore
     */
    static getIframeWithHash(hash: string): HTMLIFrameElement {
        const iframes = document.getElementsByTagName("iframe");
        const iframeArray: Array<HTMLIFrameElement> = Array.apply(null, Array(iframes.length)).map((iframe: HTMLIFrameElement, index: number) => iframes.item(index)); // eslint-disable-line prefer-spread

        return iframeArray.filter((iframe: HTMLIFrameElement) => {
            try {
                return iframe.contentWindow.location.hash === hash;
            } catch (e) {
                return false;
            }
        })[0];
    }

    /**
     * @hidden
     * Returns an array of all the popups opened by MSAL
     * @ignore
     */
    static getPopups(): Array<Window> {
        if (!window.openedWindows) {
            window.openedWindows = [];
        }

        return window.openedWindows;
    }

    /**
     * @hidden
     * Find and return the popup with the given hash
     * @ignore
     */
    static getPopUpWithHash(hash: string): Window {
        return WindowUtils.getPopups().filter(popup => {
            try {
                return popup.location.hash === hash;
            } catch (e) {
                return false;
            }
        })[0];
    }

    /**
     * @hidden
     * Add the popup to the known list of popups
     * @ignore
     */
    static trackPopup(popup: Window): void {
        WindowUtils.getPopups().push(popup);
    }

    /**
     * @hidden
     * Close all popups
     * @ignore
     */
    static closePopups(): void {
        WindowUtils.getPopups().forEach(popup => popup.close());
    }

    /**
     * @ignore
     *
     * blocks any login/acquireToken calls to reload from within a hidden iframe (generated for silent calls)
     */
    static blockReloadInHiddenIframes(): void {
        // return an error if called from the hidden iframe created by the msal js silent calls
        if (UrlUtils.urlContainsHash(window.location.hash) && WindowUtils.isInIframe()) {
            throw ClientAuthError.createBlockTokenRequestsInHiddenIframeError();
        }
    }

    /**
     *
     * @param cacheStorage
     */
    static checkIfBackButtonIsPressed(cacheStorage: AuthCache): void {
        const redirectCache = cacheStorage.getItem(TemporaryCacheKeys.REDIRECT_REQUEST);

        // if redirect request is set and there is no hash
        if(redirectCache && !UrlUtils.urlContainsHash(window.location.hash)) {
            const splitCache = redirectCache.split(Constants.resourceDelimiter);
            splitCache.shift();
            const state = splitCache.length > 0 ? splitCache.join(Constants.resourceDelimiter): null;
            cacheStorage.resetTempCacheItems(state);
        }
    }

    /**
     * Removes url fragment from browser url
     */
    static clearUrlFragment(contentWindow: Window): void {
        contentWindow.location.hash = "";
        // Office.js sets history.replaceState to null
        if (typeof contentWindow.history.replaceState === "function") {
            // Full removes "#" from url
            contentWindow.history.replaceState(null, null, `${contentWindow.location.pathname}${contentWindow.location.search}`);
        }
    }
}
