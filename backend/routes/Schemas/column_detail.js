const mongoose = require('./db'),
    Schema = mongoose.Schema;

const Column_detail = new Schema({
    title:[{type:String}],
    hashtags:[{type:String}],
    sections:[{
        bigtitle:{type:String},
        sections:[{
            title:{type:String},
            section:{type:String}
        }]
    }],
    annotation:[{type:String}],
    id:{type:String}
})

module.exports = mongoose.model('Column_detail',Column_detail);
