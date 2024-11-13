(function(undefined) {
  var root = this;

  // Weird IE shit, objects do not have hasOwn, but the prototype does...
  var hasOwnProp = Object.prototype.hasOwnProperty;

  var reverseDupArray = function (array) {
    var result = new Array(array.length);
    var index  = array.length;
    var arrayMaxIndex = index - 1;

    while (index--) {
      result[arrayMaxIndex - index] = array[index];
    }

    return result;
  };

  var Dottie = function() {
    var args = Array.prototype.slice.call(arguments);

    if (args.length == 2) {
      return Dottie.find.apply(this, args);
    }
    return Dottie.transform.apply(this, args);
  };

  // Legacy syntax, changed syntax to have get/set be similar in arg order
  Dottie.find = function(path, object) {
    return Dottie.get(object, path);
  };

  // Dottie memoization flag
  Dottie.memoizePath = true;
  var memoized = {};

  // Traverse object according to path, return value if found - Return undefined if destination is unreachable
  Dottie.get = function(object, path, defaultVal) {
    if ((object === undefined) || (object === null) || (path === undefined) || (path === null)) {
        return defaultVal;
    }

    var names;

    if (typeof path === "string") {
      if (Dottie.memoizePath) {
        if (memoized[path]) {
          names = memoized[path].slice(0);
        } else {
          names = path.split('.').reverse();
          memoized[path] = names.slice(0);
        }
      } else {
        names = path.split('.').reverse();
      }
    } else if (Array.isArray(path)) {
      names = reverseDupArray(path);
    }

    while (names.length && (object = object[names.pop()]) !== undefined && object !== null);

    // Handle cases where accessing a childprop of a null value
    if (object === null && names.length) object = undefined;

    return (object === undefined ? defaultVal : object);
  };

  Dottie.exists = function(object, path) {
    return Dottie.get(object, path) !== undefined;
  };

  // Set nested value
  Dottie.set = function(object, path, value, options) {
    var pieces = Array.isArray(path) ? path : path.split('.'), current = object, piece, length = pieces.length;
    if (pieces[0] === '__proto__') return;

    if (typeof current !== 'object') {
        throw new Error('Parent is not an object.');
    }

    for (var index = 0; index < length; index++) {
      piece = pieces[index];

      // Create namespace (object) where none exists.
      // If `force === true`, bruteforce the path without throwing errors.
      if (
        !hasOwnProp.call(current, piece)
        || current[piece] === undefined
        || ((typeof current[piece] !== 'object' || current[piece] === null) && options && options.force === true)) {
        current[piece] = {};
      }

      if (index == (length - 1)) {
        // Set final value
        current[piece] = value;
      } else {
        // We do not overwrite existing path pieces by default
        if (typeof current[piece] !== 'object' || current[piece] === null) {
          throw new Error('Target key "' + piece + '" is not suitable for a nested value. (It is in use as non-object. Set `force` to `true` to override.)');
        }

        // Traverse next in path
        current = current[piece];
      }
    }

    // Is there any case when this is relevant? It's also the last line in the above for-loop
    current[piece] = value;
  };

  // Set default nested value
  Dottie['default'] = function(object, path, value) {
    if (Dottie.get(object, path) === undefined) {
      Dottie.set(object, path, value);
    }
  };

  // Transform unnested object with .-seperated keys into a nested object.
  Dottie.transform = function Dottie$transformfunction(object, options) {
    if (Array.isArray(object)) {
      return object.map(function(o) {
        return Dottie.transform(o, options);
      });
    }

    options = options || {};
    options.delimiter = options.delimiter || '.';

    var pieces
      , piecesLength
      , piece
      , current
      , transformed = {}
      , key
      , keys = Object.keys(object)
      , length = keys.length
      , i;

    for (i = 0; i < length; i++) {
      key = keys[i];

      if (key.indexOf(options.delimiter) !== -1) {
        pieces = key.split(options.delimiter);

        if (pieces[0] === '__proto__') break;

        piecesLength = pieces.length;
        current = transformed;

        for (var index = 0; index < piecesLength; index++) {
          piece = pieces[index];
          if (index != (piecesLength - 1) && !current.hasOwnProperty(piece)) {
            current[piece] = {};
          }

          if (index == (piecesLength - 1)) {
            current[piece] = object[key];
          }

          current = current[piece];
          if (current === null) {
            break;
          }
        }
      } else {
        transformed[key] = object[key];
      }
    }

    return transformed;
  };

  Dottie.flatten = function(object, seperator) {
    if (typeof seperator === "undefined") seperator = '.';
    var flattened = {}
      , current
      , nested;

    for (var key in object) {
      if (hasOwnProp.call(object, key)) {
        current = object[key];
        if (Object.prototype.toString.call(current) === "[object Object]") {
          nested = Dottie.flatten(current, seperator);

          for (var _key in nested) {
            flattened[key+seperator+_key] = nested[_key];
          }
        } else {
          flattened[key] = current;
        }
      }
    }

    return flattened;
  };

  Dottie.paths = function(object, prefixes) {
    var paths = [];
    var value;
    var key;

    prefixes = prefixes || [];

    if (typeof object === 'object') {
      for (key in object) {
        value = object[key];

        if (typeof value === 'object' && value !== null) {
          paths = paths.concat(Dottie.paths(value, prefixes.concat([key])));
        } else {
          paths.push(prefixes.concat(key).join('.'));
        }
      }
    } else {
      throw new Error('Paths was called with non-object argument.');
    }

    return paths;
  };

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Dottie;
  } else {
    root['Dottie'] = Dottie;
    root['Dot'] = Dottie; //BC

    if (typeof define === "function") {
      define([], function () { return Dottie; });
    }
  }
})();
