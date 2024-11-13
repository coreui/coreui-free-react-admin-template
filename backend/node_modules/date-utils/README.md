# Date-Utils: Polyfills for the Date object

[![Build Status](https://secure.travis-ci.org/JerrySievert/date-utils.png)](http://travis-ci.org/JerrySievert/date-utils)

## NOTE

Version 2 Feature and Changes discussion is being held at https://github.com/JerrySievert/node-date-utils/issues/37

## In a nutshell

- Micro-Framework adding missing functionality to the Date object
- Useable as a polyfill in the browser
- Useable as a polyfill in Node.js
- Works in CouchDB

## Using within a Browser
    <script type="text/javascript" src="date-utils.min.js"></script>

## Using with Node.js
    $ npm install date-utils

    require('date-utils');

Note: This did not work in the `REPL` before `Node.js 0.6` due to how `Node.js` handles context in the `REPL`.

## Changing Languages
    require('date-utils').language("es")

Supported languages:

- Spanish - "es"
- French - "fr"
- Portuguese Brazilian - "pt-BR"

## Documentation

Documentation (nearing completion) can be found at https://jerrysievert.github.io/date-utils

## Development

Make sure you have [gulp](https://www.npmjs.org/package/gulp) installed (npm install gulp -g). After that hit `npm install` to get the dependencies. Finally, hit `gulp`. This will build the library initially. If you make changes to the library, it will compile the minified version automatically.

### Testing

```
$ npm test
```

### Complexity and Minification

```
$ gulp
```
