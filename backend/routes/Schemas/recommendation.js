const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Recommendation_Schema = new Schema({
	account:{type: String, required: true},
  	title:{
		title: String,
		name: String,
		desire_work_type: String
	},
	info:{
		contact: String,
		email: String,
		diploma: String,
	},
	spec:{
		experience: [String],
		speciality: [String]
	},

	img: {
		data: { type: Buffer },
		contentType: { type: String }
	},
	//image:eesa_icon,
})

Recommendation_Schema.virtual('imgSrc').get(function() {
	try{
		return `data:${this.img.contentType};base64,${new Buffer(this.img.data, 'binary').toString('base64')}`
	}catch{
		return ""
	}
})

Recommendation_Schema.methods.getPublic = function() {
	return {
		account: this.account,
		_id: this._id,
		title: this.title,
		info: this.info,
		spec: this.spec,
		image: this.imgSrc
	}
};

module.exports = mongoose.model('Recommendation', Recommendation_Schema);
