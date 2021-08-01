const nodemailer = require('nodemailer')
const { ErrorHandler } = require('../../error')
const credentials = require('./credential')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: credentials.gmail.user,
        pass: credentials.gmail.password
    }
})

/**
 * give recipient and text then send a mail
 * @param  {String} recipient 收件人
 * @param {String} subject 主旨
 * @param  {String} text mail content
 */
module.exports = async function (recipient,subject,text){
	const mail = {// 設定寄信參數
		// 發信人
		from: '"台大電機系系學會EEPlus" <ntueeplus2020@gmail.com>',
		// 主題
		subject: subject,
		// 收信人
		to: recipient,
		// 信件內容，HTML格式
		html: text
	}
	let info = await transporter.sendMail(mail).catch(e=>{
		console.log(e.message)
		throw new ErrorHandler(500,'寄信失敗')
	})
	console.log('mail sent:', info.envelope)
}