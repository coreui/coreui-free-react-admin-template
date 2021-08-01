const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Recruitment_Schema = new Schema({
	account: String,

  title:{
		title: String,
		company_name: String,
		work_type: String
	},
	info:{
		salary: String,
		experience: [String],
		diploma: String
	},
	
	spec:{
		requirement: [String],
		description: [String]
	},
	img: {
		data: { type: Buffer },
		contentType: { type: String }
	},
//   id: String
})

Recruitment_Schema.virtual('imgSrc').get(function() {
	try{
		// const prefix="data:"+this.userimage.contentType+";base64,"
		// const img = new Buffer(this.userimage.data, 'binary').toString('base64');
		// return prefix+img;
		return `data:${this.img.contentType};base64,${new Buffer(this.img.data, 'binary').toString('base64')}`
	}catch{
		return ""
	}
})

Recruitment_Schema.methods.getPublic = function() {
	console.log(this.title)
	return {
		account: this.account,
		_id: this._id,
		title: this.title,
		info: this.info,
		spec: this.spec,
		image: this.imgSrc
	}
};

module.exports = mongoose.model('Recruitment_new', Recruitment_Schema);
