const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')

const getForm = async (req, res) => {
  if (!req.session) {
    res.status(403).send('Not logged in')
  }
  const account = req.session.loginAccount
  let savedForm
  try {
    savedForm = await seniorForm.findOne({ account })
    if (savedForm) {
      res.status(201).send({ identity: 'senior', ...savedForm._doc })
    } else {
      savedForm = await juniorForm.findOne({ account })
      if (savedForm) {
        let degree
        if (savedForm.degree.includes('0') && savedForm.degree.includes('1')) degree = '2'
        else degree = savedForm.degree[0]
        res.status(201).send({ identity: 'junior', ...savedForm._doc, degree })
      } else {
        res.status(200).send({})
      }
    }
  } catch (err) {
    res.status(500).send('資料庫錯誤')
  }
}
// For test
const getAllForms = async (_, res) => {
  const juniorForms = await juniorForm.find()
  const seniorForms = await seniorForm.find()
  res.status(201).send({
    junior: juniorForms,
    senior: seniorForms,
    juniorCount: juniorForms.length,
    seniorCount: seniorForms.length,
  })
} //

const getMatchResult = async (req, res) => {
  const account = req.session.loginAccount
  let savedForm
  savedForm = await juniorForm.findOne({ account })
  if (!savedForm) {
    savedForm = await seniorForm.findOne({ account })
    if (!savedForm) res.status(404).send('form data not found')
    else {
      // senior's match result
      let matchResult = []
      for (jID of savedForm.junior) {
        const jData = await juniorForm.findById(jID)
        const { name, email, major } = jData
        matchResult.push({ name, email, major })
      }
      res.status(200).send(matchResult)
    }
  } else {
    // junior's match result
    const sID = savedForm.senior
    if (!sID) res.status(200).send({})
    const matchResult = await seniorForm.findById(sID)
    const { name, email, school, major } = matchResult
    res.status(200).send({ name, email, school, major })
  }
}

const GetForm = asyncHandler(getForm)
const GetAllForms = asyncHandler(getAllForms)
const MatchResult = asyncHandler(getMatchResult)
module.exports = { GetForm, GetAllForms, MatchResult }
