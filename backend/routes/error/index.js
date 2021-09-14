class ErrorHandler extends Error {
  /**
   * throw Error to error router
   * @param {Number} statusCode http status
   * @param {String} message error message sending to frontend
   */
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.description = message
  }
}

const handleError = (err, req, res, next) => {
  const { statusCode, description } = err
  if (!description) {
    console.log('Error:', err)
    return res.status(404).json({
      description: 'unknow error',
    })
  }
  console.log('Error:', description)
  res.status(statusCode).json({
    description,
  })
}

/**
 * throw Error 500 '資料庫錯誤' to error router
 * @param {Error} e
 */
const dbCatch = (e) => {
  console.log(e.message)
  throw new ErrorHandler(500, '資料庫錯誤')
}

module.exports = { ErrorHandler, handleError, dbCatch }
