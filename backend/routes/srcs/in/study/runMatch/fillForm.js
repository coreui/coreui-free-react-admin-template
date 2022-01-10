const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')

const fillForm = async (req, res) => {
  const { identity } = req.body
  try {
    if (identity === 'senior') {
      const account = req.session.loginAccount
      const { name, degree, major, gpa, email, number, school, admission } = req.body
      const oldForm = await seniorForm.findOne({ account })
      if (oldForm)
        await seniorForm.updateOne(
          { account },
          {
            name,
            degree,
            major,
            gpa,
            email,
            number,
            school,
            admission: JSON.parse(admission),
          },
        )
      else {
        await new seniorForm({
          account,
          name,
          degree,
          major,
          gpa,
          email,
          number,
          school,
          admission: JSON.parse(admission),
        }).save()
      }
    } else if (identity === 'junior') {
      const account = req.session.loginAccount
      const { name, degree, hasPaper, major, gpa, email, studentID, school1, school2, school3 } =
        req.body
      const oldForm = await juniorForm.findOne({ account })
      if (oldForm) {
        await juniorForm.updateOne(
          { account },
          {
            name,
            degree: JSON.parse(degree),
            hasPaper,
            major: JSON.parse(major),
            gpa,
            email,
            studentID,
            school1: JSON.parse(school1),
            school2: JSON.parse(school2),
            school3: JSON.parse(school3),
          },
        )
      } else {
        await new juniorForm({
          account,
          name,
          degree: JSON.parse(degree),
          hasPaper,
          major: JSON.parse(major),
          gpa,
          email,
          studentID,
          school1: JSON.parse(school1),
          school2: JSON.parse(school2),
          school3: JSON.parse(school3),
        }).save()
      }
    }
    res.status(200).send('Form saved!')
  } catch (err) {
    res.status(403).send('Encounter error when filling forms: ' + err)
  }
}

module.exports = asyncHandler(fillForm)
