'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var msalCommon = require('@azure/msal-common');
var axios = _interopDefault(require('axios'));
var uuid = require('uuid');
var crypto = _interopDefault(require('crypto'));
var jsonwebtoken = require('jsonwebtoken');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

/**
 * http methods
 */
var HttpMethod;

(function (HttpMethod) {
  HttpMethod["GET"] = "get";
  HttpMethod["POST"] = "post";
})(HttpMethod || (HttpMethod = {}));
/**
 * Constant used for PKCE
 */


var RANDOM_OCTET_SIZE = 32;
/**
 * Constants used in PKCE
 */

var Hash = {
  SHA256: "sha256"
};
/**
 * Constants for encoding schemes
 */

var CharSet = {
  CV_CHARSET: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~"
};
/**
 * Constants
 */

var Constants = {
  MSAL_SKU: "msal.js.node",
  JWT_BEARER_ASSERTION_TYPE: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
};
/**
 * API Codes for Telemetry purposes.
 * Before adding a new code you must claim it in the MSAL Telemetry tracker as these number spaces are shared across all MSALs
 * 0-99 Silent Flow
 * 600-699 Device Code Flow
 * 800-899 Auth Code Flow
 */

var ApiId;

(function (ApiId) {
  ApiId[ApiId["acquireTokenSilent"] = 62] = "acquireTokenSilent";
  ApiId[ApiId["acquireTokenByUsernamePassword"] = 371] = "acquireTokenByUsernamePassword";
  ApiId[ApiId["acquireTokenByDeviceCode"] = 671] = "acquireTokenByDeviceCode";
  ApiId[ApiId["acquireTokenByClientCredential"] = 771] = "acquireTokenByClientCredential";
  ApiId[ApiId["acquireTokenByCode"] = 871] = "acquireTokenByCode";
  ApiId[ApiId["acquireTokenByRefreshToken"] = 872] = "acquireTokenByRefreshToken";
})(ApiId || (ApiId = {}));
/**
 * JWT  constants
 */


var JwtConstants = {
  ALGORITHM: "alg",
  RSA_256: "RS256",
  X5T: "x5t",
  X5C: "x5c",
  AUDIENCE: "aud",
  EXPIRATION_TIME: "exp",
  ISSUER: "iss",
  SUBJECT: "sub",
  NOT_BEFORE: "nbf",
  JWT_ID: "jti"
};

/**
 * This class implements the API for network requests.
 */

var HttpClient = /*#__PURE__*/function () {
  function HttpClient() {}

  var _proto = HttpClient.prototype;

  /**
   * Http Get request
   * @param url
   * @param options
   */
  _proto.sendGetRequestAsync =
  /*#__PURE__*/
  function () {
    var _sendGetRequestAsync = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(url, options) {
      var request, response;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = {
                method: HttpMethod.GET,
                url: url,
                headers: options && options.headers,
                validateStatus: function validateStatus() {
                  return true;
                }
              };
              _context.next = 3;
              return axios(request);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", {
                headers: response.headers,
                body: response.data,
                status: response.status
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function sendGetRequestAsync(_x, _x2) {
      return _sendGetRequestAsync.apply(this, arguments);
    }

    return sendGetRequestAsync;
  }()
  /**
   * Http Post request
   * @param url
   * @param options
   */
  ;

  _proto.sendPostRequestAsync =
  /*#__PURE__*/
  function () {
    var _sendPostRequestAsync = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(url, options) {
      var request, response;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = {
                method: HttpMethod.POST,
                url: url,
                data: options && options.body || "",
                headers: options && options.headers,
                validateStatus: function validateStatus() {
                  return true;
                }
              };
              _context2.next = 3;
              return axios(request);

            case 3:
              response = _context2.sent;
              return _context2.abrupt("return", {
                headers: response.headers,
                body: response.data,
                status: response.status
              });

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function sendPostRequestAsync(_x3, _x4) {
      return _sendPostRequestAsync.apply(this, arguments);
    }

    return sendPostRequestAsync;
  }();

  return HttpClient;
}();

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var NetworkUtils = /*#__PURE__*/function () {
  function NetworkUtils() {}

  /**
   * Returns best compatible network client object.
   */
  NetworkUtils.getNetworkClient = function getNetworkClient() {
    return new HttpClient();
  };

  return NetworkUtils;
}();

var DEFAULT_AUTH_OPTIONS = {
  clientId: "",
  authority: msalCommon.Constants.DEFAULT_AUTHORITY,
  clientSecret: "",
  clientAssertion: "",
  clientCertificate: {
    thumbprint: "",
    privateKey: "",
    x5c: ""
  },
  knownAuthorities: [],
  cloudDiscoveryMetadata: "",
  authorityMetadata: "",
  clientCapabilities: [],
  protocolMode: msalCommon.ProtocolMode.AAD
};
var DEFAULT_CACHE_OPTIONS = {};
var DEFAULT_LOGGER_OPTIONS = {
  loggerCallback: function loggerCallback() {// allow users to not set logger call back
  },
  piiLoggingEnabled: false,
  logLevel: msalCommon.LogLevel.Info
};
var DEFAULT_SYSTEM_OPTIONS = {
  loggerOptions: DEFAULT_LOGGER_OPTIONS,
  networkClient: /*#__PURE__*/NetworkUtils.getNetworkClient()
};
/**
 * Sets the default options when not explicitly configured from app developer
 *
 * @param auth - Authentication options
 * @param cache - Cache options
 * @param system - System options
 *
 * @returns Configuration
 * @public
 */

function buildAppConfiguration(_ref) {
  var auth = _ref.auth,
      cache = _ref.cache,
      system = _ref.system;
  return {
    auth: _extends({}, DEFAULT_AUTH_OPTIONS, auth),
    cache: _extends({}, DEFAULT_CACHE_OPTIONS, cache),
    system: _extends({}, DEFAULT_SYSTEM_OPTIONS, system)
  };
}

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var GuidGenerator = /*#__PURE__*/function () {
  function GuidGenerator() {}

  /**
   *
   * RFC4122: The version 4 UUID is meant for generating UUIDs from truly-random or pseudo-random numbers.
   * uuidv4 generates guids from cryprtographically-string random
   */
  GuidGenerator.generateGuid = function generateGuid() {
    return uuid.v4();
  }
  /**
   * verifies if a string is  GUID
   * @param guid
   */
  ;

  GuidGenerator.isGuid = function isGuid(guid) {
    var regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexGuid.test(guid);
  };

  return GuidGenerator;
}();

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var EncodingUtils = /*#__PURE__*/function () {
  function EncodingUtils() {}

  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param str text
   */
  EncodingUtils.base64Encode = function base64Encode(str, encoding) {
    return Buffer.from(str, encoding).toString("base64");
  }
  /**
   * encode a URL
   * @param str
   */
  ;

  EncodingUtils.base64EncodeUrl = function base64EncodeUrl(str, encoding) {
    return EncodingUtils.base64Encode(str, encoding).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  /**
   * 'utf8': Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
   * 'base64': Base64 encoding.
   *
   * @param base64Str Base64 encoded text
   */
  ;

  EncodingUtils.base64Decode = function base64Decode(base64Str) {
    return Buffer.from(base64Str, "base64").toString("utf8");
  }
  /**
   * @param base64Str Base64 encoded Url
   */
  ;

  EncodingUtils.base64DecodeUrl = function base64DecodeUrl(base64Str) {
    var str = base64Str.replace(/-/g, "+").replace(/_/g, "/");

    while (str.length % 4) {
      str += "=";
    }

    return EncodingUtils.base64Decode(str);
  };

  return EncodingUtils;
}();

/**
 * https://tools.ietf.org/html/rfc7636#page-8
 */

var PkceGenerator = /*#__PURE__*/function () {
  function PkceGenerator() {}

  var _proto = PkceGenerator.prototype;

  /**
   * generates the codeVerfier and the challenge from the codeVerfier
   * reference: https://tools.ietf.org/html/rfc7636#section-4.1 and https://tools.ietf.org/html/rfc7636#section-4.2
   */
  _proto.generatePkceCodes =
  /*#__PURE__*/
  function () {
    var _generatePkceCodes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var verifier, challenge;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              verifier = this.generateCodeVerifier();
              challenge = this.generateCodeChallengeFromVerifier(verifier);
              return _context.abrupt("return", {
                verifier: verifier,
                challenge: challenge
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function generatePkceCodes() {
      return _generatePkceCodes.apply(this, arguments);
    }

    return generatePkceCodes;
  }()
  /**
   * generates the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.1
   */
  ;

  _proto.generateCodeVerifier = function generateCodeVerifier() {
    var buffer = crypto.randomBytes(RANDOM_OCTET_SIZE);
    var verifier = this.bufferToCVString(buffer);
    return EncodingUtils.base64EncodeUrl(verifier);
  }
  /**
   * generate the challenge from the codeVerfier; reference: https://tools.ietf.org/html/rfc7636#section-4.2
   * @param codeVerifier
   */
  ;

  _proto.generateCodeChallengeFromVerifier = function generateCodeChallengeFromVerifier(codeVerifier) {
    return EncodingUtils.base64EncodeUrl(this.sha256(codeVerifier).toString("base64"), "base64");
  }
  /**
   * generate 'SHA256' hash
   * @param buffer
   */
  ;

  _proto.sha256 = function sha256(buffer) {
    return crypto.createHash(Hash.SHA256).update(buffer).digest();
  }
  /**
   * Accepted characters; reference: https://tools.ietf.org/html/rfc7636#section-4.1
   * @param buffer
   */
  ;

  _proto.bufferToCVString = function bufferToCVString(buffer) {
    var charArr = [];

    for (var i = 0; i < buffer.byteLength; i += 1) {
      var index = buffer[i] % CharSet.CV_CHARSET.length;
      charArr.push(CharSet.CV_CHARSET[index]);
    }

    return charArr.join("");
  };

  return PkceGenerator;
}();

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class implements MSAL node's crypto interface, which allows it to perform base64 encoding and decoding, generating cryptographically random GUIDs and
 * implementing Proof Key for Code Exchange specs for the OAuth Authorization Code Flow using PKCE (rfc here: https://tools.ietf.org/html/rfc7636).
 * @public
 */

var CryptoProvider = /*#__PURE__*/function () {
  function CryptoProvider() {
    // Browser crypto needs to be validated first before any other classes can be set.
    this.pkceGenerator = new PkceGenerator();
  }
  /**
   * Creates a new random GUID - used to populate state and nonce.
   * @returns string (GUID)
   */


  var _proto = CryptoProvider.prototype;

  _proto.createNewGuid = function createNewGuid() {
    return GuidGenerator.generateGuid();
  }
  /**
   * Encodes input string to base64.
   * @param input - string to be encoded
   */
  ;

  _proto.base64Encode = function base64Encode(input) {
    return EncodingUtils.base64Encode(input);
  }
  /**
   * Decodes input string from base64.
   * @param input - string to be decoded
   */
  ;

  _proto.base64Decode = function base64Decode(input) {
    return EncodingUtils.base64Decode(input);
  }
  /**
   * Generates PKCE codes used in Authorization Code Flow.
   */
  ;

  _proto.generatePkceCodes = function generatePkceCodes() {
    return this.pkceGenerator.generatePkceCodes();
  }
  /**
   * Generates a keypair, stores it and returns a thumbprint - not yet implemented for node
   */
  ;

  _proto.getPublicKeyThumbprint = function getPublicKeyThumbprint() {
    throw new Error("Method not implemented.");
  }
  /**
   * Signs the given object as a jwt payload with private key retrieved by given kid - currently not implemented for node
   */
  ;

  _proto.signJwt = function signJwt() {
    throw new Error("Method not implemented.");
  };

  return CryptoProvider;
}();

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * This class deserializes cache entities read from the file into in memory object types defined internally
 */

var Deserializer = /*#__PURE__*/function () {
  function Deserializer() {}

  /**
   * Parse the JSON blob in memory and deserialize the content
   * @param cachedJson
   */
  Deserializer.deserializeJSONBlob = function deserializeJSONBlob(jsonFile) {
    var deserializedCache = msalCommon.StringUtils.isEmpty(jsonFile) ? {} : JSON.parse(jsonFile);
    return deserializedCache;
  }
  /**
   * Deserializes accounts to AccountEntity objects
   * @param accounts
   */
  ;

  Deserializer.deserializeAccounts = function deserializeAccounts(accounts) {
    var accountObjects = {};

    if (accounts) {
      Object.keys(accounts).map(function (key) {
        var serializedAcc = accounts[key];
        var mappedAcc = {
          homeAccountId: serializedAcc.home_account_id,
          environment: serializedAcc.environment,
          realm: serializedAcc.realm,
          localAccountId: serializedAcc.local_account_id,
          username: serializedAcc.username,
          authorityType: serializedAcc.authority_type,
          name: serializedAcc.name,
          clientInfo: serializedAcc.client_info,
          lastModificationTime: serializedAcc.last_modification_time,
          lastModificationApp: serializedAcc.last_modification_app
        };
        var account = new msalCommon.AccountEntity();
        msalCommon.CacheManager.toObject(account, mappedAcc);
        accountObjects[key] = account;
      });
    }

    return accountObjects;
  }
  /**
   * Deserializes id tokens to IdTokenEntity objects
   * @param idTokens
   */
  ;

  Deserializer.deserializeIdTokens = function deserializeIdTokens(idTokens) {
    var idObjects = {};

    if (idTokens) {
      Object.keys(idTokens).map(function (key) {
        var serializedIdT = idTokens[key];
        var mappedIdT = {
          homeAccountId: serializedIdT.home_account_id,
          environment: serializedIdT.environment,
          credentialType: serializedIdT.credential_type,
          clientId: serializedIdT.client_id,
          secret: serializedIdT.secret,
          realm: serializedIdT.realm
        };
        var idToken = new msalCommon.IdTokenEntity();
        msalCommon.CacheManager.toObject(idToken, mappedIdT);
        idObjects[key] = idToken;
      });
    }

    return idObjects;
  }
  /**
   * Deserializes access tokens to AccessTokenEntity objects
   * @param accessTokens
   */
  ;

  Deserializer.deserializeAccessTokens = function deserializeAccessTokens(accessTokens) {
    var atObjects = {};

    if (accessTokens) {
      Object.keys(accessTokens).map(function (key) {
        var serializedAT = accessTokens[key];
        var mappedAT = {
          homeAccountId: serializedAT.home_account_id,
          environment: serializedAT.environment,
          credentialType: serializedAT.credential_type,
          clientId: serializedAT.client_id,
          secret: serializedAT.secret,
          realm: serializedAT.realm,
          target: serializedAT.target,
          cachedAt: serializedAT.cached_at,
          expiresOn: serializedAT.expires_on,
          extendedExpiresOn: serializedAT.extended_expires_on,
          refreshOn: serializedAT.refresh_on,
          keyId: serializedAT.key_id,
          tokenType: serializedAT.token_type
        };
        var accessToken = new msalCommon.AccessTokenEntity();
        msalCommon.CacheManager.toObject(accessToken, mappedAT);
        atObjects[key] = accessToken;
      });
    }

    return atObjects;
  }
  /**
   * Deserializes refresh tokens to RefreshTokenEntity objects
   * @param refreshTokens
   */
  ;

  Deserializer.deserializeRefreshTokens = function deserializeRefreshTokens(refreshTokens) {
    var rtObjects = {};

    if (refreshTokens) {
      Object.keys(refreshTokens).map(function (key) {
        var serializedRT = refreshTokens[key];
        var mappedRT = {
          homeAccountId: serializedRT.home_account_id,
          environment: serializedRT.environment,
          credentialType: serializedRT.credential_type,
          clientId: serializedRT.client_id,
          secret: serializedRT.secret,
          familyId: serializedRT.family_id,
          target: serializedRT.target,
          realm: serializedRT.realm
        };
        var refreshToken = new msalCommon.RefreshTokenEntity();
        msalCommon.CacheManager.toObject(refreshToken, mappedRT);
        rtObjects[key] = refreshToken;
      });
    }

    return rtObjects;
  }
  /**
   * Deserializes appMetadata to AppMetaData objects
   * @param appMetadata
   */
  ;

  Deserializer.deserializeAppMetadata = function deserializeAppMetadata(appMetadata) {
    var appMetadataObjects = {};

    if (appMetadata) {
      Object.keys(appMetadata).map(function (key) {
        var serializedAmdt = appMetadata[key];
        var mappedAmd = {
          clientId: serializedAmdt.client_id,
          environment: serializedAmdt.environment,
          familyId: serializedAmdt.family_id
        };
        var amd = new msalCommon.AppMetadataEntity();
        msalCommon.CacheManager.toObject(amd, mappedAmd);
        appMetadataObjects[key] = amd;
      });
    }

    return appMetadataObjects;
  }
  /**
   * Deserialize an inMemory Cache
   * @param jsonCache
   */
  ;

  Deserializer.deserializeAllCache = function deserializeAllCache(jsonCache) {
    return {
      accounts: jsonCache.Account ? this.deserializeAccounts(jsonCache.Account) : {},
      idTokens: jsonCache.IdToken ? this.deserializeIdTokens(jsonCache.IdToken) : {},
      accessTokens: jsonCache.AccessToken ? this.deserializeAccessTokens(jsonCache.AccessToken) : {},
      refreshTokens: jsonCache.RefreshToken ? this.deserializeRefreshTokens(jsonCache.RefreshToken) : {},
      appMetadata: jsonCache.AppMetadata ? this.deserializeAppMetadata(jsonCache.AppMetadata) : {}
    };
  };

  return Deserializer;
}();

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var Serializer = /*#__PURE__*/function () {
  function Serializer() {}

  /**
   * serialize the JSON blob
   * @param data
   */
  Serializer.serializeJSONBlob = function serializeJSONBlob(data) {
    return JSON.stringify(data);
  }
  /**
   * Serialize Accounts
   * @param accCache
   */
  ;

  Serializer.serializeAccounts = function serializeAccounts(accCache) {
    var accounts = {};
    Object.keys(accCache).map(function (key) {
      var accountEntity = accCache[key];
      accounts[key] = {
        home_account_id: accountEntity.homeAccountId,
        environment: accountEntity.environment,
        realm: accountEntity.realm,
        local_account_id: accountEntity.localAccountId,
        username: accountEntity.username,
        authority_type: accountEntity.authorityType,
        name: accountEntity.name,
        client_info: accountEntity.clientInfo,
        last_modification_time: accountEntity.lastModificationTime,
        last_modification_app: accountEntity.lastModificationApp
      };
    });
    return accounts;
  }
  /**
   * Serialize IdTokens
   * @param idTCache
   */
  ;

  Serializer.serializeIdTokens = function serializeIdTokens(idTCache) {
    var idTokens = {};
    Object.keys(idTCache).map(function (key) {
      var idTEntity = idTCache[key];
      idTokens[key] = {
        home_account_id: idTEntity.homeAccountId,
        environment: idTEntity.environment,
        credential_type: idTEntity.credentialType,
        client_id: idTEntity.clientId,
        secret: idTEntity.secret,
        realm: idTEntity.realm
      };
    });
    return idTokens;
  }
  /**
   * Serializes AccessTokens
   * @param atCache
   */
  ;

  Serializer.serializeAccessTokens = function serializeAccessTokens(atCache) {
    var accessTokens = {};
    Object.keys(atCache).map(function (key) {
      var atEntity = atCache[key];
      accessTokens[key] = {
        home_account_id: atEntity.homeAccountId,
        environment: atEntity.environment,
        credential_type: atEntity.credentialType,
        client_id: atEntity.clientId,
        secret: atEntity.secret,
        realm: atEntity.realm,
        target: atEntity.target,
        cached_at: atEntity.cachedAt,
        expires_on: atEntity.expiresOn,
        extended_expires_on: atEntity.extendedExpiresOn,
        refresh_on: atEntity.refreshOn,
        key_id: atEntity.keyId,
        token_type: atEntity.tokenType
      };
    });
    return accessTokens;
  }
  /**
   * Serialize refreshTokens
   * @param rtCache
   */
  ;

  Serializer.serializeRefreshTokens = function serializeRefreshTokens(rtCache) {
    var refreshTokens = {};
    Object.keys(rtCache).map(function (key) {
      var rtEntity = rtCache[key];
      refreshTokens[key] = {
        home_account_id: rtEntity.homeAccountId,
        environment: rtEntity.environment,
        credential_type: rtEntity.credentialType,
        client_id: rtEntity.clientId,
        secret: rtEntity.secret,
        family_id: rtEntity.familyId,
        target: rtEntity.target,
        realm: rtEntity.realm
      };
    });
    return refreshTokens;
  }
  /**
   * Serialize amdtCache
   * @param amdtCache
   */
  ;

  Serializer.serializeAppMetadata = function serializeAppMetadata(amdtCache) {
    var appMetadata = {};
    Object.keys(amdtCache).map(function (key) {
      var amdtEntity = amdtCache[key];
      appMetadata[key] = {
        client_id: amdtEntity.clientId,
        environment: amdtEntity.environment,
        family_id: amdtEntity.familyId
      };
    });
    return appMetadata;
  }
  /**
   * Serialize the cache
   * @param jsonContent
   */
  ;

  Serializer.serializeAllCache = function serializeAllCache(inMemCache) {
    return {
      Account: this.serializeAccounts(inMemCache.accounts),
      IdToken: this.serializeIdTokens(inMemCache.idTokens),
      AccessToken: this.serializeAccessTokens(inMemCache.accessTokens),
      RefreshToken: this.serializeRefreshTokens(inMemCache.refreshTokens),
      AppMetadata: this.serializeAppMetadata(inMemCache.appMetadata)
    };
  };

  return Serializer;
}();

/**
 * This class implements Storage for node, reading cache from user specified storage location or an  extension library
 * @public
 */

var NodeStorage = /*#__PURE__*/function (_CacheManager) {
  _inheritsLoose(NodeStorage, _CacheManager);

  function NodeStorage(logger, clientId, cryptoImpl) {
    var _this;

    _this = _CacheManager.call(this, clientId, cryptoImpl) || this;
    _this.cache = {};
    _this.changeEmitters = [];
    _this.logger = logger;
    return _this;
  }
  /**
   * Queue up callbacks
   * @param func - a callback function for cache change indication
   */


  var _proto = NodeStorage.prototype;

  _proto.registerChangeEmitter = function registerChangeEmitter(func) {
    this.changeEmitters.push(func);
  }
  /**
   * Invoke the callback when cache changes
   */
  ;

  _proto.emitChange = function emitChange() {
    this.changeEmitters.forEach(function (func) {
      return func.call(null);
    });
  }
  /**
   * Converts cacheKVStore to InMemoryCache
   * @param cache - key value store
   */
  ;

  _proto.cacheToInMemoryCache = function cacheToInMemoryCache(cache) {
    var inMemoryCache = {
      accounts: {},
      idTokens: {},
      accessTokens: {},
      refreshTokens: {},
      appMetadata: {}
    };

    for (var key in cache) {
      if (cache[key] instanceof msalCommon.AccountEntity) {
        inMemoryCache.accounts[key] = cache[key];
      } else if (cache[key] instanceof msalCommon.IdTokenEntity) {
        inMemoryCache.idTokens[key] = cache[key];
      } else if (cache[key] instanceof msalCommon.AccessTokenEntity) {
        inMemoryCache.accessTokens[key] = cache[key];
      } else if (cache[key] instanceof msalCommon.RefreshTokenEntity) {
        inMemoryCache.refreshTokens[key] = cache[key];
      } else if (cache[key] instanceof msalCommon.AppMetadataEntity) {
        inMemoryCache.appMetadata[key] = cache[key];
      } else {
        continue;
      }
    }

    return inMemoryCache;
  }
  /**
   * converts inMemoryCache to CacheKVStore
   * @param inMemoryCache - kvstore map for inmemory
   */
  ;

  _proto.inMemoryCacheToCache = function inMemoryCacheToCache(inMemoryCache) {
    // convert in memory cache to a flat Key-Value map
    var cache = this.getCache();
    cache = _extends({}, inMemoryCache.accounts, inMemoryCache.idTokens, inMemoryCache.accessTokens, inMemoryCache.refreshTokens, inMemoryCache.appMetadata);
    return cache;
  }
  /**
   * gets the current in memory cache for the client
   */
  ;

  _proto.getInMemoryCache = function getInMemoryCache() {
    this.logger.verbose("Getting in-memory cache"); // convert the cache key value store to inMemoryCache

    var inMemoryCache = this.cacheToInMemoryCache(this.getCache());
    return inMemoryCache;
  }
  /**
   * sets the current in memory cache for the client
   * @param inMemoryCache - key value map in memory
   */
  ;

  _proto.setInMemoryCache = function setInMemoryCache(inMemoryCache) {
    this.logger.verbose("Setting in-memory cache"); // convert and append the inMemoryCache to cacheKVStore

    var cache = this.inMemoryCacheToCache(inMemoryCache);
    this.setCache(cache);
    this.emitChange();
  }
  /**
   * get the current cache key-value store
   */
  ;

  _proto.getCache = function getCache() {
    this.logger.verbose("Getting cache key-value store");
    return this.cache;
  }
  /**
   * sets the current cache (key value store)
   * @param cacheMap - key value map
   */
  ;

  _proto.setCache = function setCache(cache) {
    this.logger.verbose("Setting cache key value store");
    this.cache = cache; // mark change in cache

    this.emitChange();
  }
  /**
   * Gets cache item with given key.
   * @param key - lookup key for the cache entry
   */
  ;

  _proto.getItem = function getItem(key) {
    this.logger.verbosePii("Item key: " + key); // read cache

    var cache = this.getCache();
    return cache[key];
  }
  /**
   * Gets cache item with given key-value
   * @param key - lookup key for the cache entry
   * @param value - value of the cache entry
   */
  ;

  _proto.setItem = function setItem(key, value) {
    this.logger.verbosePii("Item key: " + key); // read cache

    var cache = this.getCache();
    cache[key] = value; // write to cache

    this.setCache(cache);
  }
  /**
   * fetch the account entity
   * @param accountKey - lookup key to fetch cache type AccountEntity
   */
  ;

  _proto.getAccount = function getAccount(accountKey) {
    var account = this.getItem(accountKey);

    if (msalCommon.AccountEntity.isAccountEntity(account)) {
      return account;
    }

    return null;
  }
  /**
   * set account entity
   * @param account - cache value to be set of type AccountEntity
   */
  ;

  _proto.setAccount = function setAccount(account) {
    var accountKey = account.generateAccountKey();
    this.setItem(accountKey, account);
  }
  /**
   * fetch the idToken credential
   * @param idTokenKey - lookup key to fetch cache type IdTokenEntity
   */
  ;

  _proto.getIdTokenCredential = function getIdTokenCredential(idTokenKey) {
    var idToken = this.getItem(idTokenKey);

    if (msalCommon.IdTokenEntity.isIdTokenEntity(idToken)) {
      return idToken;
    }

    return null;
  }
  /**
   * set idToken credential
   * @param idToken - cache value to be set of type IdTokenEntity
   */
  ;

  _proto.setIdTokenCredential = function setIdTokenCredential(idToken) {
    var idTokenKey = idToken.generateCredentialKey();
    this.setItem(idTokenKey, idToken);
  }
  /**
   * fetch the accessToken credential
   * @param accessTokenKey - lookup key to fetch cache type AccessTokenEntity
   */
  ;

  _proto.getAccessTokenCredential = function getAccessTokenCredential(accessTokenKey) {
    var accessToken = this.getItem(accessTokenKey);

    if (msalCommon.AccessTokenEntity.isAccessTokenEntity(accessToken)) {
      return accessToken;
    }

    return null;
  }
  /**
   * set accessToken credential
   * @param accessToken -  cache value to be set of type AccessTokenEntity
   */
  ;

  _proto.setAccessTokenCredential = function setAccessTokenCredential(accessToken) {
    var accessTokenKey = accessToken.generateCredentialKey();
    this.setItem(accessTokenKey, accessToken);
  }
  /**
   * fetch the refreshToken credential
   * @param refreshTokenKey - lookup key to fetch cache type RefreshTokenEntity
   */
  ;

  _proto.getRefreshTokenCredential = function getRefreshTokenCredential(refreshTokenKey) {
    var refreshToken = this.getItem(refreshTokenKey);

    if (msalCommon.RefreshTokenEntity.isRefreshTokenEntity(refreshToken)) {
      return refreshToken;
    }

    return null;
  }
  /**
   * set refreshToken credential
   * @param refreshToken - cache value to be set of type RefreshTokenEntity
   */
  ;

  _proto.setRefreshTokenCredential = function setRefreshTokenCredential(refreshToken) {
    var refreshTokenKey = refreshToken.generateCredentialKey();
    this.setItem(refreshTokenKey, refreshToken);
  }
  /**
   * fetch appMetadata entity from the platform cache
   * @param appMetadataKey - lookup key to fetch cache type AppMetadataEntity
   */
  ;

  _proto.getAppMetadata = function getAppMetadata(appMetadataKey) {
    var appMetadata = this.getItem(appMetadataKey);

    if (msalCommon.AppMetadataEntity.isAppMetadataEntity(appMetadataKey, appMetadata)) {
      return appMetadata;
    }

    return null;
  }
  /**
   * set appMetadata entity to the platform cache
   * @param appMetadata - cache value to be set of type AppMetadataEntity
   */
  ;

  _proto.setAppMetadata = function setAppMetadata(appMetadata) {
    var appMetadataKey = appMetadata.generateAppMetadataKey();
    this.setItem(appMetadataKey, appMetadata);
  }
  /**
   * fetch server telemetry entity from the platform cache
   * @param serverTelemetrykey - lookup key to fetch cache type ServerTelemetryEntity
   */
  ;

  _proto.getServerTelemetry = function getServerTelemetry(serverTelemetrykey) {
    var serverTelemetryEntity = this.getItem(serverTelemetrykey);

    if (serverTelemetryEntity && msalCommon.ServerTelemetryEntity.isServerTelemetryEntity(serverTelemetrykey, serverTelemetryEntity)) {
      return serverTelemetryEntity;
    }

    return null;
  }
  /**
   * set server telemetry entity to the platform cache
   * @param serverTelemetryKey - lookup key to fetch cache type ServerTelemetryEntity
   * @param serverTelemetry - cache value to be set of type ServerTelemetryEntity
   */
  ;

  _proto.setServerTelemetry = function setServerTelemetry(serverTelemetryKey, serverTelemetry) {
    this.setItem(serverTelemetryKey, serverTelemetry);
  }
  /**
   * fetch authority metadata entity from the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   */
  ;

  _proto.getAuthorityMetadata = function getAuthorityMetadata(key) {
    var authorityMetadataEntity = this.getItem(key);

    if (authorityMetadataEntity && msalCommon.AuthorityMetadataEntity.isAuthorityMetadataEntity(key, authorityMetadataEntity)) {
      return authorityMetadataEntity;
    }

    return null;
  }
  /**
   * Get all authority metadata keys
   */
  ;

  _proto.getAuthorityMetadataKeys = function getAuthorityMetadataKeys() {
    var _this2 = this;

    return this.getKeys().filter(function (key) {
      return _this2.isAuthorityMetadata(key);
    });
  }
  /**
   * set authority metadata entity to the platform cache
   * @param key - lookup key to fetch cache type AuthorityMetadataEntity
   * @param metadata - cache value to be set of type AuthorityMetadataEntity
   */
  ;

  _proto.setAuthorityMetadata = function setAuthorityMetadata(key, metadata) {
    this.setItem(key, metadata);
  }
  /**
   * fetch throttling entity from the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   */
  ;

  _proto.getThrottlingCache = function getThrottlingCache(throttlingCacheKey) {
    var throttlingCache = this.getItem(throttlingCacheKey);

    if (throttlingCache && msalCommon.ThrottlingEntity.isThrottlingEntity(throttlingCacheKey, throttlingCache)) {
      return throttlingCache;
    }

    return null;
  }
  /**
   * set throttling entity to the platform cache
   * @param throttlingCacheKey - lookup key to fetch cache type ThrottlingEntity
   * @param throttlingCache - cache value to be set of type ThrottlingEntity
   */
  ;

  _proto.setThrottlingCache = function setThrottlingCache(throttlingCacheKey, throttlingCache) {
    this.setItem(throttlingCacheKey, throttlingCache);
  }
  /**
   * Removes the cache item from memory with the given key.
   * @param key - lookup key to remove a cache entity
   * @param inMemory - key value map of the cache
   */
  ;

  _proto.removeItem = function removeItem(key) {
    this.logger.verbosePii("Item key: " + key); // read inMemoryCache

    var result = false;
    var cache = this.getCache();

    if (!!cache[key]) {
      delete cache[key];
      result = true;
    } // write to the cache after removal


    if (result) {
      this.setCache(cache);
      this.emitChange();
    }

    return result;
  }
  /**
   * Checks whether key is in cache.
   * @param key - look up key for a cache entity
   */
  ;

  _proto.containsKey = function containsKey(key) {
    return this.getKeys().includes(key);
  }
  /**
   * Gets all keys in window.
   */
  ;

  _proto.getKeys = function getKeys() {
    this.logger.verbose("Retrieving all cache keys"); // read cache

    var cache = this.getCache();
    return [].concat(Object.keys(cache));
  }
  /**
   * Clears all cache entries created by MSAL (except tokens).
   */
  ;

  _proto.clear = function clear() {
    var _this3 = this;

    this.logger.verbose("Clearing cache entries created by MSAL"); // read inMemoryCache

    var cacheKeys = this.getKeys(); // delete each element

    cacheKeys.forEach(function (key) {
      _this3.removeItem(key);
    });
    this.emitChange();
  }
  /**
   * Initialize in memory cache from an exisiting cache vault
   * @param cache - blob formatted cache (JSON)
   */
  ;

  NodeStorage.generateInMemoryCache = function generateInMemoryCache(cache) {
    return Deserializer.deserializeAllCache(Deserializer.deserializeJSONBlob(cache));
  }
  /**
   * retrieves the final JSON
   * @param inMemoryCache - itemised cache read from the JSON
   */
  ;

  NodeStorage.generateJsonCache = function generateJsonCache(inMemoryCache) {
    return Serializer.serializeAllCache(inMemoryCache);
  };

  return NodeStorage;
}(msalCommon.CacheManager);

var defaultSerializedCache = {
  Account: {},
  IdToken: {},
  AccessToken: {},
  RefreshToken: {},
  AppMetadata: {}
};
/**
 * In-memory token cache manager
 * @public
 */

var TokenCache = /*#__PURE__*/function () {
  function TokenCache(storage, logger, cachePlugin) {
    this.cacheHasChanged = false;
    this.storage = storage;
    this.storage.registerChangeEmitter(this.handleChangeEvent.bind(this));

    if (cachePlugin) {
      this.persistence = cachePlugin;
    }

    this.logger = logger;
  }
  /**
   * Set to true if cache state has changed since last time serialize or writeToPersistence was called
   */


  var _proto = TokenCache.prototype;

  _proto.hasChanged = function hasChanged() {
    return this.cacheHasChanged;
  }
  /**
   * Serializes in memory cache to JSON
   */
  ;

  _proto.serialize = function serialize() {
    this.logger.verbose("Serializing in-memory cache");
    var finalState = Serializer.serializeAllCache(this.storage.getInMemoryCache()); // if cacheSnapshot not null or empty, merge

    if (!msalCommon.StringUtils.isEmpty(this.cacheSnapshot)) {
      this.logger.verbose("Reading cache snapshot from disk");
      finalState = this.mergeState(JSON.parse(this.cacheSnapshot), finalState);
    } else {
      this.logger.verbose("No cache snapshot to merge");
    }

    this.cacheHasChanged = false;
    return JSON.stringify(finalState);
  }
  /**
   * Deserializes JSON to in-memory cache. JSON should be in MSAL cache schema format
   * @param cache - blob formatted cache
   */
  ;

  _proto.deserialize = function deserialize(cache) {
    this.logger.verbose("Deserializing JSON to in-memory cache");
    this.cacheSnapshot = cache;

    if (!msalCommon.StringUtils.isEmpty(this.cacheSnapshot)) {
      this.logger.verbose("Reading cache snapshot from disk");
      var deserializedCache = Deserializer.deserializeAllCache(this.overlayDefaults(JSON.parse(this.cacheSnapshot)));
      this.storage.setInMemoryCache(deserializedCache);
    } else {
      this.logger.verbose("No cache snapshot to deserialize");
    }
  }
  /**
   * Fetches the cache key-value map
   */
  ;

  _proto.getKVStore = function getKVStore() {
    return this.storage.getCache();
  }
  /**
   * API that retrieves all accounts currently in cache to the user
   */
  ;

  _proto.getAllAccounts =
  /*#__PURE__*/
  function () {
    var _getAllAccounts = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var cacheContext;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.logger.verbose("getAllAccounts called");
              _context.prev = 1;

              if (!this.persistence) {
                _context.next = 6;
                break;
              }

              cacheContext = new msalCommon.TokenCacheContext(this, false);
              _context.next = 6;
              return this.persistence.beforeCacheAccess(cacheContext);

            case 6:
              return _context.abrupt("return", this.storage.getAllAccounts());

            case 7:
              _context.prev = 7;

              if (!(this.persistence && cacheContext)) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return this.persistence.afterCacheAccess(cacheContext);

            case 11:
              return _context.finish(7);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1,, 7, 12]]);
    }));

    function getAllAccounts() {
      return _getAllAccounts.apply(this, arguments);
    }

    return getAllAccounts;
  }()
  /**
   * Returns the signed in account matching homeAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param homeAccountId - unique identifier for an account (uid.utid)
   */
  ;

  _proto.getAccountByHomeId =
  /*#__PURE__*/
  function () {
    var _getAccountByHomeId = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(homeAccountId) {
      var allAccounts;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.getAllAccounts();

            case 2:
              allAccounts = _context2.sent;

              if (!(!msalCommon.StringUtils.isEmpty(homeAccountId) && allAccounts && allAccounts.length)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", allAccounts.filter(function (accountObj) {
                return accountObj.homeAccountId === homeAccountId;
              })[0] || null);

            case 7:
              return _context2.abrupt("return", null);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getAccountByHomeId(_x) {
      return _getAccountByHomeId.apply(this, arguments);
    }

    return getAccountByHomeId;
  }()
  /**
   * Returns the signed in account matching localAccountId.
   * (the account object is created at the time of successful login)
   * or null when no matching account is found
   * @param localAccountId - unique identifier of an account (sub/obj when homeAccountId cannot be populated)
   */
  ;

  _proto.getAccountByLocalId =
  /*#__PURE__*/
  function () {
    var _getAccountByLocalId = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(localAccountId) {
      var allAccounts;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.getAllAccounts();

            case 2:
              allAccounts = _context3.sent;

              if (!(!msalCommon.StringUtils.isEmpty(localAccountId) && allAccounts && allAccounts.length)) {
                _context3.next = 7;
                break;
              }

              return _context3.abrupt("return", allAccounts.filter(function (accountObj) {
                return accountObj.localAccountId === localAccountId;
              })[0] || null);

            case 7:
              return _context3.abrupt("return", null);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function getAccountByLocalId(_x2) {
      return _getAccountByLocalId.apply(this, arguments);
    }

    return getAccountByLocalId;
  }()
  /**
   * API to remove a specific account and the relevant data from cache
   * @param account - AccountInfo passed by the user
   */
  ;

  _proto.removeAccount =
  /*#__PURE__*/
  function () {
    var _removeAccount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(account) {
      var cacheContext;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              this.logger.verbose("removeAccount called");
              _context4.prev = 1;

              if (!this.persistence) {
                _context4.next = 6;
                break;
              }

              cacheContext = new msalCommon.TokenCacheContext(this, true);
              _context4.next = 6;
              return this.persistence.beforeCacheAccess(cacheContext);

            case 6:
              this.storage.removeAccount(msalCommon.AccountEntity.generateAccountCacheKey(account));

            case 7:
              _context4.prev = 7;

              if (!(this.persistence && cacheContext)) {
                _context4.next = 11;
                break;
              }

              _context4.next = 11;
              return this.persistence.afterCacheAccess(cacheContext);

            case 11:
              return _context4.finish(7);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[1,, 7, 12]]);
    }));

    function removeAccount(_x3) {
      return _removeAccount.apply(this, arguments);
    }

    return removeAccount;
  }()
  /**
   * Called when the cache has changed state.
   */
  ;

  _proto.handleChangeEvent = function handleChangeEvent() {
    this.cacheHasChanged = true;
  }
  /**
   * Merge in memory cache with the cache snapshot.
   * @param oldState - cache before changes
   * @param currentState - current cache state in the library
   */
  ;

  _proto.mergeState = function mergeState(oldState, currentState) {
    this.logger.verbose("Merging in-memory cache with cache snapshot");
    var stateAfterRemoval = this.mergeRemovals(oldState, currentState);
    return this.mergeUpdates(stateAfterRemoval, currentState);
  }
  /**
   * Deep update of oldState based on newState values
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  ;

  _proto.mergeUpdates = function mergeUpdates(oldState, newState) {
    var _this = this;

    Object.keys(newState).forEach(function (newKey) {
      var newValue = newState[newKey]; // if oldState does not contain value but newValue does, add it

      if (!oldState.hasOwnProperty(newKey)) {
        if (newValue !== null) {
          oldState[newKey] = newValue;
        }
      } else {
        // both oldState and newState contain the key, do deep update
        var newValueNotNull = newValue !== null;
        var newValueIsObject = typeof newValue === "object";
        var newValueIsNotArray = !Array.isArray(newValue);
        var oldStateNotUndefinedOrNull = typeof oldState[newKey] !== "undefined" && oldState[newKey] !== null;

        if (newValueNotNull && newValueIsObject && newValueIsNotArray && oldStateNotUndefinedOrNull) {
          _this.mergeUpdates(oldState[newKey], newValue);
        } else {
          oldState[newKey] = newValue;
        }
      }
    });
    return oldState;
  }
  /**
   * Removes entities in oldState that the were removed from newState. If there are any unknown values in root of
   * oldState that are not recognized, they are left untouched.
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  ;

  _proto.mergeRemovals = function mergeRemovals(oldState, newState) {
    this.logger.verbose("Remove updated entries in cache");
    var accounts = oldState.Account ? this.mergeRemovalsDict(oldState.Account, newState.Account) : oldState.Account;
    var accessTokens = oldState.AccessToken ? this.mergeRemovalsDict(oldState.AccessToken, newState.AccessToken) : oldState.AccessToken;
    var refreshTokens = oldState.RefreshToken ? this.mergeRemovalsDict(oldState.RefreshToken, newState.RefreshToken) : oldState.RefreshToken;
    var idTokens = oldState.IdToken ? this.mergeRemovalsDict(oldState.IdToken, newState.IdToken) : oldState.IdToken;
    var appMetadata = oldState.AppMetadata ? this.mergeRemovalsDict(oldState.AppMetadata, newState.AppMetadata) : oldState.AppMetadata;
    return _extends({}, oldState, {
      Account: accounts,
      AccessToken: accessTokens,
      RefreshToken: refreshTokens,
      IdToken: idTokens,
      AppMetadata: appMetadata
    });
  }
  /**
   * Helper to merge new cache with the old one
   * @param oldState - cache before changes
   * @param newState - updated cache
   */
  ;

  _proto.mergeRemovalsDict = function mergeRemovalsDict(oldState, newState) {
    var finalState = _extends({}, oldState);

    Object.keys(oldState).forEach(function (oldKey) {
      if (!newState || !newState.hasOwnProperty(oldKey)) {
        delete finalState[oldKey];
      }
    });
    return finalState;
  }
  /**
   * Helper to overlay as a part of cache merge
   * @param passedInCache - cache read from the blob
   */
  ;

  _proto.overlayDefaults = function overlayDefaults(passedInCache) {
    this.logger.verbose("Overlaying input cache with the default cache");
    return {
      Account: _extends({}, defaultSerializedCache.Account, passedInCache.Account),
      IdToken: _extends({}, defaultSerializedCache.IdToken, passedInCache.IdToken),
      AccessToken: _extends({}, defaultSerializedCache.AccessToken, passedInCache.AccessToken),
      RefreshToken: _extends({}, defaultSerializedCache.RefreshToken, passedInCache.RefreshToken),
      AppMetadata: _extends({}, defaultSerializedCache.AppMetadata, passedInCache.AppMetadata)
    };
  };

  return TokenCache;
}();

/* eslint-disable header/header */
var name = "@azure/msal-node";
var version = "1.0.0-beta.6";

/**
 * Base abstract class for all ClientApplications - public and confidential
 * @public
 */

var ClientApplication = /*#__PURE__*/function () {
  /**
   * Constructor for the ClientApplication
   */
  function ClientApplication(configuration) {
    this.config = buildAppConfiguration(configuration);
    this.cryptoProvider = new CryptoProvider();
    this.logger = new msalCommon.Logger(this.config.system.loggerOptions, name, version);
    this.storage = new NodeStorage(this.logger, this.config.auth.clientId, this.cryptoProvider);
    this.tokenCache = new TokenCache(this.storage, this.logger, this.config.cache.cachePlugin);
  }
  /**
   * Creates the URL of the authorization request, letting the user input credentials and consent to the
   * application. The URL targets the /authorize endpoint of the authority configured in the
   * application object.
   *
   * Once the user inputs their credentials and consents, the authority will send a response to the redirect URI
   * sent in the request and should contain an authorization code, which can then be used to acquire tokens via
   * `acquireTokenByCode(AuthorizationCodeRequest)`.
   */


  var _proto = ClientApplication.prototype;

  _proto.getAuthCodeUrl =
  /*#__PURE__*/
  function () {
    var _getAuthCodeUrl = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(request) {
      var validRequest, authClientConfig, authorizationCodeClient;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.logger.info("getAuthCodeUrl called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request), {
                responseMode: request.responseMode || msalCommon.ResponseMode.QUERY,
                authenticationScheme: msalCommon.AuthenticationScheme.BEARER
              });
              _context.next = 4;
              return this.buildOauthClientConfiguration(validRequest.authority);

            case 4:
              authClientConfig = _context.sent;
              this.logger.verbose("Auth client config generated");
              authorizationCodeClient = new msalCommon.AuthorizationCodeClient(authClientConfig);
              return _context.abrupt("return", authorizationCodeClient.getAuthCodeUrl(validRequest));

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getAuthCodeUrl(_x) {
      return _getAuthCodeUrl.apply(this, arguments);
    }

    return getAuthCodeUrl;
  }()
  /**
   * Acquires a token by exchanging the Authorization Code received from the first step of OAuth2.0
   * Authorization Code flow.
   *
   * `getAuthCodeUrl(AuthorizationCodeUrlRequest)` can be used to create the URL for the first step of OAuth2.0
   * Authorization Code flow. Ensure that values for redirectUri and scopes in AuthorizationCodeUrlRequest and
   * AuthorizationCodeRequest are the same.
   */
  ;

  _proto.acquireTokenByCode =
  /*#__PURE__*/
  function () {
    var _acquireTokenByCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(request) {
      var validRequest, serverTelemetryManager, authClientConfig, authorizationCodeClient;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.logger.info("acquireTokenByCode called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request), {
                authenticationScheme: msalCommon.AuthenticationScheme.BEARER
              });
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByCode, validRequest.correlationId);
              _context2.prev = 3;
              _context2.next = 6;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 6:
              authClientConfig = _context2.sent;
              this.logger.verbose("Auth client config generated");
              authorizationCodeClient = new msalCommon.AuthorizationCodeClient(authClientConfig);
              return _context2.abrupt("return", authorizationCodeClient.acquireToken(validRequest));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](3);
              serverTelemetryManager.cacheFailedRequest(_context2.t0);
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 12]]);
    }));

    function acquireTokenByCode(_x2) {
      return _acquireTokenByCode.apply(this, arguments);
    }

    return acquireTokenByCode;
  }()
  /**
   * Acquires a token by exchanging the refresh token provided for a new set of tokens.
   *
   * This API is provided only for scenarios where you would like to migrate from ADAL to MSAL. Otherwise, it is
   * recommended that you use `acquireTokenSilent()` for silent scenarios. When using `acquireTokenSilent()`, MSAL will
   * handle the caching and refreshing of tokens automatically.
   */
  ;

  _proto.acquireTokenByRefreshToken =
  /*#__PURE__*/
  function () {
    var _acquireTokenByRefreshToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(request) {
      var validRequest, serverTelemetryManager, refreshTokenClientConfig, refreshTokenClient;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.logger.info("acquireTokenByRefreshToken called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request), {
                authenticationScheme: msalCommon.AuthenticationScheme.BEARER
              });
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByRefreshToken, validRequest.correlationId);
              _context3.prev = 3;
              _context3.next = 6;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 6:
              refreshTokenClientConfig = _context3.sent;
              this.logger.verbose("Auth client config generated");
              refreshTokenClient = new msalCommon.RefreshTokenClient(refreshTokenClientConfig);
              return _context3.abrupt("return", refreshTokenClient.acquireToken(validRequest));

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](3);
              serverTelemetryManager.cacheFailedRequest(_context3.t0);
              throw _context3.t0;

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 12]]);
    }));

    function acquireTokenByRefreshToken(_x3) {
      return _acquireTokenByRefreshToken.apply(this, arguments);
    }

    return acquireTokenByRefreshToken;
  }()
  /**
   * Acquires a token silently when a user specifies the account the token is requested for.
   *
   * This API expects the user to provide an account object and looks into the cache to retrieve the token if present.
   * There is also an optional "forceRefresh" boolean the user can send to bypass the cache for access_token and id_token.
   * In case the refresh_token is expired or not found, an error is thrown
   * and the guidance is for the user to call any interactive token acquisition API (eg: `acquireTokenByCode()`).
   */
  ;

  _proto.acquireTokenSilent =
  /*#__PURE__*/
  function () {
    var _acquireTokenSilent = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(request) {
      var validRequest, serverTelemetryManager, silentFlowClientConfig, silentFlowClient;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              validRequest = _extends({}, request, this.initializeBaseRequest(request), {
                forceRefresh: request.forceRefresh || false
              });
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenSilent, validRequest.correlationId, validRequest.forceRefresh);
              _context4.prev = 2;
              _context4.next = 5;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 5:
              silentFlowClientConfig = _context4.sent;
              silentFlowClient = new msalCommon.SilentFlowClient(silentFlowClientConfig);
              return _context4.abrupt("return", silentFlowClient.acquireToken(validRequest));

            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](2);
              serverTelemetryManager.cacheFailedRequest(_context4.t0);
              throw _context4.t0;

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 10]]);
    }));

    function acquireTokenSilent(_x4) {
      return _acquireTokenSilent.apply(this, arguments);
    }

    return acquireTokenSilent;
  }()
  /**
   * Gets the token cache for the application.
   */
  ;

  _proto.getTokenCache = function getTokenCache() {
    this.logger.info("getTokenCache called");
    return this.tokenCache;
  }
  /**
   * Returns the logger instance
   */
  ;

  _proto.getLogger = function getLogger() {
    return this.logger;
  }
  /**
   * Replaces the default logger set in configurations with new Logger with new configurations
   * @param logger - Logger instance
   */
  ;

  _proto.setLogger = function setLogger(logger) {
    this.logger = logger;
  }
  /**
   * Builds the common configuration to be passed to the common component based on the platform configurarion
   * @param authority - user passed authority in configuration
   * @param serverTelemetryManager - initializes servertelemetry if passed
   */
  ;

  _proto.buildOauthClientConfiguration =
  /*#__PURE__*/
  function () {
    var _buildOauthClientConfiguration = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(authority, serverTelemetryManager) {
      var discoveredAuthority;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              this.logger.verbose("buildOauthClientConfiguration called"); // using null assertion operator as we ensure that all config values have default values in buildConfiguration()

              _context5.next = 3;
              return this.createAuthority(authority);

            case 3:
              discoveredAuthority = _context5.sent;
              return _context5.abrupt("return", {
                authOptions: {
                  clientId: this.config.auth.clientId,
                  authority: discoveredAuthority,
                  clientCapabilities: this.config.auth.clientCapabilities
                },
                loggerOptions: {
                  loggerCallback: this.config.system.loggerOptions.loggerCallback,
                  piiLoggingEnabled: this.config.system.loggerOptions.piiLoggingEnabled
                },
                cryptoInterface: this.cryptoProvider,
                networkInterface: this.config.system.networkClient,
                storageInterface: this.storage,
                serverTelemetryManager: serverTelemetryManager,
                clientCredentials: {
                  clientSecret: this.clientSecret,
                  clientAssertion: this.clientAssertion ? this.getClientAssertion(discoveredAuthority) : undefined
                },
                libraryInfo: {
                  sku: Constants.MSAL_SKU,
                  version: version,
                  cpu: process.arch || "",
                  os: process.platform || ""
                },
                persistencePlugin: this.config.cache.cachePlugin,
                serializableCache: this.tokenCache
              });

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function buildOauthClientConfiguration(_x5, _x6) {
      return _buildOauthClientConfiguration.apply(this, arguments);
    }

    return buildOauthClientConfiguration;
  }();

  _proto.getClientAssertion = function getClientAssertion(authority) {
    return {
      assertion: this.clientAssertion.getJwt(this.cryptoProvider, this.config.auth.clientId, authority.tokenEndpoint),
      assertionType: Constants.JWT_BEARER_ASSERTION_TYPE
    };
  }
  /**
   * Generates a request with the default scopes & generates a correlationId.
   * @param authRequest - BaseAuthRequest for initialization
   */
  ;

  _proto.initializeBaseRequest = function initializeBaseRequest(authRequest) {
    this.logger.verbose("initializeRequestScopes called");
    return _extends({}, authRequest, {
      scopes: [].concat(authRequest && authRequest.scopes || [], msalCommon.OIDC_DEFAULT_SCOPES),
      correlationId: authRequest && authRequest.correlationId || this.cryptoProvider.createNewGuid(),
      authority: authRequest.authority || this.config.auth.authority
    });
  }
  /**
   * Initializes the server telemetry payload
   * @param apiId - Id for a specific request
   * @param correlationId - GUID
   * @param forceRefresh - boolean to indicate network call
   */
  ;

  _proto.initializeServerTelemetryManager = function initializeServerTelemetryManager(apiId, correlationId, forceRefresh) {
    var telemetryPayload = {
      clientId: this.config.auth.clientId,
      correlationId: correlationId,
      apiId: apiId,
      forceRefresh: forceRefresh || false
    };
    return new msalCommon.ServerTelemetryManager(telemetryPayload, this.storage);
  }
  /**
   * Create authority instance. If authority not passed in request, default to authority set on the application
   * object. If no authority set in application object, then default to common authority.
   * @param authorityString - authority from user configuration
   */
  ;

  _proto.createAuthority =
  /*#__PURE__*/
  function () {
    var _createAuthority = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(authorityString) {
      var authorityOptions;
      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              this.logger.verbose("createAuthority called");
              authorityOptions = {
                protocolMode: this.config.auth.protocolMode,
                knownAuthorities: this.config.auth.knownAuthorities,
                cloudDiscoveryMetadata: this.config.auth.cloudDiscoveryMetadata,
                authorityMetadata: this.config.auth.authorityMetadata
              };
              _context6.next = 4;
              return msalCommon.AuthorityFactory.createDiscoveredInstance(authorityString, this.config.system.networkClient, this.storage, authorityOptions);

            case 4:
              return _context6.abrupt("return", _context6.sent);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function createAuthority(_x7) {
      return _createAuthority.apply(this, arguments);
    }

    return createAuthority;
  }();

  return ClientApplication;
}();

/**
 * This class is to be used to acquire tokens for public client applications (desktop, mobile). Public client applications
 * are not trusted to safely store application secrets, and therefore can only request tokens in the name of an user.
 * @public
 */

var PublicClientApplication = /*#__PURE__*/function (_ClientApplication) {
  _inheritsLoose(PublicClientApplication, _ClientApplication);

  /**
   * Important attributes in the Configuration object for auth are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our Application registration portal.
   * - authority: the authority URL for your application.
   *
   * AAD authorities are of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * - If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * - If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * - If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * - To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * Azure B2C authorities are of the form https://\{instance\}/\{tenant\}/\{policy\}. Each policy is considered
   * its own authority. You will have to set the all of the knownAuthorities at the time of the client application
   * construction.
   *
   * ADFS authorities are of the form https://\{instance\}/adfs.
   */
  function PublicClientApplication(configuration) {
    return _ClientApplication.call(this, configuration) || this;
  }
  /**
   * Acquires a token from the authority using OAuth2.0 device code flow.
   * This flow is designed for devices that do not have access to a browser or have input constraints.
   * The authorization server issues a DeviceCode object with a verification code, an end-user code,
   * and the end-user verification URI. The DeviceCode object is provided through a callback, and the end-user should be
   * instructed to use another device to navigate to the verification URI to input credentials.
   * Since the client cannot receive incoming requests, it polls the authorization server repeatedly
   * until the end-user completes input of credentials.
   */


  var _proto = PublicClientApplication.prototype;

  _proto.acquireTokenByDeviceCode =
  /*#__PURE__*/
  function () {
    var _acquireTokenByDeviceCode = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(request) {
      var validRequest, serverTelemetryManager, deviceCodeConfig, deviceCodeClient;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.logger.info("acquireTokenByDeviceCode called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request));
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByDeviceCode, validRequest.correlationId);
              _context.prev = 3;
              _context.next = 6;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 6:
              deviceCodeConfig = _context.sent;
              this.logger.verbose("Auth client config generated");
              deviceCodeClient = new msalCommon.DeviceCodeClient(deviceCodeConfig);
              return _context.abrupt("return", deviceCodeClient.acquireToken(validRequest));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              serverTelemetryManager.cacheFailedRequest(_context.t0);
              throw _context.t0;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 12]]);
    }));

    function acquireTokenByDeviceCode(_x) {
      return _acquireTokenByDeviceCode.apply(this, arguments);
    }

    return acquireTokenByDeviceCode;
  }()
  /**
   * Acquires tokens with password grant by exchanging client applications username and password for credentials
   *
   * The latest OAuth 2.0 Security Best Current Practice disallows the password grant entirely.
   * More details on this recommendation at https://tools.ietf.org/html/draft-ietf-oauth-security-topics-13#section-3.4
   * Microsoft's documentation and recommendations are at:
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-authentication-flows#usernamepassword
   *
   * @param request - UsenamePasswordRequest
   */
  ;

  _proto.acquireTokenByUsernamePassword =
  /*#__PURE__*/
  function () {
    var _acquireTokenByUsernamePassword = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(request) {
      var validRequest, serverTelemetryManager, usernamePasswordClientConfig, usernamePasswordClient;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.logger.info("acquireTokenByUsernamePassword called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request));
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByUsernamePassword, validRequest.correlationId);
              _context2.prev = 3;
              _context2.next = 6;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 6:
              usernamePasswordClientConfig = _context2.sent;
              this.logger.verbose("Auth client config generated");
              usernamePasswordClient = new msalCommon.UsernamePasswordClient(usernamePasswordClientConfig);
              return _context2.abrupt("return", usernamePasswordClient.acquireToken(validRequest));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](3);
              serverTelemetryManager.cacheFailedRequest(_context2.t0);
              throw _context2.t0;

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[3, 12]]);
    }));

    function acquireTokenByUsernamePassword(_x2) {
      return _acquireTokenByUsernamePassword.apply(this, arguments);
    }

    return acquireTokenByUsernamePassword;
  }();

  return PublicClientApplication;
}(ClientApplication);

/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
/**
 * Client assertion of type jwt-bearer used in confidential client flows
 * @public
 */

var ClientAssertion = /*#__PURE__*/function () {
  function ClientAssertion() {}

  /**
   * Initialize the ClientAssertion class from the clientAssertion passed by the user
   * @param assertion - refer https://tools.ietf.org/html/rfc7521
   */
  ClientAssertion.fromAssertion = function fromAssertion(assertion) {
    var clientAssertion = new ClientAssertion();
    clientAssertion.jwt = assertion;
    return clientAssertion;
  }
  /**
   * Initialize the ClientAssertion class from the certificate passed by the user
   * @param thumbprint - identifier of a certificate
   * @param privateKey - secret key
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  ;

  ClientAssertion.fromCertificate = function fromCertificate(thumbprint, privateKey, publicCertificate) {
    var clientAssertion = new ClientAssertion();
    clientAssertion.privateKey = privateKey;
    clientAssertion.thumbprint = thumbprint;

    if (publicCertificate) {
      clientAssertion.publicCertificate = this.parseCertificate(publicCertificate);
    }

    return clientAssertion;
  }
  /**
   * Update JWT for certificate based clientAssertion, if passed by the user, uses it as is
   * @param cryptoProvider - library's crypto helper
   * @param issuer - iss claim
   * @param jwtAudience - aud claim
   */
  ;

  var _proto = ClientAssertion.prototype;

  _proto.getJwt = function getJwt(cryptoProvider, issuer, jwtAudience) {
    // if assertion was created from certificate, check if jwt is expired and create new one.
    if (this.privateKey && this.thumbprint) {
      if (this.jwt && !this.isExpired() && issuer === this.issuer && jwtAudience === this.jwtAudience) {
        return this.jwt;
      }

      return this.createJwt(cryptoProvider, issuer, jwtAudience);
    }
    /*
     * if assertion was created by caller, then we just append it. It is up to the caller to
     * ensure that it contains necessary claims and that it is not expired.
     */


    if (this.jwt) {
      return this.jwt;
    }

    throw msalCommon.ClientAuthError.createInvalidAssertionError();
  }
  /**
   * JWT format and required claims specified: https://tools.ietf.org/html/rfc7523#section-3
   */
  ;

  _proto.createJwt = function createJwt(cryptoProvider, issuer, jwtAudience) {
    var _header, _payload;

    this.issuer = issuer;
    this.jwtAudience = jwtAudience;
    var issuedAt = msalCommon.TimeUtils.nowSeconds();
    this.expirationTime = issuedAt + 600;
    var header = (_header = {}, _header[JwtConstants.ALGORITHM] = JwtConstants.RSA_256, _header[JwtConstants.X5T] = EncodingUtils.base64EncodeUrl(this.thumbprint, "hex"), _header);

    if (this.publicCertificate) {
      var _Object$assign;

      Object.assign(header, (_Object$assign = {}, _Object$assign[JwtConstants.X5C] = this.publicCertificate, _Object$assign));
    }

    var payload = (_payload = {}, _payload[JwtConstants.AUDIENCE] = this.jwtAudience, _payload[JwtConstants.EXPIRATION_TIME] = this.expirationTime, _payload[JwtConstants.ISSUER] = this.issuer, _payload[JwtConstants.SUBJECT] = this.issuer, _payload[JwtConstants.NOT_BEFORE] = issuedAt, _payload[JwtConstants.JWT_ID] = cryptoProvider.createNewGuid(), _payload);
    this.jwt = jsonwebtoken.sign(payload, this.privateKey, {
      header: header
    });
    return this.jwt;
  }
  /**
   * Utility API to check expiration
   */
  ;

  _proto.isExpired = function isExpired() {
    return this.expirationTime < msalCommon.TimeUtils.nowSeconds();
  }
  /**
   * Extracts the raw certs from a given certificate string and returns them in an array.
   * @param publicCertificate - electronic document provided to prove the ownership of the public key
   */
  ;

  ClientAssertion.parseCertificate = function parseCertificate(publicCertificate) {
    /**
     * This is regex to identify the certs in a given certificate string.
     * We want to look for the contents between the BEGIN and END certificate strings, without the associated newlines.
     * The information in parens "(.+?)" is the capture group to represent the cert we want isolated.
     * "." means any string character, "+" means match 1 or more times, and "?" means the shortest match.
     * The "g" at the end of the regex means search the string globally, and the "s" enables the "." to match newlines.
     */
    var regexToFindCerts = /\x2D\x2D\x2D\x2D\x2DBEGIN CERTIFICATE\x2D\x2D\x2D\x2D\x2D\n([\s\S]+?)\n\x2D\x2D\x2D\x2D\x2DEND CERTIFICATE\x2D\x2D\x2D\x2D\x2D/g;
    var certs = [];
    var matches;

    while ((matches = regexToFindCerts.exec(publicCertificate)) !== null) {
      // matches[1] represents the first parens capture group in the regex.
      certs.push(matches[1].replace(/\n/, ""));
    }

    return certs;
  };

  return ClientAssertion;
}();

/**
 *  This class is to be used to acquire tokens for confidential client applications (webApp, webAPI). Confidential client applications
 *  will configure application secrets, client certificates/assertions as applicable
 * @public
 */

var ConfidentialClientApplication = /*#__PURE__*/function (_ClientApplication) {
  _inheritsLoose(ConfidentialClientApplication, _ClientApplication);

  /**
   * Constructor for the ConfidentialClientApplication
   *
   * Required attributes in the Configuration object are:
   * - clientID: the application ID of your application. You can obtain one by registering your application with our application registration portal
   * - authority: the authority URL for your application.
   * - client credential: Must set either client secret, certificate, or assertion for confidential clients. You can obtain a client secret from the application registration portal.
   *
   * In Azure AD, authority is a URL indicating of the form https://login.microsoftonline.com/\{Enter_the_Tenant_Info_Here\}.
   * If your application supports Accounts in one organizational directory, replace "Enter_the_Tenant_Info_Here" value with the Tenant Id or Tenant name (for example, contoso.microsoft.com).
   * If your application supports Accounts in any organizational directory, replace "Enter_the_Tenant_Info_Here" value with organizations.
   * If your application supports Accounts in any organizational directory and personal Microsoft accounts, replace "Enter_the_Tenant_Info_Here" value with common.
   * To restrict support to Personal Microsoft accounts only, replace "Enter_the_Tenant_Info_Here" value with consumers.
   *
   * In Azure B2C, authority is of the form https://\{instance\}/tfp/\{tenant\}/\{policyName\}/
   * Full B2C functionality will be available in this library in future versions.
   *
   * @param Configuration - configuration object for the MSAL ConfidentialClientApplication instance
   */
  function ConfidentialClientApplication(configuration) {
    var _this;

    _this = _ClientApplication.call(this, configuration) || this;

    _this.setClientCredential(_this.config);

    return _this;
  }
  /**
   * Acquires tokens from the authority for the application (not for an end user).
   */


  var _proto = ConfidentialClientApplication.prototype;

  _proto.acquireTokenByClientCredential =
  /*#__PURE__*/
  function () {
    var _acquireTokenByClientCredential = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(request) {
      var validRequest, serverTelemetryManager, clientCredentialConfig, clientCredentialClient;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.logger.info("acquireTokenByClientCredential called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request));
              serverTelemetryManager = this.initializeServerTelemetryManager(ApiId.acquireTokenByClientCredential, validRequest.correlationId, validRequest.skipCache);
              _context.prev = 3;
              _context.next = 6;
              return this.buildOauthClientConfiguration(validRequest.authority, serverTelemetryManager);

            case 6:
              clientCredentialConfig = _context.sent;
              this.logger.verbose("Auth client config generated");
              clientCredentialClient = new msalCommon.ClientCredentialClient(clientCredentialConfig);
              return _context.abrupt("return", clientCredentialClient.acquireToken(validRequest));

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](3);
              serverTelemetryManager.cacheFailedRequest(_context.t0);
              throw _context.t0;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 12]]);
    }));

    function acquireTokenByClientCredential(_x) {
      return _acquireTokenByClientCredential.apply(this, arguments);
    }

    return acquireTokenByClientCredential;
  }()
  /**
   * Acquires tokens from the authority for the application.
   *
   * Used in scenarios where the current app is a middle-tier service which was called with a token
   * representing an end user. The current app can use the token (oboAssertion) to request another
   * token to access downstream web API, on behalf of that user.
   *
   * The current middle-tier app has no user interaction to obtain consent.
   * See how to gain consent upfront for your middle-tier app from this article.
   * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow#gaining-consent-for-the-middle-tier-application
   */
  ;

  _proto.acquireTokenOnBehalfOf =
  /*#__PURE__*/
  function () {
    var _acquireTokenOnBehalfOf = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(request) {
      var validRequest, clientCredentialConfig, oboClient;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.logger.info("acquireTokenOnBehalfOf called");
              validRequest = _extends({}, request, this.initializeBaseRequest(request));
              _context2.next = 4;
              return this.buildOauthClientConfiguration(validRequest.authority);

            case 4:
              clientCredentialConfig = _context2.sent;
              this.logger.verbose("Auth client config generated");
              oboClient = new msalCommon.OnBehalfOfClient(clientCredentialConfig);
              return _context2.abrupt("return", oboClient.acquireToken(validRequest));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function acquireTokenOnBehalfOf(_x2) {
      return _acquireTokenOnBehalfOf.apply(this, arguments);
    }

    return acquireTokenOnBehalfOf;
  }();

  _proto.setClientCredential = function setClientCredential(configuration) {
    var clientSecretNotEmpty = !msalCommon.StringUtils.isEmpty(configuration.auth.clientSecret);
    var clientAssertionNotEmpty = !msalCommon.StringUtils.isEmpty(configuration.auth.clientAssertion);
    var certificate = configuration.auth.clientCertificate;
    var certificateNotEmpty = !msalCommon.StringUtils.isEmpty(certificate.thumbprint) || !msalCommon.StringUtils.isEmpty(certificate.privateKey); // Check that at most one credential is set on the application

    if (clientSecretNotEmpty && clientAssertionNotEmpty || clientAssertionNotEmpty && certificateNotEmpty || clientSecretNotEmpty && certificateNotEmpty) {
      throw msalCommon.ClientAuthError.createInvalidCredentialError();
    }

    if (clientSecretNotEmpty) {
      this.clientSecret = configuration.auth.clientSecret;
      return;
    }

    if (clientAssertionNotEmpty) {
      this.clientAssertion = ClientAssertion.fromAssertion(configuration.auth.clientAssertion);
      return;
    }

    if (!certificateNotEmpty) {
      throw msalCommon.ClientAuthError.createInvalidCredentialError();
    } else {
      var _configuration$auth$c;

      this.clientAssertion = ClientAssertion.fromCertificate(certificate.thumbprint, certificate.privateKey, (_configuration$auth$c = configuration.auth.clientCertificate) == null ? void 0 : _configuration$auth$c.x5c);
    }
  };

  return ConfidentialClientApplication;
}(ClientApplication);

Object.defineProperty(exports, 'AuthError', {
  enumerable: true,
  get: function () {
    return msalCommon.AuthError;
  }
});
Object.defineProperty(exports, 'AuthErrorMessage', {
  enumerable: true,
  get: function () {
    return msalCommon.AuthErrorMessage;
  }
});
Object.defineProperty(exports, 'ClientAuthError', {
  enumerable: true,
  get: function () {
    return msalCommon.ClientAuthError;
  }
});
Object.defineProperty(exports, 'ClientAuthErrorMessage', {
  enumerable: true,
  get: function () {
    return msalCommon.ClientAuthErrorMessage;
  }
});
Object.defineProperty(exports, 'ClientConfigurationError', {
  enumerable: true,
  get: function () {
    return msalCommon.ClientConfigurationError;
  }
});
Object.defineProperty(exports, 'ClientConfigurationErrorMessage', {
  enumerable: true,
  get: function () {
    return msalCommon.ClientConfigurationErrorMessage;
  }
});
Object.defineProperty(exports, 'InteractionRequiredAuthError', {
  enumerable: true,
  get: function () {
    return msalCommon.InteractionRequiredAuthError;
  }
});
Object.defineProperty(exports, 'LogLevel', {
  enumerable: true,
  get: function () {
    return msalCommon.LogLevel;
  }
});
Object.defineProperty(exports, 'Logger', {
  enumerable: true,
  get: function () {
    return msalCommon.Logger;
  }
});
Object.defineProperty(exports, 'PromptValue', {
  enumerable: true,
  get: function () {
    return msalCommon.PromptValue;
  }
});
Object.defineProperty(exports, 'ProtocolMode', {
  enumerable: true,
  get: function () {
    return msalCommon.ProtocolMode;
  }
});
Object.defineProperty(exports, 'ResponseMode', {
  enumerable: true,
  get: function () {
    return msalCommon.ResponseMode;
  }
});
Object.defineProperty(exports, 'ServerError', {
  enumerable: true,
  get: function () {
    return msalCommon.ServerError;
  }
});
Object.defineProperty(exports, 'TokenCacheContext', {
  enumerable: true,
  get: function () {
    return msalCommon.TokenCacheContext;
  }
});
exports.ClientApplication = ClientApplication;
exports.ClientAssertion = ClientAssertion;
exports.ConfidentialClientApplication = ConfidentialClientApplication;
exports.CryptoProvider = CryptoProvider;
exports.NodeStorage = NodeStorage;
exports.PublicClientApplication = PublicClientApplication;
exports.TokenCache = TokenCache;
exports.buildAppConfiguration = buildAppConfiguration;
//# sourceMappingURL=msal-node.cjs.development.js.map
