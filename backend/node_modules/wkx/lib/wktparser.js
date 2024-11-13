module.exports = WktParser;

var Types = require('./types');
var Point = require('./point');

function WktParser(value) {
    this.value = value;
    this.position = 0;
}

WktParser.prototype.match = function (tokens) {
    this.skipWhitespaces();

    for (var i = 0; i < tokens.length; i++) {
        if (this.value.substring(this.position).indexOf(tokens[i]) === 0) {
            this.position += tokens[i].length;
            return tokens[i];
        }
    }

    return null;
};

WktParser.prototype.matchRegex = function (tokens) {
    this.skipWhitespaces();

    for (var i = 0; i < tokens.length; i++) {
        var match = this.value.substring(this.position).match(tokens[i]);

        if (match) {
            this.position += match[0].length;
            return match;
        }
    }

    return null;
};

WktParser.prototype.isMatch = function (tokens) {
    this.skipWhitespaces();

    for (var i = 0; i < tokens.length; i++) {
        if (this.value.substring(this.position).indexOf(tokens[i]) === 0) {
            this.position += tokens[i].length;
            return true;
        }
    }

    return false;
};

WktParser.prototype.matchType = function () {
    var geometryType = this.match([Types.wkt.Point, Types.wkt.LineString, Types.wkt.Polygon, Types.wkt.MultiPoint,
    Types.wkt.MultiLineString, Types.wkt.MultiPolygon, Types.wkt.GeometryCollection]);

    if (!geometryType)
        throw new Error('Expected geometry type');

    return geometryType;
};

WktParser.prototype.matchDimension = function () {
    var dimension = this.match(['ZM', 'Z', 'M']);

    switch (dimension) {
        case 'ZM': return { hasZ: true, hasM: true };
        case 'Z': return { hasZ: true, hasM: false };
        case 'M': return { hasZ: false, hasM: true };
        default: return { hasZ: false, hasM: false };
    }
};

WktParser.prototype.expectGroupStart = function () {
    if (!this.isMatch(['(']))
        throw new Error('Expected group start');
};

WktParser.prototype.expectGroupEnd = function () {
    if (!this.isMatch([')']))
        throw new Error('Expected group end');
};

WktParser.prototype.matchCoordinate = function (options) {
    var match;

    if (options.hasZ && options.hasM)
        match = this.matchRegex([/^(\S*)\s+(\S*)\s+(\S*)\s+([^\s,)]*)/]);
    else if (options.hasZ || options.hasM)
        match = this.matchRegex([/^(\S*)\s+(\S*)\s+([^\s,)]*)/]);
    else
        match = this.matchRegex([/^(\S*)\s+([^\s,)]*)/]);

    if (!match)
        throw new Error('Expected coordinates');

    if (options.hasZ && options.hasM)
        return new Point(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]), parseFloat(match[4]));
    else if (options.hasZ)
        return new Point(parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3]));
    else if (options.hasM)
        return new Point(parseFloat(match[1]), parseFloat(match[2]), undefined, parseFloat(match[3]));
    else
        return new Point(parseFloat(match[1]), parseFloat(match[2]));
};

WktParser.prototype.matchCoordinates = function (options) {
    var coordinates = [];

    do {
        var startsWithBracket = this.isMatch(['(']);

        coordinates.push(this.matchCoordinate(options));

        if (startsWithBracket)
            this.expectGroupEnd();
    } while (this.isMatch([',']));

    return coordinates;
};

WktParser.prototype.skipWhitespaces = function () {
    while (this.position < this.value.length && this.value[this.position] === ' ')
        this.position++;
};
