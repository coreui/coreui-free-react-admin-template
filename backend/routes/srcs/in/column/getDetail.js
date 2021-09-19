const asyncHandler = require('express-async-handler')
const { dbCatch, ErrorHandler } = require('../../../error')
const Column = require('../../../Schemas/column_detail')

/**
 * @api {get} /column/detail get column detail
 * @apiName GetDetail
 * @apiGroup In/column
 * @apiDescription 拿詳細文章內容
 * 
 * @apiparam {String} id yymm(required)
 * 
 * @apiSuccessExample {json} Success-Response:
 * 	{
 * 		'top':{
 *          'name':'String',
 *          'experience':'String',
 *          'hashtags':['String']
 *      },
 *      'body': {
            'body': [
            {
                'bigtitle': 'String',
                'bigsections': [
                {
                    'subtitle': 'String',
                    'subsection': 'String',
                },],
            },],
        },
        'annotation': {
            'annotation': [
            {
                'job': 'String',
                'contributer': 'String',
            },],
        },
        'id': 'String',
 * 	}
 * 
 * @apiError (404) {String} description id is required/資料不存在
 * @apiError (500) {String} description 資料庫錯誤
 */
const getDetail = async (req, res, next) => {
  const { id } = req.query
  const objDetail = await Column.findOne({ id }).catch(dbCatch)
  if (!objDetail) throw new ErrorHandler(404, '資料不存在')
  return res.status(201).send(objDetail)
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'required', field: 'id', method: 'get' }]
module.exports = [valid(rules), asyncHandler(getDetail)]
