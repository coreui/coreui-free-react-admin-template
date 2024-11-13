module.exports = GeometryCollection;

var util = require('util');

var Types = require('./types');
var Geometry = require('./geometry');
var BinaryWriter = require('./binarywriter');

function GeometryCollection(geometries, srid) {
    Geometry.call(this);

    this.geometries = geometries || [];
	this.srid = srid;

    if (this.geometries.length > 0) {
        this.hasZ = this.geometries[0].hasZ;
        this.hasM = this.geometries[0].hasM;
    }
}

util.inherits(GeometryCollection, Geometry);

GeometryCollection.Z = function (geometries, srid) {
    var geometryCollection = new GeometryCollection(geometries, srid);
    geometryCollection.hasZ = true;
    return geometryCollection;
};

GeometryCollection.M = function (geometries, srid) {
    var geometryCollection = new GeometryCollection(geometries, srid);
    geometryCollection.hasM = true;
    return geometryCollection;
};

GeometryCollection.ZM = function (geometries, srid) {
    var geometryCollection = new GeometryCollection(geometries, srid);
    geometryCollection.hasZ = true;
    geometryCollection.hasM = true;
    return geometryCollection;
};

GeometryCollection._parseWkt = function (value, options) {
    var geometryCollection = new GeometryCollection();
    geometryCollection.srid = options.srid;
    geometryCollection.hasZ = options.hasZ;
    geometryCollection.hasM = options.hasM;

    if (value.isMatch(['EMPTY']))
        return geometryCollection;

    value.expectGroupStart();

    do {
        geometryCollection.geometries.push(Geometry.parse(value));
    } while (value.isMatch([',']));

    value.expectGroupEnd();

    return geometryCollection;
};

GeometryCollection._parseWkb = function (value, options) {
    var geometryCollection = new GeometryCollection();
    geometryCollection.srid = options.srid;
    geometryCollection.hasZ = options.hasZ;
    geometryCollection.hasM = options.hasM;

    var geometryCount = value.readUInt32();

    for (var i = 0; i < geometryCount; i++)
        geometryCollection.geometries.push(Geometry.parse(value, options));

    return geometryCollection;
};

GeometryCollection._parseTwkb = function (value, options) {
    var geometryCollection = new GeometryCollection();
    geometryCollection.hasZ = options.hasZ;
    geometryCollection.hasM = options.hasM;

    if (options.isEmpty)
        return geometryCollection;

    var geometryCount = value.readVarInt();

    for (var i = 0; i < geometryCount; i++)
        geometryCollection.geometries.push(Geometry.parseTwkb(value));

    return geometryCollection;
};

GeometryCollection._parseGeoJSON = function (value) {
    var geometryCollection = new GeometryCollection();

    for (var i = 0; i < value.geometries.length; i++)
        geometryCollection.geometries.push(Geometry._parseGeoJSON(value.geometries[i], true));

    if (geometryCollection.geometries.length > 0)
        geometryCollection.hasZ = geometryCollection.geometries[0].hasZ;

    return geometryCollection;
};

GeometryCollection.prototype.toWkt = function () {
    if (this.geometries.length === 0)
        return this._getWktType(Types.wkt.GeometryCollection, true);

    var wkt = this._getWktType(Types.wkt.GeometryCollection, false) + '(';

    for (var i = 0; i < this.geometries.length; i++)
        wkt += this.geometries[i].toWkt() + ',';

    wkt = wkt.slice(0, -1);
    wkt += ')';

    return wkt;
};

GeometryCollection.prototype.toWkb = function () {
    var wkb = new BinaryWriter(this._getWkbSize());

    wkb.writeInt8(1);

    this._writeWkbType(wkb, Types.wkb.GeometryCollection);
    wkb.writeUInt32LE(this.geometries.length);

    for (var i = 0; i < this.geometries.length; i++)
        wkb.writeBuffer(this.geometries[i].toWkb({ srid: this.srid }));

    return wkb.buffer;
};

GeometryCollection.prototype.toTwkb = function () {
    var twkb = new BinaryWriter(0, true);

    var precision = Geometry.getTwkbPrecision(5, 0, 0);
    var isEmpty = this.geometries.length === 0;

    this._writeTwkbHeader(twkb, Types.wkb.GeometryCollection, precision, isEmpty);

    if (this.geometries.length > 0) {
        twkb.writeVarInt(this.geometries.length);

        for (var i = 0; i < this.geometries.length; i++)
            twkb.writeBuffer(this.geometries[i].toTwkb());
    }

    return twkb.buffer;
};

GeometryCollection.prototype._getWkbSize = function () {
    var size = 1 + 4 + 4;

    for (var i = 0; i < this.geometries.length; i++)
        size += this.geometries[i]._getWkbSize();

    return size;
};

GeometryCollection.prototype.toGeoJSON = function (options) {
    var geoJSON = Geometry.prototype.toGeoJSON.call(this, options);
    geoJSON.type = Types.geoJSON.GeometryCollection;
    geoJSON.geometries = [];

    for (var i = 0; i < this.geometries.length; i++)
        geoJSON.geometries.push(this.geometries[i].toGeoJSON());

    return geoJSON;
};
