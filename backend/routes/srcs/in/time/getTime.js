const Time = require('../../../Schemas/time')
const asyncHandler = require('express-async-handler')

const getTime = async (req, res) => {
  const { target } = req.query
  try {
    const date = await Time.findOne({ target })
    if (date)
      res
        .status(200)
        .send(
          date.time.toISOString().substring(0, 10) +
            '-' +
            date.time.toISOString().substring(11, 16),
        )
    else res.status(404).send(`Can't find date of ${target} in db`)
  } catch (error) {
    res.status(403).send('Encounter error when searching date: ' + error)
  }
}
module.exports = asyncHandler(getTime)
