# Toposort
[![Build Status](http://img.shields.io/travis/gustavohenke/toposort.svg?branch=master&style=flat)](https://travis-ci.org/gustavohenke/toposort)
[![Dependency Status](http://img.shields.io/gemnasium/gustavohenke/toposort.png?style=flat)](https://gemnasium.com/gustavohenke/toposort)

__Sorting directed acyclic graphs, for Node.js, io.js and the browser__
_This was originally done by Marcel Klehr. [Why not checkout his original repo?](https://github.com/marcelklehr/toposort)_

## Installation
There are a few ways for installing Toposort. Here are them:

* Via NPM: `npm install toposort-class`
* Via Bower: `bower install toposort`
* Via Git: `git clone git://github.com/gustavohenke/toposort.git`
* [Direct download](https://raw.githubusercontent.com/gustavohenke/toposort/master/build/toposort.js) ([Minified](https://raw.githubusercontent.com/gustavohenke/toposort/master/build/toposort.min.js)) for use in the browser

## Example
Let's say you have the following dependency graph:

* Plugin depends on Backbone and jQuery UI Button;
* Backbone depends on jQuery and Underscore;
* jQuery UI Button depends on jQuery UI Core and jQuery UI Widget;
* jQuery UI Widget and jQuery UI Core depend on jQuery;
* jQuery and Underscore don't depend on anyone.

Now, how would you sort this in a way that each asset will be correctly placed? You'll probably need the following sorting:

* `jQuery`, `jQuery UI Core`, `jQuery UI Widget`, `jQuery UI Button`, `Underscore`, `Backbone`, `Plugin`

You can achieve it with the following code, using `toposort-class`:
```javascript
var Toposort = require('toposort-class'),
	t = new Toposort();

t.add("jquery-ui-core", "jquery")
 .add("jquery-ui-widget", "jquery")
 .add("jquery-ui-button", ["jquery-ui-core", "jquery-ui-widget"])
 .add("plugin", ["backbone", "jquery-ui-button"])
 .add("backbone", ["underscore", "jquery"]);

console.log(t.sort().reverse());

/* Will output:
 * ['jquery', 'jquery-ui-core', 'jquery-ui-widget', 'jquery-ui-button', 'underscore', 'backbone', 'plugin']
 *
 * And you're done.
 */
```

## Usage
CommonJS (Node.js and io.js):
```javascript
var Toposort = require('toposort-class'),
	t = new Toposort();
```

Browser with AMD:
```javascript
define("myModule", ["Toposort"], function(Toposort) {
    var t = new Toposort();
});
```

Browser without AMD:
```javascript
var t = new window.Toposort();
```

or whatever global object there is instead of `window`.

## API

#### `.add(item, deps)`
* _{String}_ `item` - The name of the dependent item that is being added
* _{Array|String}_ `deps` - A dependency or list of dependencies of `item`

__Returns:__ _{Toposort}_ The Toposort instance, for chaining.

#### `.sort()`
__Returns:__ _{Array}_ The list of dependencies topologically sorted.

This method will check for cyclic dependencies, like "A is dependent of A".

#### `.clear()`
__Returns:__ _{Toposort}_ The Toposort instance, for chaining.

Clears all edges, effectively resetting the instance.

#### `.Toposort`

Reference to the Toposort constructor.

## Legal
MIT License
