const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const asyncHandler = require('express-async-handler')

const fillForm = async (req, res) => {
  const { identity } = req.body
  try {
    if (identity === 'senior') {
      const account = req.session.loginAccount
      const { name, degree, major, gpa, email, number, school, admission } = req.body
      if (!name || !email || !number || !school) {
        res.status(403).send('Required field found empty!')
      }
      const oldForm = await seniorForm.findOne({ account })
      if (oldForm) {
        try {
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
              admission,
            },
          )
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await new seniorForm({
            account,
            name,
            degree,
            major,
            gpa,
            email,
            number,
            school,
            admission,
          }).save()
        } catch (error) {
          console.log(error)
        }
      }
    } else if (identity === 'junior') {
      const account = req.session.loginAccount
      const { name, degree, hasPaper, major, gpa, email, studentID, school1, school2, school3 } =
        req.body
      if (!name || !major.length || !email || !studentID || !degree) {
        res.status(403).send('Required field found empty!')
      }
      let _degree
      if (degree === '0') _degree = ['0']
      if (degree === '1') _degree = ['1']
      if (degree === '2') _degree = ['0', '1']
      const oldForm = await juniorForm.findOne({ account })
      if (oldForm) {
        try {
          await juniorForm.updateOne(
            { account },
            {
              name,
              degree: _degree,
              hasPaper,
              major,
              gpa,
              email,
              studentID,
              school1,
              school2,
              school3,
            },
          )
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          await new juniorForm({
            account,
            name,
            degree: _degree,
            hasPaper,
            major,
            gpa,
            email,
            studentID,
            school1,
            school2,
            school3,
          }).save()
        } catch (error) {
          console.log(error)
        }
      }
    }
    res.status(200).send('Form saved!')
  } catch (err) {
    res.status(403).send('Encounter error when filling forms: ' + err)
  }
}

module.exports = asyncHandler(fillForm)
