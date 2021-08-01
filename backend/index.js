//ee0125/index.js
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('./routes/Schemas/db')

mongoose.connection.on('open',()=>{
	console.log('DB on')
	const bodyParser = require('body-parser')
	const session = require('express-session')
	const MongoStore = require('connect-mongo')(session)
	//post, get時的解碼
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	// app.use(function(req, res, next) {
	// 	res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
	// 	res.header("Access-Control-Allow-Credentials", true);
	// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	// 	res.header("Access-Control-Allow-Headers", 'Origin, X-Requested-With, Content-Type, Accept');
	// 	next();
	// });
	app.use(cors({
		origin: 'http://localhost:3000',
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'PATCH', 'DELETE'],
		credentials: true
	}))
	//session 設定
	//參考網站https://www.cnblogs.com/chyingp/p/nodejs-learning-express-session.html
	app.use(
		session({
			name: 'eeplus',
			secret: 'fuewhzk', // 用来對session id相關的cookie進行簽名，建議128byte亂碼
			//store: new FileStore({ logFn: function () {} }), // 本地儲存session（文本文件，也可以選擇其他store，比如redis的）
			store: new MongoStore({
				mongooseConnection: mongoose.connection,
			}),
			saveUninitialized: false, // 是否自动保存未初始化的會話，建議false
			resave: false, // 是否每次都重新保存會話，建議false
			cookie: {
				httpOnly: true, //false前端可read和set
				maxAge: 60 * 60 * 1000, // 有效期(ms)
			},
		})
	)
	
	app.use('/api', require('./routes/api'))
// })

//frontend
if(!process.env.HERO){
	const connectHistoryApiFallback = require('connect-history-api-fallback')
	app.use(
		connectHistoryApiFallback({
			verbose: false,
		})
	)
	const DIST_DIR = path.join(__dirname, './dist')
	const HTML_FILE = path.join(__dirname, './index.html')
	app.use(express.static(DIST_DIR))
	app.get('/', (req, res) => {
		res.sendFile(HTML_FILE) // EDIT
	})
}
//old frontend
//Serve static files from the React app
//詳細資訊看：https://expressjs.com/zh-tw/starter/static-files.html
// app.use(express.static(path.join(__dirname, 'client/build')))
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html')); //這個缺點是react build的index不是我們寫的那個
  //res.redirect('/'); //這個按F5會亂跳，先捨棄
});*/

//server on
app.listen(process.env.PORT || 1993, () => {
	if(process.env.HERO){
		const {wakeDyno} = require('heroku-keep-awake')
		wakeDyno('https://eeplus-back.herokuapp.com/',{
			logging: false,
			stopTimes: { start: '16:00', end: '00:00' }//time zone +0，so -8hr
		})
	}
	console.log(`Server is up on port ${process.env.PORT || 1993}.`)
})
//https server
// connect to https://localhost:1993
// const fs = require('fs')
//  const options = {
	//  key: fs.readFileSync('./certificate.key'),
	//  cert: fs.readFileSync('./certificate.crt')
// };
// const https = require('https');
// https.createServer(null, app).listen(process.env.PORT||1993, () => {
//   console.log(`Server is up on port ${process.env.PORT || 1993}.`)
}); 
