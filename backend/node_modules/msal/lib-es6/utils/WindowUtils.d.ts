import { Logger } from "../Logger";
import { AuthCache } from "../cache/AuthCache";
export declare class WindowUtils {
    /**
     * @hidden
     * Interval in milliseconds that we poll a window
     * @ignore
     */
    private static POLLING_INTERVAL_MS;
    /**
     * @hidden
     * Checks if the current page is running in an iframe.
     * @ignore
     */
    static isInIframe(): boolean;
    /**
     * @hidden
     * Check if the current page is running in a popup.
     * @ignore
     */
    static isInPopup(): boolean;
    /**
     * @hidden
     * @param prefix
     * @param scopes
     * @param authority
     */
    static generateFrameName(prefix: string, requestSignature: string): string;
    /**
     * @hidden
     * Polls an iframe until it loads a url with a hash
     * @ignore
     */
    static monitorIframeForHash(contentWindow: Window, timeout: number, urlNavigate: string, logger: Logger): Promise<string>;
    /**
     * @hidden
     * Polls a popup until it loads a url with a hash
     * @ignore
     */
    static monitorPopupForHash(contentWindow: Window, timeout: number, urlNavigate: string, logger: Logger): Promise<string>;
    /**
     * @hidden
     * Loads iframe with authorization endpoint URL
     * @ignore
     */
    static loadFrame(urlNavigate: string, frameName: string, timeoutMs: number, logger: Logger): Promise<HTMLIFrameElement>;
    /**
     * @hidden
     * Loads the iframe synchronously when the navigateTimeFrame is set to `0`
     * @param urlNavigate
     * @param frameName
     * @param logger
     */
    static loadFrameSync(urlNavigate: string, frameName: string, logger: Logger): HTMLIFrameElement;
    /**
     * @hidden
     * Adds the hidden iframe for silent token renewal.
     * @ignore
     */
    static addHiddenIFrame(iframeId: string, logger: Logger): HTMLIFrameElement;
    /**
     * @hidden
     * Removes a hidden iframe from the page.
     * @ignore
     */
    static removeHiddenIframe(iframe: HTMLIFrameElement): void;
    /**
     * @hidden
     * Find and return the iframe element with the given hash
     * @ignore
     */
    static getIframeWithHash(hash: string): HTMLIFrameElement;
    /**
     * @hidden
     * Returns an array of all the popups opened by MSAL
     * @ignore
     */
    static getPopups(): Array<Window>;
    /**
     * @hidden
     * Find and return the popup with the given hash
     * @ignore
     */
    static getPopUpWithHash(hash: string): Window;
    /**
     * @hidden
     * Add the popup to the known list of popups
     * @ignore
     */
    static trackPopup(popup: Window): void;
    /**
     * @hidden
     * Close all popups
     * @ignore
     */
    static closePopups(): void;
    /**
     * @ignore
     *
     * blocks any login/acquireToken calls to reload from within a hidden iframe (generated for silent calls)
     */
    static blockReloadInHiddenIframes(): void;
    /**
     *
     * @param cacheStorage
     */
    static checkIfBackButtonIsPressed(cacheStorage: AuthCache): void;
    /**
     * Removes url fragment from browser url
     */
    static clearUrlFragment(contentWindow: Window): void;
}
