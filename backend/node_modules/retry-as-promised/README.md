# retry-as-promised

Retry promises when they fail

## Installation

```sh
$ npm install --save retry-as-promised
$ yarn add retry-as-promised
```

## Configuration

```js
var retry = require('retry-as-promised').default;

var warningFn = function(msg){ someLoggingFunction(msg, 'notice'); };

// Will call the until max retries or the promise is resolved.
return retry(function (options) {
  // options.current, times callback has been called including this call
  return promise;
}, {
  max: 3, // maximum amount of tries
  timeout: 10000 // throw if no response or error within millisecond timeout, default: undefined,
  match: [ // Must match error signature (ala bluebird catch) to continue
    Sequelize.ConnectionError,
    'SQLITE_BUSY'
  ],
  backoffBase: 1000 // Initial backoff duration in ms. Default: 100,
  backoffExponent: 1.5 // Exponent to increase backoff each try. Default: 1.1
  report: warningFn, // the function used for reporting; must have a (string, object) argument signature, where string is the message that will passed in by retry-as-promised, and the object will be this configuration object + the $current property
  name:  'SourceX' // if user supplies string, it will be used when composing error/reporting messages; else if retry gets a callback, uses callback name in erroring/reporting; else (default) uses literal string 'unknown'
});
```

## Tested with

- Bluebird
- Q
