wkx [![Build Status](https://travis-ci.org/cschwarz/wkx.svg?branch=master)](https://travis-ci.org/cschwarz/wkx) [![Coverage Status](https://coveralls.io/repos/cschwarz/wkx/badge.svg?branch=master)](https://coveralls.io/r/cschwarz/wkx?branch=master)
========

A WKT/WKB/EWKT/EWKB/TWKB/GeoJSON parser and serializer with support for

- Point
- LineString
- Polygon
- MultiPoint
- MultiLineString
- MultiPolygon
- GeometryCollection

Examples
--------

The following examples show you how to work with wkx.

```javascript
var wkx = require('wkx');

//Parsing a WKT string
var geometry = wkx.Geometry.parse('POINT(1 2)');

//Parsing an EWKT string
var geometry = wkx.Geometry.parse('SRID=4326;POINT(1 2)');

//Parsing a node Buffer containing a WKB object
var geometry = wkx.Geometry.parse(wkbBuffer);

//Parsing a node Buffer containing an EWKB object
var geometry = wkx.Geometry.parse(ewkbBuffer);

//Parsing a node Buffer containing a TWKB object
var geometry = wkx.Geometry.parseTwkb(twkbBuffer);

//Parsing a GeoJSON object
var geometry = wkx.Geometry.parseGeoJSON({ type: 'Point', coordinates: [1, 2] });

//Serializing a Point geometry to WKT
var wktString = new wkx.Point(1, 2).toWkt();

//Serializing a Point geometry to WKB
var wkbBuffer = new wkx.Point(1, 2).toWkb();

//Serializing a Point geometry to EWKT
var ewktString = new wkx.Point(1, 2, undefined, undefined, 4326).toEwkt();

//Serializing a Point geometry to EWKB
var ewkbBuffer = new wkx.Point(1, 2, undefined, undefined, 4326).toEwkb();

//Serializing a Point geometry to TWKB
var twkbBuffer = new wkx.Point(1, 2).toTwkb();

//Serializing a Point geometry to GeoJSON
var geoJSONObject = new wkx.Point(1, 2).toGeoJSON();
```

Browser
-------

To use `wkx` in a webpage, simply copy a built browser version from `dist/` into your project, and use a `script` tag
to include it:
```html
<script src="wkx.js"></script>
```

If you use [browserify][] for your project, you can simply `npm install wkx --save`, and just require `wkx` as usual in
your code.

----

Regardless of which of the preceeding options you choose, using `wkx` in the browser will look the same:
```javascript
var wkx = require('wkx');

var geometry = wkx.Geometry.parse('POINT(1 2)');

console.log(geometry.toGeoJSON());
```

In addition to the `wkx` module, the browser versions also export `buffer`, which is useful for parsing WKB:
```javascript
var Buffer = require('buffer').Buffer;
var wkx = require('wkx');

var wkbBuffer = new Buffer('0101000000000000000000f03f0000000000000040', 'hex');
var geometry = wkx.Geometry.parse(wkbBuffer);

console.log(geometry.toGeoJSON());
```
[browserify]: http://browserify.org/
