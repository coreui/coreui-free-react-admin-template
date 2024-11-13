"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
const TimeoutError_1 = require("./TimeoutError");
class Deferred {
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this._reject = reject;
            this._resolve = resolve;
        });
    }
    registerTimeout(timeoutInMillis, callback) {
        if (this._timeout)
            return;
        this._timeout = setTimeout(() => {
            callback();
            this.reject(new TimeoutError_1.TimeoutError('Operation timeout'));
        }, timeoutInMillis);
    }
    _clearTimeout() {
        if (!this._timeout)
            return;
        clearTimeout(this._timeout);
    }
    resolve(value) {
        this._clearTimeout();
        this._resolve(value);
    }
    reject(error) {
        this._clearTimeout();
        this._reject(error);
    }
    promise() {
        return this._promise;
    }
}
exports.Deferred = Deferred;
//# sourceMappingURL=Deferred.js.map