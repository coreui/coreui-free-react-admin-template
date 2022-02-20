const template2senior = require('./mail/senior')
const template2junior = require('./mail/junior')
const sendmail = require('../../../../middleware/mail')

const toSenior = async (data) => {
  //{sname,smail,jun:[{jname,account,jmail,major}]}
  const mail_to_senior = await template2senior(data)
  await sendmail(data.smail, '留學配對結果', mail_to_senior)
}
const toJunior = async (data) => {
  //{jname,jmail,sen:[{sname,sSchool,smail}]}
  const mail_to_junior = await template2junior(data)
  await sendmail(data.jmail, '留學配對結果', mail_to_junior)
}

const toAdmin = async (filepath) => {
  await sendmail('ntueeplus2020@gmail.com', '留學配對結果', '', filepath)
}

const sendmails = async (seniorData, juniorData, filepath) => {
  //Error Handling
  errors = []
  const sent = [] //for skip
  const promises1 = seniorData.map(async (data) => {
    try {
      if (sent.includes(data.sname)) return
      await toSenior(data)
    } catch {
      errors.push(data.sname)
    }
  })
  const promises2 = juniorData.map(async (data) => {
    try {
      if (sent.includes(data.jname)) return
      await toJunior(data)
    } catch {
      errors.push(data.jname)
    }
  })
  const promises3 = [1].map(async () => {
    try {
      await toAdmin(filepath)
    } catch {
      errors.push('admin')
    }
  })
  await Promise.all([...promises1, ...promises2])
  await Promise.all([...promises3])
  console.log(errors)
  return errors
}

module.exports = sendmails
