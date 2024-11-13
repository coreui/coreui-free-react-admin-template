"use strict";
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowUtils = void 0;
var ClientAuthError_1 = require("../error/ClientAuthError");
var UrlUtils_1 = require("./UrlUtils");
var Constants_1 = require("./Constants");
var TimeUtils_1 = require("./TimeUtils");
var WindowUtils = /** @class */ (function () {
    function WindowUtils() {
    }
    /**
     * @hidden
     * Checks if the current page is running in an iframe.
     * @ignore
     */
    WindowUtils.isInIframe = function () {
        return window.parent !== window;
    };
    /**
     * @hidden
     * Check if the current page is running in a popup.
     * @ignore
     */
    WindowUtils.isInPopup = function () {
        return !!(window.opener && window.opener !== window);
    };
    /**
     * @hidden
     * @param prefix
     * @param scopes
     * @param authority
     */
    WindowUtils.generateFrameName = function (prefix, requestSignature) {
        return "" + prefix + Constants_1.Constants.resourceDelimiter + requestSignature;
    };
    /**
     * @hidden
     * Polls an iframe until it loads a url with a hash
     * @ignore
     */
    WindowUtils.monitorIframeForHash = function (contentWindow, timeout, urlNavigate, logger) {
        return new Promise(function (resolve, reject) {
            /*
             * Polling for iframes can be purely timing based,
             * since we don't need to account for interaction.
             */
            var nowMark = TimeUtils_1.TimeUtils.relativeNowMs();
            var timeoutMark = nowMark + timeout;
            logger.verbose("monitorWindowForIframe polling started");
            var intervalId = setInterval(function () {
                if (TimeUtils_1.TimeUtils.relativeNowMs() > timeoutMark) {
                    logger.error("monitorIframeForHash unable to find hash in url, timing out");
                    logger.errorPii("monitorIframeForHash polling timed out for url: " + urlNavigate);
                    clearInterval(intervalId);
                    reject(ClientAuthError_1.ClientAuthError.createTokenRenewalTimeoutError());
                    return;
                }
                var href;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = contentWindow.location.href;
                }
                catch (e) { }
                if (href && UrlUtils_1.UrlUtils.urlContainsHash(href)) {
                    logger.verbose("monitorIframeForHash found url in hash");
                    clearInterval(intervalId);
                    resolve(contentWindow.location.hash);
                }
            }, WindowUtils.POLLING_INTERVAL_MS);
        });
    };
    /**
     * @hidden
     * Polls a popup until it loads a url with a hash
     * @ignore
     */
    WindowUtils.monitorPopupForHash = function (contentWindow, timeout, urlNavigate, logger) {
        return new Promise(function (resolve, reject) {
            /*
             * Polling for popups needs to be tick-based,
             * since a non-trivial amount of time can be spent on interaction (which should not count against the timeout).
             */
            var maxTicks = timeout / WindowUtils.POLLING_INTERVAL_MS;
            var ticks = 0;
            logger.verbose("monitorWindowForHash polling started");
            var intervalId = setInterval(function () {
                if (contentWindow.closed) {
                    logger.error("monitorWindowForHash window closed");
                    clearInterval(intervalId);
                    reject(ClientAuthError_1.ClientAuthError.createUserCancelledError());
                    return;
                }
                var href;
                try {
                    /*
                     * Will throw if cross origin,
                     * which should be caught and ignored
                     * since we need the interval to keep running while on STS UI.
                     */
                    href = contentWindow.location.href;
                }
                catch (e) { }
                // Don't process blank pages or cross domain
                if (!href || href === "about:blank") {
                    return;
                }
                /*
                 * Only run clock when we are on same domain for popups
                 * as popup operations can take a long time.
                 */
                ticks++;
                if (href && UrlUtils_1.UrlUtils.urlContainsHash(href)) {
                    logger.verbose("monitorPopupForHash found url in hash");
                    clearInterval(intervalId);
                    var hash = contentWindow.location.hash;
                    WindowUtils.clearUrlFragment(contentWindow);
                    resolve(hash);
                }
                else if (ticks > maxTicks) {
                    logger.error("monitorPopupForHash unable to find hash in url, timing out");
                    logger.errorPii("monitorPopupForHash polling timed out for url: " + urlNavigate);
                    clearInterval(intervalId);
                    reject(ClientAuthError_1.ClientAuthError.createTokenRenewalTimeoutError());
                }
            }, WindowUtils.POLLING_INTERVAL_MS);
        });
    };
    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    WindowUtils.loadFrame = function (urlNavigate, frameName, timeoutMs, logger) {
        var _this = this;
        /*
         * This trick overcomes iframe navigation in IE
         * IE does not load the page consistently in iframe
         */
        logger.infoPii("LoadFrame: " + frameName);
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                var frameHandle = _this.loadFrameSync(urlNavigate, frameName, logger);
                if (!frameHandle) {
                    reject("Unable to load iframe with name: " + frameName);
                    return;
                }
                resolve(frameHandle);
            }, timeoutMs);
        });
    };
    /**
     * @hidden
     * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
     * @param urlNavigate
     * @param frameName
     * @param logger
     */
    WindowUtils.loadFrameSync = function (urlNavigate, frameName, logger) {
        var frameHandle = WindowUtils.addHiddenIFrame(frameName, logger);
        // returning to handle null in loadFrame, also to avoid null object access errors
        if (!frameHandle) {
            return null;
        }
        else if (frameHandle.src === "" || frameHandle.src === "about:blank") {
            frameHandle.src = urlNavigate;
            logger.infoPii("Frame Name : " + frameName + " Navigated to: " + urlNavigate);
        }
        return frameHandle;
    };
    /**
     * @hidden
     * Adds the hidden iframe for silent token renewal.
     * @ignore
     */
    WindowUtils.addHiddenIFrame = function (iframeId, logger) {
        if (typeof iframeId === "undefined") {
            return null;
        }
        logger.info("Add msal iframe to document");
        logger.infoPii("Add msal frame to document:" + iframeId);
        var adalFrame = document.getElementById(iframeId);
        if (!adalFrame) {
            logger.verbose("Add msal iframe does not exist");
            var ifr = document.createElement("iframe");
            ifr.setAttribute("id", iframeId);
            ifr.setAttribute("aria-hidden", "true");
            ifr.style.visibility = "hidden";
            ifr.style.position = "absolute";
            ifr.style.width = ifr.style.height = "0";
            ifr.style.border = "0";
            ifr.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
            adalFrame = document.getElementsByTagName("body")[0].appendChild(ifr);
        }
        else {
            logger.verbose("Add msal iframe already exists");
        }
        return adalFrame;
    };
    /**
     * @hidden
     * Removes a hidden iframe from the page.
     * @ignore
     */
    WindowUtils.removeHiddenIframe = function (iframe) {
        if (document.body === iframe.parentNode) {
            document.body.removeChild(iframe);
        }
    };
    /**
     * @hidden
     * Find and return the iframe element with the given hash
     * @ignore
     */
    WindowUtils.getIframeWithHash = function (hash) {
        var iframes = document.getElementsByTagName("iframe");
        var iframeArray = Array.apply(null, Array(iframes.length)).map(function (iframe, index) { return iframes.item(index); }); // eslint-disable-line prefer-spread
        return iframeArray.filter(function (iframe) {
            try {
                return iframe.contentWindow.location.hash === hash;
            }
            catch (e) {
                return false;
            }
        })[0];
    };
    /**
     * @hidden
     * Returns an array of all the popups opened by MSAL
     * @ignore
     */
    WindowUtils.getPopups = function () {
        if (!window.openedWindows) {
            window.openedWindows = [];
        }
        return window.openedWindows;
    };
    /**
     * @hidden
     * Find and return the popup with the given hash
     * @ignore
     */
    WindowUtils.getPopUpWithHash = function (hash) {
        return WindowUtils.getPopups().filter(function (popup) {
            try {
                return popup.location.hash === hash;
            }
            catch (e) {
                return false;
            }
        })[0];
    };
    /**
     * @hidden
     * Add the popup to the known list of popups
     * @ignore
     */
    WindowUtils.trackPopup = function (popup) {
        WindowUtils.getPopups().push(popup);
    };
    /**
     * @hidden
     * Close all popups
     * @ignore
     */
    WindowUtils.closePopups = function () {
        WindowUtils.getPopups().forEach(function (popup) { return popup.close(); });
    };
    /**
     * @ignore
     *
     * blocks any login/acquireToken calls to reload from within a hidden iframe (generated for silent calls)
     */
    WindowUtils.blockReloadInHiddenIframes = function () {
        // return an error if called from the hidden iframe created by the msal js silent calls
        if (UrlUtils_1.UrlUtils.urlContainsHash(window.location.hash) && WindowUtils.isInIframe()) {
            throw ClientAuthError_1.ClientAuthError.createBlockTokenRequestsInHiddenIframeError();
        }
    };
    /**
     *
     * @param cacheStorage
     */
    WindowUtils.checkIfBackButtonIsPressed = function (cacheStorage) {
        var redirectCache = cacheStorage.getItem(Constants_1.TemporaryCacheKeys.REDIRECT_REQUEST);
        // if redirect request is set and there is no hash
        if (redirectCache && !UrlUtils_1.UrlUtils.urlContainsHash(window.location.hash)) {
            var splitCache = redirectCache.split(Constants_1.Constants.resourceDelimiter);
            splitCache.shift();
            var state = splitCache.length > 0 ? splitCache.join(Constants_1.Constants.resourceDelimiter) : null;
            cacheStorage.resetTempCacheItems(state);
        }
    };
    /**
     * Removes url fragment from browser url
     */
    WindowUtils.clearUrlFragment = function (contentWindow) {
        contentWindow.location.hash = "";
        // Office.js sets history.replaceState to null
        if (typeof contentWindow.history.replaceState === "function") {
            // Full removes "#" from url
            contentWindow.history.replaceState(null, null, "" + contentWindow.location.pathname + contentWindow.location.search);
        }
    };
    /**
     * @hidden
     * Interval in milliseconds that we poll a window
     * @ignore
     */
    WindowUtils.POLLING_INTERVAL_MS = 50;
    return WindowUtils;
}());
exports.WindowUtils = WindowUtils;
//# sourceMappingURL=WindowUtils.js.map