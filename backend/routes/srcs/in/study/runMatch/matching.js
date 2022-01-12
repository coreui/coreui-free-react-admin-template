const { seniorForm, juniorForm } = require('../../../../Schemas/matching_form')
const xlsx = require('xlsx')
const munkres = require('munkres-js')

const cmp2arr = (a1, a2) => a1.filter((e) => a2.indexOf(e) >= 0).length
const matching = async (oPath) => {
  const seniorData = await seniorForm.find()
  const juniorData = await juniorForm.find()
  console.log(juniorData.length, seniorData.length)
  const numbers = seniorData.map((aSenior) => Number(aSenior.number))
  const score = seniorData.map(({ degree: sd, major: sm, school: ss }) => {
    return juniorData.map(
      ({ degree: jd, major: jm, school1: js1, school2: js2, school3: js3, hasPaper }) => {
        let score = 0
        let [s1, s2, s3] = [0, 0, 0]
        if (jd.includes('0') && sd === '0') {
          //MS
          if (js1.includes(ss)) s1 += 2 //學校1~3
          if (js2.includes(ss)) s2 += 2
          if (js3.includes(ss)) s3 += 2
          // if(cmp2arr(sm,jm)) score += 1 //領域
          // console.log(cmp2arr(sm, jm))
          score += cmp2arr(sm, jm) * 1
        }
        if (jd.includes('1') && sd === '1') {
          //PhD
          score += hasPaper //[0,2,4,6] for ['無論文經驗','已投稿但尚未公佈','已發表 1 篇','已發表 2 篇以上']
          // if(cmp2arr(sm,jm)) score += 4 //領域
          // console.log(cmp2arr(sm, jm))
          score += cmp2arr(sm, jm) * 4
          if (js1.includes(ss)) s1 += 1 //學校1~3
          if (js2.includes(ss)) s2 += 1
          if (js3.includes(ss)) s3 += 1
        }
        // acc.push(-score-s1,-score-s2,-score-s3)
        return [-score - s1, -score - s2, -score - s3] //因為是找最小cost，所以負號
      },
    )
  })

  const finalResult = []
  for (let i = 0; i < 3; i++) {
    //最多配對3次
    const seniorInv = numbers.map((e, i) => (e > 0 ? i : '')).filter(String)
    const score1 = score
      .map((jus) => {
        return jus.map((abc) => Math.min(...abc)) //最小的score
        // .filter((e,i)=>juniorInv.includes(i))
      })
      .filter((e, i) => seniorInv.includes(i))
    // console.log(score1.length, score1[0].length)
    const result = munkres(score1)
    result.forEach(([se, ju]) => {
      if (score1[se][ju] !== 99) {
        //indexing
        const trueSe = seniorInv[se]
        const abc = score[trueSe][ju]
        const minScore = Math.min(...abc)
        const juSubIndex = abc.indexOf(minScore)
        //record matched
        numbers[trueSe] = numbers[trueSe] - 1
        finalResult.push([trueSe, ju, juSubIndex, minScore])
        //fix score 避免重複配對
        score[trueSe][ju] = [99, 99, 99]
        score.forEach((e, i) => {
          score[i][ju][juSubIndex] = 99
        })
      } else console.log('99:', se, ju)
    })
  }
  console.log(
    finalResult.sort(([a1, a2, a3], [b1, b2, b3]) => {
      if (a2 > b2) return 1
      if (a2 < b2) return -1
      if (a3 > b3) return 1
      if (a3 < b3) return -1
      return 0
    }),
  )

  let matchedJunior = []
  let sjPair = []
  finalResult.forEach(([i, j, type, score], ind) => {
    const jRow = juniorData[j]
    if (!matchedJunior.includes(jRow.name)) {
      matchedJunior.push(jRow.name)
      sjPair.push([i, j])
    }
  })
  console.log(sjPair)
  sjPair.forEach(async ([i, j], ind) => {
    const sRow = seniorData[i]
    const jRow = juniorData[j]
    console.log(sRow.name + ' - ' + jRow.name)
    await juniorForm.updateOne({ _id: jRow._id }, { senior: sRow._id })
    const junior = (await seniorForm.findById(sRow.id)).junior
    if (!junior.includes(jRow.id)) {
      await seniorForm.updateOne({ _id: sRow._id }, { junior: [...junior, jRow._id] })
    }
  })
  /*
  //sheet
  const ws4 = xlsx.utils.aoa_to_sheet([['分數規則']])
  xlsx.utils.sheet_add_aoa(ws4, [['a,b,c代表\n夢幻,有把握,保底']], { origin: -1 }) //,{origin:`A${ind+2}`})
  xlsx.utils.sheet_add_aoa(ws4, [['MS\n同校2分\n同領域1分']], { origin: -1 }) //,{origin:`A${ind+2}`})
  xlsx.utils.sheet_add_aoa(ws4, [['PhD\n同領域4分\n論文0~3分\n同校1分']], { origin: -1 }) //,{origin:`A${ind+2}`})
  xlsx.utils.book_append_sheet(wb, ws4, '分數規則')

  //寫檔
  xlsx.writeFile(wb, oPath)
  */
}

module.exports = matching

// if(學長學弟都MS){
//     if(學校一樣) score += 2
//     if(領域一樣) score += 1
// }
// if(學長學弟都PhD){
//     if(有論文) score += 0~6 //[無論文經驗:0, 已投稿但尚未公佈:2, 已發表1篇:4, 已發表2篇以上:6]
//     if(領域一樣) score += 2
//     if(學校一樣) score += 1
// }
