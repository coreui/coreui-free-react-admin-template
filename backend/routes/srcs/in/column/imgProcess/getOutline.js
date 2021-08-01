const { dbCatch, ErrorHandler } = require('../../../../error');
const Column = require('../../../../Schemas/column_outline');

module.exports = async function (name){
	const objOutline = await Column.find({}).catch(dbCatch)
	if(!objOutline) throw new ErrorHandler(404,'圖片不存在')
    const objOutlineNew = objOutline.map(element => {
        const {imgSrc,filename,anno,title,exp,edu,intro,id} = element;
        return {
            imgSrc,filename,anno,title,element,edu,intro,id
        } //{...element,columnImg:''}
    });
    return objOutlineNew
}