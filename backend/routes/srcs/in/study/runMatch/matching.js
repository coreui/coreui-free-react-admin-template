const readXlsxFile = require('read-excel-file/node')
const xlsx = require('xlsx')
const munkres = require('munkres-js')

// const cmp3 = ([a,b,c])=>{
//     if(a<=b){
//         if(b<=c) return [0,1,2]//a<=b<=c
//         if(c<a) return [2,0,1] //c<a<=b
//         return [0,2,1]         //a<=c<=b
//     }else{//a>b
//         if(a<=c) return [1,0,2]//b<a<=c
//         if(c<b) return [2,1,0] //c<b<a
//         return [1,2,0]         //b<=c<a
//     }
// }
const parseXls = async (filePath, keys)=>{
    const rows = await readXlsxFile(filePath)
    const indexs = keys.map(({chin,...props}) => {
        const index = rows[0].indexOf(chin)
        return {index,...props}
    })
    return rows.slice(1).map(data => {
        output = {}
        indexs.forEach(({key,index,splitBy:sb,first}) => {
            if(index == -1) return output[key] = null
            let value = data[index]
            if(sb !== undefined) {
                try{
                    value = value.split(sb).map(s=>s.trim().toLowerCase()) //, console.log(value)
                }catch{
                    value = []
                }
            }
            else if (first !== undefined) value = value.split(first)[0].trim().toLowerCase()//, console.log(value)
            output[key] = value
        })
        return output
    })
}
const splitBy = /,|\+|\//
const sKeys = [
    {key:'name',chin:'姓名'},
    // {key:'degree',chin:'學位',splitBy:' + '},
    {key:'major',chin:'領域',splitBy:','},
    {key:'email',chin:'電子郵件地址'},
    {key:'number',chin:'今年願意接受多少位學弟妹諮詢？'},
    // {key:'gpa',chin:'成績', },
    {key:'school',chin:'最終決定去的學校',splitBy:'/'},
    {key:'admin',chin:'錄取結果(Admissions)'},
]
const jKeys = [
    {key:'name',chin:'姓名'},
    // {key:'degree',chin:'欲申請學位',splitBy:' + '},
    {key:'degree',chin:'學位',splitBy},
    {key:'hasPaper',chin:'申請時是否已發表論文'},
    // {key:'major',chin:'欲申請的研究領域（可多選）',splitBy:', '},
    {key:'major',chin:'領域',splitBy:','},
    {key:'email',chin:'您的Email (必填)'},
    {key:'account',chin:'學號'},
    {key:'school',chin:'1. 希望就讀學校之 夢幻學校',splitBy},
    {key:'school2',chin:'2. 希望就讀學校之 有把握學校',splitBy},
    {key:'school3',chin:'3. 希望就讀學校之 保底學校',splitBy}
]

const cmp2arr = (a1,a2)=>a1.filter(e=>a2.indexOf(e)>=0).length
const print = (...s)=>console.log(...s)
const transJunior = (data)=>{
    return data.map(({school,school2,school3,hasPaper,degree,...restData})=>{
        if(school[0].includes('無')) school=[]
        if(school2[0].includes('無')) school2=[]
        if(school3[0].includes('無')) school3=[]
        newgree = []
        if(degree.includes('ms.')) newgree.push(0)
        if(degree.includes('ph.d.')) newgree.push(1)
        // if(degree.includes('ms')) newgree.push(0)
        // if(degree.includes('phd')) newgree.push(1)
        hasPaper = ['無論文經驗','已投稿但尚未公佈','已發表 1 篇','已發表 2 篇以上'].indexOf(hasPaper)
        return {school,school2,school3,hasPaper,degree:newgree,...restData}
    })
}
const transSenior = (data)=>{
    const extra = []
    return [data.map(({school,admin,number,name,...restData})=>{
        let degree = -1
        if(school.includes('ms')||school.includes('meng'))  degree = 0
        if(school.includes('phd')) degree = 1
        if(degree === -1) {
            number = 0
            extra.push(name)
            console.log(`請人工配對：${name}${degree}`)
        }
        return {degree,school:school[0],number,name,...restData}
    }),extra]
}

const matching = async (senior,junior,oPath)=>{
    const a = await parseXls(senior,sKeys)
    const b = await parseXls(junior,jKeys)
    const [seniorData,extra] = transSenior(a)
    const juniorData = transJunior(b)
    console.log(seniorData)
    // console.log(juniorData)
    const numbers = seniorData.map(aSenior=>aSenior.number)
    const score = seniorData.map(({degree:sd, major:sm, school:ss})=>{
        return juniorData.map(({degree:jd, major:jm, school:js, school2:js2, school3:js3, hasPaper})=>{
            let score = 0
            let [s1,s2,s3] = [0,0,0]
            if(jd.includes(0) && sd===0) {//MS
                if(js.includes(ss)) s1 += 2 //學校1~3
                if(js2.includes(ss)) s2 += 2
                if(js3.includes(ss)) s3 += 2
                // if(cmp2arr(sm,jm)) score += 1 //領域
                console.log(cmp2arr(sm,jm))
                score += cmp2arr(sm,jm)*1
            }
            if(jd.includes(1) && sd===1) {//PhD
                score += hasPaper //[0,2,4,6] for ['無論文經驗','已投稿但尚未公佈','已發表 1 篇','已發表 2 篇以上']
                // if(cmp2arr(sm,jm)) score += 4 //領域
                console.log(cmp2arr(sm,jm))
                score += cmp2arr(sm,jm)*4
                if(js.includes(ss)) s1 += 1 //學校1~3
                if(js2.includes(ss)) s2 += 1
                if(js3.includes(ss)) s3 += 1
            }
            // acc.push(-score-s1,-score-s2,-score-s3)
            return [-score-s1,-score-s2,-score-s3] //因為是找最小cost，所以負號
        })
    })
    //sheet0
    const wb = xlsx.utils.book_new();
    const ws5 = xlsx.utils.aoa_to_sheet([
        ['學弟妹->'].concat(juniorData.map(({name})=>name))
    ])
    score.forEach((j,ind)=>{
        const sName = seniorData[ind].name
        xlsx.utils.sheet_add_aoa(ws5,[
            [sName].concat(j.map(abc=>abc.map(a=>a*-1).join()))
        ] , {origin: -1})
    })
    xlsx.utils.book_append_sheet(wb, ws5, '分數');
    score.forEach((e,i)=>{
        console.log(score[i][2])
    })
    // console.log('學長姊可接受總人數',numbers.reduce((a,b)=>a+b,0))
    // const juniorMatched = []
    // const juniorTotal = [...Array(score[0].length).keys()]
    const finalResult = []
    for (let i = 0; i < 3; i++) {//最多配對3次
        const seniorInv = numbers.map((e, i) => e >0 ? i : '').filter(String)
        // const juniorInv = juniorTotal.map((e, i) => juniorMatched.includes(e) ? '' : i).filter(String)
        // console.log(seniorInv)
        // console.log(juniorInv)
        const score1 = score.map(jus=>{
            return jus
                .map(abc=>Math.min(...abc))//最小的score
                // .filter((e,i)=>juniorInv.includes(i))
        }).filter((e,i)=>seniorInv.includes(i))
        console.log(score1.length,score1[0].length)
        const result = munkres(score1)
        result.forEach(([se,ju])=>{
            if(score1[se][ju] !== 99){
                //indexing
                const trueSe = seniorInv[se]
                const abc = score[trueSe][ju]
                const minScore = Math.min(...abc)
                const juSubIndex = abc.indexOf(minScore)
                //record matched
                numbers[trueSe] = numbers[trueSe]-1
                finalResult.push([trueSe,ju,juSubIndex,minScore])
                //fix score 避免重複配對
                score[trueSe][ju] = [99,99,99]
                score.forEach((e,i)=>{
                    score[i][ju][juSubIndex] = 99
                })
            }else console.log('99:',se,ju)
        })
    }
    console.log(finalResult.sort(([a1,a2,a3],[b1,b2,b3])=>{
        if(a2>b2) return 1
        if(a2<b2) return -1
        if(a3>b3) return 1
        if(a3<b3) return -1
        return 0
    }))
    console.log(numbers)


    //sheet1
    const ws = xlsx.utils.aoa_to_sheet([['學弟妹姓名','學弟妹學號', '學弟妹信箱', '學弟妹領域','學長姊姓名','學長姊學校', '學長姊信箱', '匹配分數']])
    finalResult.forEach(([i,j,type,score],ind)=>{
        const sRow = seniorData[i]
        const jRow = juniorData[j]
        xlsx.utils.sheet_add_aoa(ws,[[jRow.name,jRow.account,jRow.email,jRow.major.join(),
            sRow.name,sRow.school,sRow.email,-score]] , {origin: -1})//,{origin:`A${ind+2}`})
    })
    xlsx.utils.book_append_sheet(wb, ws, '配對名單');
    
    //sheet2
    const ws2 = xlsx.utils.aoa_to_sheet([['學長姊姓名']])
    extra.forEach((people)=>{
        xlsx.utils.sheet_add_aoa(ws2,[[people]] , {origin: -1})//,{origin:`A${ind+2}`})
    })
    xlsx.utils.book_append_sheet(wb, ws2, '手動配對學長姊');
    //sheet3
    const ws3 = xlsx.utils.aoa_to_sheet([['學弟妹姓名']])
    const juMatched = finalResult.map(([a,ju,b,c])=>ju)
    const notIn = juniorData.filter((e,i)=>!juMatched.includes(i))
    console.log(juMatched,notIn)
    notIn.forEach(({name})=>{
        xlsx.utils.sheet_add_aoa(ws3,[[name]] , {origin: -1})
    })
    xlsx.utils.book_append_sheet(wb, ws3, '沒被配對到的學弟妹');

    //sheet
    const ws4 = xlsx.utils.aoa_to_sheet([['分數規則']])
    xlsx.utils.sheet_add_aoa(ws4,[['a,b,c代表\n夢幻,有把握,保底']] , {origin: -1})//,{origin:`A${ind+2}`})
    xlsx.utils.sheet_add_aoa(ws4,[['MS\n同校2分\n同領域1分']] , {origin: -1})//,{origin:`A${ind+2}`})
    xlsx.utils.sheet_add_aoa(ws4,[['PhD\n同領域4分\n論文0~3分\n同校1分']] , {origin: -1})//,{origin:`A${ind+2}`})
    xlsx.utils.book_append_sheet(wb, ws4, '分數規則');
    
    //寫檔
    xlsx.writeFile(wb,oPath)
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
