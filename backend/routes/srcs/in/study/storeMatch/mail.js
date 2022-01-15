const readXlsxFile = require('read-excel-file/node')
const sendmails = require('./sendmails')
const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')

parseXls = async (filePath, keys) => {
  const rows = await readXlsxFile(filePath, { sheet: 1 })
  const indexs = keys.map(({ chin, ...props }) => {
    const index = rows[0].indexOf(chin)
    return { index, ...props }
  })
  return rows.slice(1).map((data) => {
    output = {}
    indexs.forEach(({ key, index, splitBy, first }) => {
      if (index == -1) return (output[key] = null)
      let value = data[index]
      if (splitBy !== undefined) value = value.split(splitBy).map((s) => s.trim())
      else if (first !== undefined) value = value.split(first)[0]
      output[key] = value
    })
    return output
  })
}
const rKeys = [
  { key: 'sname', chin: '學長姊姓名' },
  { key: 'sSchool', chin: '學長姊學校' },
  { key: 'smail', chin: '學長姊信箱' },
  { key: 'jname', chin: '學弟妹姓名' },
  { key: 'account', chin: '學弟妹學號' },
  { key: 'jmail', chin: '學弟妹信箱' },
  { key: 'major', chin: '學弟妹領域' },
]

const post = async (filepath) => {
  console.log('start')
  const resultData = await parseXls(filepath, rKeys)
  const juniorData = [] //[{ jname, sen:[{sname,sSchool,smail      }...] }...]
  const seniorData = [] //[{ sname, jun:[{jname,account,jmail,major}...] }...]
  resultData.forEach(async (data) => {
    const { sname, sSchool, smail, jname, account, jmail, major } = data
    const sInd = seniorData.findIndex(({ sname: sm }) => sm === sname)
    if (sInd === -1) seniorData.push({ sname, smail, jun: [{ jname, account, jmail, major }] })
    else seniorData[sInd].jun.push({ jname, account, jmail, major })
    const jInd = juniorData.findIndex(({ jname: jm }) => jm === jname)
    if (jInd === -1) juniorData.push({ jname, jmail, sen: [{ sname, sSchool, smail }] })
    else juniorData[jInd].sen.push({ sname, sSchool, smail })
    let s = await seniorForm.findOne({ name: sname, email: smail })
    let j = await juniorForm.findOne({ name: jname, email: jmail })
    await juniorForm.updateOne({ _id: j._id }, { senior: s._id })
    const junior = (await seniorForm.findById(s._id)).junior
    if (!junior.includes(j._id)) {
      await seniorForm.updateOne({ _id: s._id }, { junior: [...junior, j._id] })
    }
  })

  // const unPairS = seniorForm.find({ junior: [] })
  // const unPairJ = juniorForm.find({ senior: '' })

  // unPairJ.forEach(async (j) => {
  //   juniorForm.updateOne({ _id: j._id }, { senior: '抱歉，沒有配對到適合的學長姊' })
  // })
  // unPairS.forEach(async (s) => {
  //   seniorForm.updateOne({ _id: s._id }, { junior: ['抱歉，沒有配對到適合的學弟妹'] })
  // })

  const errors = await sendmails(seniorData, juniorData)
  if (!errors) console.log('no errors')
  else console.log('errors', errors)
  return errors
}

module.exports = post
