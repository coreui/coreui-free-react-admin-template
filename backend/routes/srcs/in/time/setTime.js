const Time = require('../../../Schemas/time')
const asyncHandler = require('express-async-handler')
const { dbCatch } = require('../../../error')

const setTime = async (req, res) => {
  const { target, time } = req.body
  try {
    const prevTime = await Time.findOne({ target }).catch(dbCatch)
    if (prevTime) await Time.updateOne({ target }, { target, time }).catch(dbCatch)
    else await new Time({ target, time }).save().catch(dbCatch)
    res.status(200).send(`successfully set ${target} at ${time}`)
  } catch (error) {
    res.status(403).send('Encounter error when settinng time: ' + err)
  }
}
module.exports = asyncHandler(setTime)
