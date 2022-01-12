const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sForm = new Schema({
  account: String,
  name: String,
  degree: String,
  major: [{ type: String }],
  gpa: String,
  email: String,
  number: String,
  admission: [{ type: String }],
  school: String,
  junior: [{ type: String }],
})

const jForm = new Schema({
  account: String,
  name: String,
  degree: [{ type: String }],
  hasPaper: String,
  major: [{ type: String }],
  gpa: String,
  email: String,
  studentID: String,
  school1: [{ type: String }],
  school2: [{ type: String }],
  school3: [{ type: String }],
  senior: String,
})

const seniorForm = mongoose.model('seniorForm', sForm)
const juniorForm = mongoose.model('juniorForm', jForm)
module.exports = { seniorForm, juniorForm }
