const {JSDOM} = require('jsdom')
const jquery = require('jquery')
const path = require('path')
const fs = require('fs')
// const { ErrorHandler } = require('../../../../error')


data = {
    senior:{sname:'鄭謹譯'},
    junior:[
        {
            jname:'陳君輔',
            jmail:'b07901029@ntu.edu.tw'
        },{
            jname:'陳希格',
            jmail:'b07901014@ntu.edu.tw'  
        }
    ]
}
const template_senior = async (sname) => {
    const DOM = await JSDOM.fromFile(
        path.join(__dirname, './senior.html'),
        {contentType: 'text/html'}).catch(e=>{
            console.log(e.message)
            throw new Error(500,'信件範本讀取失敗')
        })
    const {window} = DOM
    const $ = jquery(window)
    // $('#reset_button').attr("href",href)
    // $('#reset_blank').attr("href", href)
    $('#sname').text(sname)
    return window
}

const template_junior = async ({jname,account,jmail,major})=>{//{jname,account,jmail,major}
    const DOM = await new JSDOM(
        `<p style="margin: 0;">
            姓名：<span id='name'>OOO</span> <br/>
            學號：<span id='account'>OOO</span> <br/>
            聯絡方式：<span id='email'>OOO</span> <br/>
            領域：<span id='major'>OOO</span> <br/>
        </p>`)
    const {window} = DOM
    const $ = jquery(window)
    jname && $('#name').text(jname)
    account && $('#account').text(account)
    jmail && $('#email').text(jmail)
    major && $('#major').text(major)
    return `<tr>
        <td style="padding: 0px 24px 12px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">`
        +DOM.serialize()
        +`</td>
        </tr>`
}

const main = async ({sname,smail,jun})=>{//{sname,smail,jun:[{jname,account,jmail,major}]}
    const win1 = await template_senior(sname)
    const $ = jquery(win1)
    let blockText = ''
    for(const student of jun){//{jname,account,jmail,major}
        blockText += await template_junior(student)
    }
    $('#juniorBlock').append(blockText)
    return win1.document.documentElement.outerHTML
}

// const test = async ()=>{
//     const html1 = await main(data)
//     fs.writeFile('2.html', html1, err => {
//         console.log('done');
//     });
// }
// test()

module.exports = main