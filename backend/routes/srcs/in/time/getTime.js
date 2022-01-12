const Time = require('../../../Schemas/time')
const asyncHandler = require('express-async-handler')

const getTime = async (req, res) => {
  const { target } = req.body
  try {
    const date = await Time.find({ target })
    if (date) res.status(200).send(date)
    else res.status(404).send(`Can't find date of ${target} in db`)
  } catch (error) {
    res.status(403).send('Encounter error when searching date: ' + err)
  }
}
module.exports = asyncHandler(getTime)
