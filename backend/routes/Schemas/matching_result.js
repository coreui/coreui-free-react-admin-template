const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Matching_Schema = new Schema({
    name1: String,
    email1: String,
    name2: String,
    Id2: String,
    email2: String
})

module.exports = mongoose.model('matching_result', Matching_Schema);
