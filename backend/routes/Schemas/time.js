const mongoose = require('mongoose'),
  Schema = mongoose.Schema

const Time_Schema = new Schema({
  time: { required: true, type: Date },
  target: { required: true, type: String },
})

module.exports = mongoose.model('Time', Time_Schema)
