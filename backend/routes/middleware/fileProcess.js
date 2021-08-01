const multer = require('multer')
const { ErrorHandler } = require('../error')

//參考網址
//https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E4%BD%BF%E7%94%A8-multer-%E5%AF%A6%E4%BD%9C%E5%A4%A7%E9%A0%AD%E8%B2%BC%E4%B8%8A%E5%82%B3-ee5bf1683113

const upload = multer({
	limits: {
		// 限制上傳檔案的大小為 100MB
		fileSize: 100000000
	},
	fileFilter:function(req,file,cb){
		if(!file.originalname.match(/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/)){
			req.fileValidationError = '檔案格式錯誤'
			return cb(new Error('檔案格式錯誤'),false)
		}
		cb(null,true)
	}
})

/**
 * file preprocess by multer
 * @param  {String} filename filename in multer 
 * @return {List}      callback functions to put in router
 */
module.exports = (filename) => {
	const doUpload = upload.single(filename)
	return (req,res,next) => {
		doUpload(req,res,(err) => {
			if (req.fileValidationError) return res.status(400).send(req.fileValidationError)//throw new ErrorHandler(400,req.fileValidationError)
			else if(err instanceof multer.MulterError) return res.status(400).send(err.message)
			else if(err) return res.status(400).send('檔案讀取發生錯誤')
			next()
		})
	}
}
