/// <reference types="node" />
import { Deferred } from './Deferred';
declare type LogLevel = 'verbose' | 'info' | 'error';
declare type FactoryLogger = (message: string, level: LogLevel) => void;
declare type PooledObject<T> = {
    resource: T;
    timeout: number;
    useCount: number;
};
declare type InUseObject<T> = {
    resource: T;
    useCount: number;
};
export interface FactoryOptions<T> {
    name?: string;
    create: () => Promise<T>;
    destroy: (resource: T) => void | Promise<void>;
    validate: (resource: T) => boolean;
    max: number;
    min: number;
    maxUses?: number;
    idleTimeoutMillis?: number;
    acquireTimeoutMillis?: number;
    reapIntervalMillis?: number;
    log?: FactoryLogger | boolean;
}
export declare class Pool<RawResource> {
    protected _factory: FactoryOptions<RawResource>;
    protected _count: number;
    protected _draining: boolean;
    protected idleTimeoutMillis: number;
    protected acquireTimeoutMillis: number;
    protected reapIntervalMillis: number;
    protected log: FactoryLogger | boolean;
    protected maxUsesPerResource: number;
    protected _pendingAcquires: Deferred<RawResource>[];
    protected _inUseObjects: InUseObject<RawResource>[];
    protected _availableObjects: PooledObject<RawResource>[];
    protected _removeIdleTimer: NodeJS.Timeout;
    protected _removeIdleScheduled: boolean;
    constructor(factory: FactoryOptions<RawResource>);
    get size(): number;
    get name(): string;
    get available(): number;
    get using(): number;
    get waiting(): number;
    get maxSize(): number;
    get minSize(): number;
    protected _log(message: string, level: LogLevel): void;
    protected _removeIdle(): void;
    protected _scheduleRemoveIdle(): void;
    protected _dispense(): void;
    protected _createResource(): void;
    protected _addResourceToAvailableObjects(resource: RawResource, useCount: number): void;
    protected _addResourceToInUseObjects(resource: RawResource, useCount: number): void;
    protected _ensureMinimum(): void;
    acquire(): Promise<RawResource>;
    release(resource: RawResource): void;
    destroy(resource: RawResource): Promise<void>;
    drain(): Promise<void>;
    destroyAllNow(): Promise<void>;
}
export {};
