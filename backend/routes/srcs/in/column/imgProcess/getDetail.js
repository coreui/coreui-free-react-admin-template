const { dbCatch, ErrorHandler } = require('../../../../error');
const Column = require('../../../../Schemas/column_detail');

module.exports = async function (name){
	const objDetail = await Column.findOne({id:name}).catch(dbCatch)
	if(!objDetail) throw new ErrorHandler(404,'資料不存在')
	return objDetail
}