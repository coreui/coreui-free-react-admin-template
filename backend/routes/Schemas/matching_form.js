const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sForm = new Schema({
  account: String,
  name: String,
  degree: Number,
  major: String,
  gpa: Number,
  email: String,
  number: Number,
  admission: [{ type: String }],
  school: String,
})

const jForm = new Schema({
  account: String,
  name: String,
  degree: [{ type: Number }],
  hasPaper: Number,
  major: [{ type: String }],
  gpa: Number,
  email: String,
  studentID: String,
  school1: [{ type: String }],
  school2: [{ type: String }],
  school3: [{ type: String }],
})

const seniorForm = mongoose.model('seniorForm', sForm)
const juniorForm = mongoose.model('juniorForm', jForm)
module.exports = { seniorForm, juniorForm }
