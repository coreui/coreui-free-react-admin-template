import BaseError from '../../errors/base-error';
/**
 * Thrown when a connection to a database is closed while an operation is in progress
 */
export declare class AsyncQueueError extends BaseError {
    constructor(message: string);
}
declare class AsyncQueue {
    previous: Promise<unknown>;
    closed: boolean;
    rejectCurrent: (reason?: any) => void;
    constructor();
    close(): void;
    enqueue(asyncFunction: (...args: any[]) => Promise<unknown>): Promise<unknown>;
}
export default AsyncQueue;
