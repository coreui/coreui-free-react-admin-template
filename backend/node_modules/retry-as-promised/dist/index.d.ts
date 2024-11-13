export declare class TimeoutError extends Error {
    previous: Error | undefined;
    constructor(message: string, previousError?: Error);
}
export type MatchOption = string | RegExp | Error | Function;
export interface Options {
    max: number;
    timeout?: number | undefined;
    match?: MatchOption[] | MatchOption | undefined;
    backoffBase?: number | undefined;
    backoffExponent?: number | undefined;
    report?: ((message: string, obj: CoercedOptions, err?: any) => void) | undefined;
    name?: string | undefined;
}
type CoercedOptions = {
    $current: number;
    max: number;
    timeout?: number | undefined;
    match: MatchOption[];
    backoffBase: number;
    backoffExponent: number;
    report?: ((message: string, obj: CoercedOptions, err?: any) => void) | undefined;
    name?: string | undefined;
};
type MaybePromise<T> = PromiseLike<T> | T;
type RetryCallback<T> = ({ current }: {
    current: CoercedOptions['$current'];
}) => MaybePromise<T>;
export declare function retryAsPromised<T>(callback: RetryCallback<T>, optionsInput: Options | number | CoercedOptions): Promise<T>;
export default retryAsPromised;
