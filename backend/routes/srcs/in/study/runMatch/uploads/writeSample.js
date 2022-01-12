const mongoose = require('../../../../../Schemas/db')
const { seniorForm, juniorForm } = require('../../../../../Schemas/matching_form')
const readXlsxFile = require('read-excel-file/node')

mongoose.connection.on('open', async () => {
  await main()
})
const parseXls = async (filePath, keys) => {
  const rows = await readXlsxFile(filePath)
  const indexs = keys.map(({ chin, ...props }) => {
    const index = rows[0].indexOf(chin)
    return { index, ...props }
  })
  return rows.slice(1).map((data) => {
    output = {}
    indexs.forEach(({ key, index, splitBy: sb, first }) => {
      if (index == -1) return (output[key] = null)
      let value = data[index]
      if (sb !== undefined) {
        try {
          value = value.split(sb).map((s) => s.trim().toLowerCase()) //, console.log(value)
        } catch {
          value = []
        }
      } else if (first !== undefined) value = value.split(first)[0].trim().toLowerCase() //, console.log(value)
      output[key] = value
    })
    return output
  })
}
const splitBy = /,|\+|\//
const sKeys = [
  { key: 'name', chin: '姓名' },
  // {key:'degree',chin:'學位',splitBy:' + '},
  { key: 'major', chin: '領域', splitBy: ',' },
  { key: 'email', chin: '電子郵件地址' },
  { key: 'number', chin: '今年願意接受多少位學弟妹諮詢？' },
  { key: 'gpa', chin: 'GPA' },
  { key: 'school', chin: '最終決定去的學校', splitBy: '/' },
  { key: 'admin', chin: '錄取結果(Admissions)' },
]
const jKeys = [
  { key: 'name', chin: '姓名' },
  { key: 'degree', chin: '欲申請學位', splitBy: ' + ' },
  // { key: 'degree', chin: '學位', splitBy },
  { key: 'hasPaper', chin: '申請時是否已發表論文' },
  { key: 'major', chin: '欲申請的研究領域（可多選）', splitBy: ', ' },
  { key: 'gpa', chin: 'GPA' },
  { key: 'email', chin: '您的Email (必填)' },
  { key: 'account', chin: '學號' },
  { key: 'school', chin: '1. 希望就讀學校之 夢幻學校', splitBy },
  { key: 'school2', chin: '2. 希望就讀學校之 有把握學校', splitBy },
  { key: 'school3', chin: '3. 希望就讀學校之 保底學校', splitBy },
]

const transJunior = (data) => {
  return data.map(({ school, school2, school3, hasPaper, degree, ...restData }) => {
    if (school[0].includes('無')) school = []
    if (school2[0].includes('無')) school2 = []
    if (school3[0].includes('無')) school3 = []
    newgree = []
    if (degree.includes('ms.')) newgree.push(0)
    if (degree.includes('ph.d.')) newgree.push(1)
    // if(degree.includes('ms')) newgree.push(0)
    // if(degree.includes('phd')) newgree.push(1)
    hasPaper = ['無論文經驗', '已投稿但尚未公佈', '已發表 1 篇', '已發表 2 篇以上'].indexOf(
      hasPaper,
    )
    return { school, school2, school3, hasPaper, degree: newgree, ...restData }
  })
}
const transSenior = (data) => {
  const extra = []
  return [
    data.map(({ school, admin, gpa, number, name, ...restData }) => {
      let degree = -1
      if (school.includes('ms') || school.includes('meng')) degree = 0
      if (school.includes('phd')) degree = 1
      if (degree === -1) {
        number = 0
        extra.push(name)
        console.log(`請人工配對：${name}${degree}`)
      }
      return { degree, school: school[0], gpa, number, name, ...restData }
    }),
    extra,
  ]
}
const main = async () => {
  const seniorSampleRaw = await parseXls('./senior_2021v2.xlsx', sKeys)
  const juniorSampleRaw = await parseXls('./junior_2021v2.xlsx', jKeys)
  const [seniorSampleData, extra] = transSenior(seniorSampleRaw)
  const juniorSampleData = transJunior(juniorSampleRaw)
  seniorSampleData.forEach(async ({ degree, school, gpa, number, name, major, email }) => {
    const exist = await seniorForm.findOne({ name })
    if (!exist) {
      await new seniorForm({
        name,
        degree: String(degree),
        school,
        gpa: String(gpa),
        number: String(number),
        major,
        email,
        admission: [],
      }).save()
    }
  })
  juniorSampleData.forEach(
    async ({ school, school2, school3, hasPaper, degree, name, major, gpa, email, account }) => {
      const exist = await juniorForm.findOne({ studentID: account })
      if (!exist) {
        await new juniorForm({
          name,
          degree: degree.map((a) => {
            return String(a)
          }),
          hasPaper: String(hasPaper),
          major,
          gpa: String(gpa),
          email,
          studentID: account,
          school1: school,
          school2,
          school3,
        }).save()
      }
    },
  ),
    console.log('Sample data inserted to db!')
}
