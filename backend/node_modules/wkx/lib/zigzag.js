module.exports = {
    encode: function (value) {
        return (value << 1) ^ (value >> 31);
    },
    decode: function (value) {
        return (value >> 1) ^ (-(value & 1));
    }
};
