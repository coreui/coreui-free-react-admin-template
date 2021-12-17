const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')

const fillForm = async (req, res) => {
  const { identity } = req.body
  try {
    if (identity === 'senior') {
      const { studentID, name, major, email, number, school, admission } = req.body
      const oldForm = await seniorForm.find({ studentID })
      if (oldForm)
        await seniorForm.updateOne(
          { studentID },
          {
            name,
            major,
            email,
            number,
            school,
            admission,
          },
        )
      else {
        await new seniorForm({
          studentID,
          name,
          major,
          email,
          number,
          school,
          admission,
        }).save()
      }
    } else if (identity === 'junior') {
      const {
        studentID,
        name,
        degree,
        hasPaper,
        major,
        email,
        account,
        school1,
        school2,
        school3,
      } = req.body
      const oldForm = await juniorForm.find({ studentID })
      if (oldForm)
        await juniorForm.updateOne(
          { studentID },
          {
            name,
            degree,
            hasPaper,
            major,
            email,
            account,
            school1,
            school2,
            school3,
          },
        )
      else {
        await new juniorForm({
          studentID,
          name,
          degree,
          hasPaper,
          major,
          email,
          account,
          school1,
          school2,
          school3,
        }).save()
      }
    }
    res.status(200).send('Form saved!')
  } catch (err) {
    res.status(403).send('Encounter error when filling forms: ' + err)
  }
}

module.exports = asyncHandler(fillForm)
