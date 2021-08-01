const {job} = require('./dataType')

module.exports = function(req){
	const query = {}
	job.forEach(element => {
		if(req.body[element] !== undefined){
			query[element] = req.body[element];
		}
	})
	console.log('query=', query)
	return query
}
