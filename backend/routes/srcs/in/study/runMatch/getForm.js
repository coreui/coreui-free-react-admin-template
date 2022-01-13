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
        res.status(201).send({ identity: 'junior', ...savedForm._doc })
      } else {
        res.status(200).send({})
      }
    }
  } catch (err) {
    res.status(500).send('資料庫錯誤')
  }
}

module.exports = asyncHandler(getForm)
