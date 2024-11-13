module.exports = BinaryReader;

function BinaryReader(buffer, isBigEndian) {
    this.buffer = buffer;
    this.position = 0;
    this.isBigEndian = isBigEndian || false;
}

function _read(readLE, readBE, size) {
    return function () {
        var value;

        if (this.isBigEndian)
            value = readBE.call(this.buffer, this.position);
        else
            value = readLE.call(this.buffer, this.position);

        this.position += size;

        return value;
    };
}

BinaryReader.prototype.readUInt8 = _read(Buffer.prototype.readUInt8, Buffer.prototype.readUInt8, 1);
BinaryReader.prototype.readUInt16 = _read(Buffer.prototype.readUInt16LE, Buffer.prototype.readUInt16BE, 2);
BinaryReader.prototype.readUInt32 = _read(Buffer.prototype.readUInt32LE, Buffer.prototype.readUInt32BE, 4);
BinaryReader.prototype.readInt8 = _read(Buffer.prototype.readInt8, Buffer.prototype.readInt8, 1);
BinaryReader.prototype.readInt16 = _read(Buffer.prototype.readInt16LE, Buffer.prototype.readInt16BE, 2);
BinaryReader.prototype.readInt32 = _read(Buffer.prototype.readInt32LE, Buffer.prototype.readInt32BE, 4);
BinaryReader.prototype.readFloat = _read(Buffer.prototype.readFloatLE, Buffer.prototype.readFloatBE, 4);
BinaryReader.prototype.readDouble = _read(Buffer.prototype.readDoubleLE, Buffer.prototype.readDoubleBE, 8);

BinaryReader.prototype.readVarInt = function () {
    var nextByte,
        result = 0,
        bytesRead = 0;

    do {
        nextByte = this.buffer[this.position + bytesRead];
        result += (nextByte & 0x7F) << (7 * bytesRead);
        bytesRead++;
    } while (nextByte >= 0x80);

    this.position += bytesRead;

    return result;
};
