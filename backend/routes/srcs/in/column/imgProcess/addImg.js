const { dbCatch } = require('../../../../error');
const Column = require('../../../../Schemas/column');

module.exports = async function(name,file){
	await new Column({
		filename:name,
		columnImg:{
			data:file.buffer,
			contentType:file.mimetype
		}
	}).save().catch(dbCatch)
}