const multer = require('multer')
const { ErrorHandler } = require('../../../../error')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'output.xlsx')
  },
})

const upload = multer({
  fileFilter: function (req, file, cb) {
    console.log('file', file)
    console.log('req', req)
    if (!file.originalname.match(/\.(xlsx)$/)) {
      req.fileValidationError = '請傳送.xlsx檔'
      return cb(new Error('請傳送.xlsx檔'), false)
    }
    cb(null, true)
  },
  storage: storage,
})

/**
 * file preprocess by multer
 * @param  {String} filename filename in multer
 * @return {List}      callback functions to put in router
 */
module.exports = (filename) => {
  const doUpload = upload.single(filename)
  return (req, res, next) => {
    doUpload(req, res, (err) => {
      if (req.fileValidationError) next(new ErrorHandler(400, req.fileValidationError))
      else if (err instanceof multer.MulterError) next(new ErrorHandler(400, err.message))
      else if (err) next(new ErrorHandler(400, err))
      next()
    })
  }
}
