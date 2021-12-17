const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sForm = new Schema({
  name: String,
  major: [{ type: String }],
  email: String,
  number: Number,
  school: [{ type: String }],
  admission: String,
})

const jForm = new Schema({
  name: String,
  degree: String,
  hasPaper: Boolean,
  major: [{ type: String }],
  email: String,
  account: String,
  school1: String,
  school2: String,
  school3: String,
})

const seniorForm = mongoose.model('seniorForm', sForm)
const juniorForm = mongoose.model('juniorForm', jForm)
module.exports = { seniorForm, juniorForm }
