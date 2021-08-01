const { dbCatch } = require('../../../../error');
const Column = require('../../../../Schemas/column');

module.exports = async function (name){
	const objImg = await Column.findOne({filename:name}).catch(dbCatch)
	if(!objImg) throw new ErrorHandler(404,'圖片不存在')
	return objImg.columnImg
}