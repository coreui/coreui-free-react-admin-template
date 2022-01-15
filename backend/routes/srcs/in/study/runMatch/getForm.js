const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')
const user_login = require('../../../../Schemas/user_visual_new')

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
        const { name, email, major, account: jAccount } = jData
        const jImage = await user_login.findOne({ account: jAccount })
        let image = 'default'
        if (jImage && jImage.imgSrc) image = jImage.imgSrc
        matchResult.push({ name, email, major, identity: 'junior', image })
      }
      if (!matchResult.length) res.status(200).send('unmatched')
      else res.status(200).send(matchResult)
    }
  } else {
    // junior's match result
    const sID = savedForm.senior
    if (!sID) {
      res.status(200).send('unmatched')
      return
    }
    const matchResult = await seniorForm.findById(sID)
    const { name, email, school, major, gpa, account: sAccount } = matchResult
    const sImage = await user_login.findOne({ account: sAccount })
    let image = 'default'
    if (sImage && sImage.imgSrc) image = sImage.imgSrc
    res.status(200).send({ name, email, school, major, gpa, identity: 'senior', image })
  }
}

const GetForm = asyncHandler(getForm)
const GetAllForms = asyncHandler(getAllForms)
const MatchResult = asyncHandler(getMatchResult)
module.exports = { GetForm, GetAllForms, MatchResult }
