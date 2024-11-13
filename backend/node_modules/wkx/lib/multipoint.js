module.exports = MultiPoint;

var util = require('util');

var Types = require('./types');
var Geometry = require('./geometry');
var Point = require('./point');
var BinaryWriter = require('./binarywriter');

function MultiPoint(points, srid) {
    Geometry.call(this);

    this.points = points || [];
	this.srid = srid;
	
    if (this.points.length > 0) {
        this.hasZ = this.points[0].hasZ;
        this.hasM = this.points[0].hasM;
    }
}

util.inherits(MultiPoint, Geometry);

MultiPoint.Z = function (points, srid) {
    var multiPoint = new MultiPoint(points, srid);
    multiPoint.hasZ = true;
    return multiPoint;
};

MultiPoint.M = function (points, srid) {
    var multiPoint = new MultiPoint(points, srid);
    multiPoint.hasM = true;
    return multiPoint;
};

MultiPoint.ZM = function (points, srid) {
    var multiPoint = new MultiPoint(points, srid);
    multiPoint.hasZ = true;
    multiPoint.hasM = true;
    return multiPoint;
};

MultiPoint._parseWkt = function (value, options) {
    var multiPoint = new MultiPoint();
    multiPoint.srid = options.srid;
    multiPoint.hasZ = options.hasZ;
    multiPoint.hasM = options.hasM;

    if (value.isMatch(['EMPTY']))
        return multiPoint;

    value.expectGroupStart();
    multiPoint.points.push.apply(multiPoint.points, value.matchCoordinates(options));
    value.expectGroupEnd();

    return multiPoint;
};

MultiPoint._parseWkb = function (value, options) {
    var multiPoint = new MultiPoint();
    multiPoint.srid = options.srid;
    multiPoint.hasZ = options.hasZ;
    multiPoint.hasM = options.hasM;

    var pointCount = value.readUInt32();

    for (var i = 0; i < pointCount; i++)
        multiPoint.points.push(Geometry.parse(value, options));

    return multiPoint;
};

MultiPoint._parseTwkb = function (value, options) {
    var multiPoint = new MultiPoint();
    multiPoint.hasZ = options.hasZ;
    multiPoint.hasM = options.hasM;

    if (options.isEmpty)
        return multiPoint;

    var previousPoint = new Point(0, 0, options.hasZ ? 0 : undefined, options.hasM ? 0 : undefined);
    var pointCount = value.readVarInt();

    for (var i = 0; i < pointCount; i++)
        multiPoint.points.push(Point._readTwkbPoint(value, options, previousPoint));

    return multiPoint;
};

MultiPoint._parseGeoJSON = function (value) {
    var multiPoint = new MultiPoint();

    if (value.coordinates.length > 0)
        multiPoint.hasZ = value.coordinates[0].length > 2;

    for (var i = 0; i < value.coordinates.length; i++)
        multiPoint.points.push(Point._parseGeoJSON({ coordinates: value.coordinates[i] }));

    return multiPoint;
};

MultiPoint.prototype.toWkt = function () {
    if (this.points.length === 0)
        return this._getWktType(Types.wkt.MultiPoint, true);

    var wkt = this._getWktType(Types.wkt.MultiPoint, false) + '(';

    for (var i = 0; i < this.points.length; i++)
        wkt += this._getWktCoordinate(this.points[i]) + ',';

    wkt = wkt.slice(0, -1);
    wkt += ')';

    return wkt;
};

MultiPoint.prototype.toWkb = function () {
    var wkb = new BinaryWriter(this._getWkbSize());

    wkb.writeInt8(1);

    this._writeWkbType(wkb, Types.wkb.MultiPoint);
    wkb.writeUInt32LE(this.points.length);

    for (var i = 0; i < this.points.length; i++)
        wkb.writeBuffer(this.points[i].toWkb({ srid: this.srid }));

    return wkb.buffer;
};

MultiPoint.prototype.toTwkb = function () {
    var twkb = new BinaryWriter(0, true);

    var precision = Geometry.getTwkbPrecision(5, 0, 0);
    var isEmpty = this.points.length === 0;

    this._writeTwkbHeader(twkb, Types.wkb.MultiPoint, precision, isEmpty);

    if (this.points.length > 0) {
        twkb.writeVarInt(this.points.length);

        var previousPoint = new Point(0, 0, 0, 0);
        for (var i = 0; i < this.points.length; i++)
            this.points[i]._writeTwkbPoint(twkb, precision, previousPoint);
    }

    return twkb.buffer;
};

MultiPoint.prototype._getWkbSize = function () {
    var coordinateSize = 16;

    if (this.hasZ)
        coordinateSize += 8;
    if (this.hasM)
        coordinateSize += 8;

    coordinateSize += 5;

    return 1 + 4 + 4 + (this.points.length * coordinateSize);
};

MultiPoint.prototype.toGeoJSON = function (options) {
    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
    geoJSON.type = Types.geoJSON.MultiPoint;
    geoJSON.coordinates = [];

    for (var i = 0; i < this.points.length; i++)
        geoJSON.coordinates.push(this.points[i].toGeoJSON().coordinates);

    return geoJSON;
};
