/**
 * Utility type for a class which can be called in addion to being used as a constructor.
 */
interface Invokeable<Args extends Array<any>, Instance> {
    (...args: Args): Instance;
    new (...args: Args): Instance;
}
/**
 * Wraps a constructor to not need the `new` keyword using a proxy.
 * Only used for data types.
 *
 * @param {ProxyConstructor} Class The class instance to wrap as invocable.
 * @returns {Proxy} Wrapped class instance.
 * @private
 */
export declare function classToInvokable<Args extends Array<any>, Instance extends object>(Class: new (...args: Args) => Instance): Invokeable<Args, Instance>;
export {};
