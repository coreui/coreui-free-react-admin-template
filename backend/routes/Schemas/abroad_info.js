const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Abroad_Info = new Schema({
    title:{type:String},
    info:{type:String},
    icon:{
        data:{type:Buffer},
        contentType:{type:String}
    }
})

Abroad_Info.virtual('iconSrc').get(function() {
	try{
		const prefix="data:"+this.icon.contentType+";base64,"
		const img = new Buffer(this.icon.data, 'binary').toString('base64');
		return prefix+img;
	}catch{
		return ""
	}
});

module.exports = mongoose.model('Abroad_info', Abroad_Info)