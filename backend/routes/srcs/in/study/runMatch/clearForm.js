const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')
const req = require('express/lib/request')

const clearForm = async (_, res) => {
  try {
    await seniorForm.deleteMany()
    await juniorForm.deleteMany()
    res.status(200).send('資料庫已清空')
  } catch (err) {
    res.status(500).send('資料庫錯誤')
  }
}

module.exports = asyncHandler(clearForm)
