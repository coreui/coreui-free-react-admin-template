const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Study_Schema = new Schema({
    senior: String,
    junior: String,
    year: { type: Number, default: new Date().getFullYear() },
    publishTime: { type: Date },
    note: String
})

module.exports = mongoose.model('Study_Link', Study_Schema);

