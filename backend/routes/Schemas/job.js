const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Job_Schema = new Schema({
    ID : String,
	title : String,
	subtitle: String,
	description: String
})

module.exports = mongoose.model('Job',Job_Schema);
