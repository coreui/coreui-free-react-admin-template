"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
const Deferred_1 = require("./Deferred");
const AggregateError_1 = require("./AggregateError");
class Pool {
    constructor(factory) {
        this.log = false;
        if (!factory.create) {
            throw new Error('create function is required');
        }
        if (!factory.destroy) {
            throw new Error('destroy function is required');
        }
        if (!factory.validate) {
            throw new Error('validate function is required');
        }
        if (typeof factory.min !== 'number' ||
            factory.min < 0 ||
            factory.min !== Math.round(factory.min)) {
            throw new Error('min must be an integer >= 0');
        }
        if (typeof factory.max !== 'number' ||
            factory.max <= 0 ||
            factory.max !== Math.round(factory.max)) {
            throw new Error('max must be an integer > 0');
        }
        if (factory.min > factory.max) {
            throw new Error('max is smaller than min');
        }
        if (factory.maxUses !== undefined &&
            (typeof factory.maxUses !== 'number' || factory.maxUses < 0)) {
            throw new Error('maxUses must be an integer >= 0');
        }
        this.idleTimeoutMillis = factory.idleTimeoutMillis || 30000;
        this.acquireTimeoutMillis = factory.acquireTimeoutMillis || 30000;
        this.reapIntervalMillis = factory.reapIntervalMillis || 1000;
        this.maxUsesPerResource = factory.maxUses || Infinity;
        this.log = factory.log || false;
        this._factory = factory;
        this._count = 0;
        this._draining = false;
        this._pendingAcquires = [];
        this._inUseObjects = [];
        this._availableObjects = [];
        this._removeIdleScheduled = false;
    }
    get size() {
        return this._count;
    }
    get name() {
        return this._factory.name;
    }
    get available() {
        return this._availableObjects.length;
    }
    get using() {
        return this._inUseObjects.length;
    }
    get waiting() {
        return this._pendingAcquires.length;
    }
    get maxSize() {
        return this._factory.max;
    }
    get minSize() {
        return this._factory.min;
    }
    _log(message, level) {
        if (typeof this.log === 'function') {
            this.log(message, level);
        }
        else if (this.log) {
            console.log(`${level.toUpperCase()} pool ${this.name || ''} - ${message}`);
        }
    }
    _removeIdle() {
        const toRemove = [];
        const now = Date.now();
        let i;
        let available = this._availableObjects.length;
        const maxRemovable = this.size - this.minSize;
        let timeout;
        this._removeIdleScheduled = false;
        for (i = 0; i < available && maxRemovable > toRemove.length; i++) {
            timeout = this._availableObjects[i].timeout;
            if (now >= timeout) {
                this._log('removeIdle() destroying obj - now:' + now + ' timeout:' + timeout, 'verbose');
                toRemove.push(this._availableObjects[i].resource);
            }
        }
        toRemove.forEach(this.destroy, this);
        available = this._availableObjects.length;
        if (available > 0) {
            this._log('this._availableObjects.length=' + available, 'verbose');
            this._scheduleRemoveIdle();
        }
        else {
            this._log('removeIdle() all objects removed', 'verbose');
        }
    }
    _scheduleRemoveIdle() {
        if (!this._removeIdleScheduled) {
            this._removeIdleScheduled = true;
            this._removeIdleTimer = setTimeout(() => {
                this._removeIdle();
            }, this.reapIntervalMillis);
        }
    }
    _dispense() {
        let wrappedResource = null;
        const waitingCount = this._pendingAcquires.length;
        this._log(`dispense() clients=${waitingCount} available=${this._availableObjects.length}`, 'info');
        if (waitingCount < 1) {
            return;
        }
        while (this._availableObjects.length > 0) {
            this._log('dispense() - reusing obj', 'verbose');
            wrappedResource = this._availableObjects[this._availableObjects.length - 1];
            if (!this._factory.validate(wrappedResource.resource)) {
                this.destroy(wrappedResource.resource);
                continue;
            }
            this._availableObjects.pop();
            this._addResourceToInUseObjects(wrappedResource.resource, wrappedResource.useCount);
            const deferred = this._pendingAcquires.shift();
            return deferred.resolve(wrappedResource.resource);
        }
        if (this.size < this.maxSize) {
            this._createResource();
        }
    }
    _createResource() {
        this._count += 1;
        this._log(`createResource() - creating obj - count=${this.size} min=${this.minSize} max=${this.maxSize}`, 'verbose');
        this._factory
            .create()
            .then((resource) => {
            const deferred = this._pendingAcquires.shift();
            if (deferred) {
                this._addResourceToInUseObjects(resource, 0);
                deferred.resolve(resource);
            }
            else {
                this._addResourceToAvailableObjects(resource, 0);
            }
        })
            .catch((error) => {
            const deferred = this._pendingAcquires.shift();
            this._count -= 1;
            if (this._count < 0)
                this._count = 0;
            if (deferred) {
                deferred.reject(error);
            }
            process.nextTick(() => {
                this._dispense();
            });
        });
    }
    _addResourceToAvailableObjects(resource, useCount) {
        const wrappedResource = {
            resource: resource,
            useCount: useCount,
            timeout: Date.now() + this.idleTimeoutMillis,
        };
        this._availableObjects.push(wrappedResource);
        this._dispense();
        this._scheduleRemoveIdle();
    }
    _addResourceToInUseObjects(resource, useCount) {
        const wrappedResource = {
            resource: resource,
            useCount: useCount,
        };
        this._inUseObjects.push(wrappedResource);
    }
    _ensureMinimum() {
        let i, diff;
        if (!this._draining && this.size < this.minSize) {
            diff = this.minSize - this.size;
            for (i = 0; i < diff; i++) {
                this._createResource();
            }
        }
    }
    acquire() {
        if (this._draining) {
            return Promise.reject(new Error('pool is draining and cannot accept work'));
        }
        const deferred = new Deferred_1.Deferred();
        deferred.registerTimeout(this.acquireTimeoutMillis, () => {
            this._pendingAcquires = this._pendingAcquires.filter((pending) => pending !== deferred);
        });
        this._pendingAcquires.push(deferred);
        this._dispense();
        return deferred.promise();
    }
    release(resource) {
        if (this._availableObjects.some((resourceWithTimeout) => resourceWithTimeout.resource === resource)) {
            this._log('release called twice for the same resource: ' + new Error().stack, 'error');
            return;
        }
        const index = this._inUseObjects.findIndex((wrappedResource) => wrappedResource.resource === resource);
        if (index < 0) {
            this._log('attempt to release an invalid resource: ' + new Error().stack, 'error');
            return;
        }
        const wrappedResource = this._inUseObjects[index];
        wrappedResource.useCount += 1;
        if (wrappedResource.useCount >= this.maxUsesPerResource) {
            this._log('release() destroying obj - useCount:' +
                wrappedResource.useCount +
                ' maxUsesPerResource:' +
                this.maxUsesPerResource, 'verbose');
            this.destroy(wrappedResource.resource);
            this._dispense();
        }
        else {
            this._inUseObjects.splice(index, 1);
            this._addResourceToAvailableObjects(wrappedResource.resource, wrappedResource.useCount);
        }
    }
    async destroy(resource) {
        const available = this._availableObjects.length;
        const using = this._inUseObjects.length;
        this._availableObjects = this._availableObjects.filter((object) => object.resource !== resource);
        this._inUseObjects = this._inUseObjects.filter((object) => object.resource !== resource);
        if (available === this._availableObjects.length &&
            using === this._inUseObjects.length) {
            this._ensureMinimum();
            return;
        }
        this._count -= 1;
        if (this._count < 0)
            this._count = 0;
        try {
            await this._factory.destroy(resource);
        }
        finally {
            this._ensureMinimum();
            if (!this._draining) {
                process.nextTick(() => {
                    this._dispense();
                });
            }
        }
    }
    drain() {
        this._log('draining', 'info');
        this._draining = true;
        const check = (callback) => {
            if (this._pendingAcquires.length > 0) {
                this._dispense();
                setTimeout(() => {
                    check(callback);
                }, 100);
                return;
            }
            if (this._availableObjects.length !== this._count) {
                setTimeout(() => {
                    check(callback);
                }, 100);
                return;
            }
            callback();
        };
        return new Promise((resolve) => check(resolve));
    }
    async destroyAllNow() {
        this._log('force destroying all objects', 'info');
        this._removeIdleScheduled = false;
        clearTimeout(this._removeIdleTimer);
        const resources = this._availableObjects.map((resource) => resource.resource);
        const errors = [];
        for (const resource of resources) {
            try {
                await this.destroy(resource);
            }
            catch (ex) {
                this._log('Error destroying resource: ' + ex.stack, 'error');
                errors.push(ex);
            }
        }
        if (errors.length > 0) {
            throw new AggregateError_1.AggregateError(errors);
        }
    }
}
exports.Pool = Pool;
//# sourceMappingURL=Pool.js.map