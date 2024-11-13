module.exports = Point;

var util = require('util');

var Geometry = require('./geometry');
var Types = require('./types');
var BinaryWriter = require('./binarywriter');
var ZigZag = require('./zigzag.js');

function Point(x, y, z, m, srid) {
    Geometry.call(this);

    this.x = x;
    this.y = y;
    this.z = z;
    this.m = m;
	this.srid = srid;

    this.hasZ = typeof this.z !== 'undefined';
    this.hasM = typeof this.m !== 'undefined';
}

util.inherits(Point, Geometry);

Point.Z = function (x, y, z, srid) {
    var point = new Point(x, y, z, undefined, srid);
    point.hasZ = true;
    return point;
};

Point.M = function (x, y, m, srid) {
    var point = new Point(x, y, undefined, m, srid);
    point.hasM = true;
    return point;
};

Point.ZM = function (x, y, z, m, srid) {
    var point = new Point(x, y, z, m, srid);
    point.hasZ = true;
    point.hasM = true;
    return point;
};

Point._parseWkt = function (value, options) {
    var point = new Point();
    point.srid = options.srid;
    point.hasZ = options.hasZ;
    point.hasM = options.hasM;

    if (value.isMatch(['EMPTY']))
        return point;

    value.expectGroupStart();

    var coordinate = value.matchCoordinate(options);

    point.x = coordinate.x;
    point.y = coordinate.y;
    point.z = coordinate.z;
    point.m = coordinate.m;

    value.expectGroupEnd();

    return point;
};

Point._parseWkb = function (value, options) {
    var point = Point._readWkbPoint(value, options);
    point.srid = options.srid;
    return point;
};

Point._readWkbPoint = function (value, options) {
    return new Point(value.readDouble(), value.readDouble(),
        options.hasZ ? value.readDouble() : undefined,
        options.hasM ? value.readDouble() : undefined);
};

Point._parseTwkb = function (value, options) {
    var point = new Point();
    point.hasZ = options.hasZ;
    point.hasM = options.hasM;

    if (options.isEmpty)
        return point;

    point.x = ZigZag.decode(value.readVarInt()) / options.precisionFactor;
    point.y = ZigZag.decode(value.readVarInt()) / options.precisionFactor;
    point.z = options.hasZ ? ZigZag.decode(value.readVarInt()) / options.zPrecisionFactor : undefined;
    point.m = options.hasM ? ZigZag.decode(value.readVarInt()) / options.mPrecisionFactor : undefined;

    return point;
};

Point._readTwkbPoint = function (value, options, previousPoint) {
    previousPoint.x += ZigZag.decode(value.readVarInt()) / options.precisionFactor;
    previousPoint.y += ZigZag.decode(value.readVarInt()) / options.precisionFactor;

    if (options.hasZ)
        previousPoint.z += ZigZag.decode(value.readVarInt()) / options.zPrecisionFactor;
    if (options.hasM)
        previousPoint.m += ZigZag.decode(value.readVarInt()) / options.mPrecisionFactor;

    return new Point(previousPoint.x, previousPoint.y, previousPoint.z, previousPoint.m);
};

Point._parseGeoJSON = function (value) {
    return Point._readGeoJSONPoint(value.coordinates);
};

Point._readGeoJSONPoint = function (coordinates) {
    if (coordinates.length === 0)
        return new Point();

    if (coordinates.length > 2)
        return new Point(coordinates[0], coordinates[1], coordinates[2]);

    return new Point(coordinates[0], coordinates[1]);
};

Point.prototype.toWkt = function () {
    if (typeof this.x === 'undefined' && typeof this.y === 'undefined' &&
        typeof this.z === 'undefined' && typeof this.m === 'undefined')
        return this._getWktType(Types.wkt.Point, true);

    return this._getWktType(Types.wkt.Point, false) + '(' + this._getWktCoordinate(this) + ')';
};

Point.prototype.toWkb = function (parentOptions) {
    var wkb = new BinaryWriter(this._getWkbSize());

    wkb.writeInt8(1);
    this._writeWkbType(wkb, Types.wkb.Point, parentOptions);

    if (typeof this.x === 'undefined' && typeof this.y === 'undefined') {
        wkb.writeDoubleLE(NaN);
        wkb.writeDoubleLE(NaN);

        if (this.hasZ)
            wkb.writeDoubleLE(NaN);
        if (this.hasM)
            wkb.writeDoubleLE(NaN);
    }
    else {
        this._writeWkbPoint(wkb);
    }

    return wkb.buffer;
};

Point.prototype._writeWkbPoint = function (wkb) {
    wkb.writeDoubleLE(this.x);
    wkb.writeDoubleLE(this.y);

    if (this.hasZ)
        wkb.writeDoubleLE(this.z);
    if (this.hasM)
        wkb.writeDoubleLE(this.m);
};

Point.prototype.toTwkb = function () {
    var twkb = new BinaryWriter(0, true);

    var precision = Geometry.getTwkbPrecision(5, 0, 0);
    var isEmpty = typeof this.x === 'undefined' && typeof this.y === 'undefined';

    this._writeTwkbHeader(twkb, Types.wkb.Point, precision, isEmpty);

    if (!isEmpty)
        this._writeTwkbPoint(twkb, precision, new Point(0, 0, 0, 0));

    return twkb.buffer;
};

Point.prototype._writeTwkbPoint = function (twkb, precision, previousPoint) {
    var x = this.x * precision.xyFactor;
    var y = this.y * precision.xyFactor;
    var z = this.z * precision.zFactor;
    var m = this.m * precision.mFactor;

    twkb.writeVarInt(ZigZag.encode(x - previousPoint.x));
    twkb.writeVarInt(ZigZag.encode(y - previousPoint.y));
    if (this.hasZ)
        twkb.writeVarInt(ZigZag.encode(z - previousPoint.z));
    if (this.hasM)
        twkb.writeVarInt(ZigZag.encode(m - previousPoint.m));

    previousPoint.x = x;
    previousPoint.y = y;
    previousPoint.z = z;
    previousPoint.m = m;
};

Point.prototype._getWkbSize = function () {
    var size = 1 + 4 + 8 + 8;

    if (this.hasZ)
        size += 8;
    if (this.hasM)
        size += 8;

    return size;
};

Point.prototype.toGeoJSON = function (options) {
    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
    geoJSON.type = Types.geoJSON.Point;

    if (typeof this.x === 'undefined' && typeof this.y === 'undefined')
        geoJSON.coordinates = [];
    else if (typeof this.z !== 'undefined')
        geoJSON.coordinates = [this.x, this.y, this.z];
    else
        geoJSON.coordinates = [this.x, this.y];

    return geoJSON;
};
