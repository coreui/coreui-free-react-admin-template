const {job} = require('./dataType')

module.exports = function(obj){
	const output = {}
	job.forEach(element=>{
		if(obj[element] !== (undefined || '')){
			output[element] = obj[element]
		}
	})
	console.log('job=',output.title)
	return output
}