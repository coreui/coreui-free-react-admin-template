const mongoose = require("./db"),
  Schema = mongoose.Schema;
require('mongoose-type-email');

const Profile_Schema = new Schema({
    account:  {type: String, required: true, lowercase: true },
    username: { type: String, required: true },
    nickname:       String,
    profile:        String,
    major:          String,
	double_major:   String,
	minor:          String,
	master:         String,
	doctor:         String,
    publicEmail:    mongoose.SchemaTypes.Email,
    cellphone:      String,
    CC:             String,//city+country
    web:            String,
    facebook:       String,
    Linkedin:       String,
    Occupation:[{
        O: String,//部門
        P: String,//職稱
        C: String //公司
    }],
    // JobID: {type:String}, //改在career用account link
    userimage: {//大頭貼
        data: Buffer,
        contentType: String,
    }
})

Profile_Schema.virtual('imgSrc').get(function() {
	try{
		// const prefix="data:"+this.userimage.contentType+";base64,"
		// const img = new Buffer(this.userimage.data, 'binary').toString('base64');
		// return prefix+img;
        return `data:${this.userimage.contentType};base64,${new Buffer(this.userimage.data, 'binary').toString('base64')}`
	}catch{
		return ""
	}
});

module.exports = mongoose.model("Profile", Profile_Schema);
