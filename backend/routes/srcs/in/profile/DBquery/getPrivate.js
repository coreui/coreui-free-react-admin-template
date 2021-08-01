const {D1,D2,D3} = require("./dataType");

module.exports = function(obj){
	const output = {}
	D1.forEach(key=>{//account,username,...
		const data = obj[key]
		if(data!==undefined) output[key]=data
	})
	Object.entries(D2).forEach(([key,element])=>{//[education,[major,...]]
		const data = obj[key]
		if(data!==undefined) output[key]=data
	})
	Object.entries(D3).forEach(([key,element])=>{//[Occupation,[O,P,C]]
		const data = obj[key]
		if(data!==undefined) output[key]=data
	})
	output.userimage = obj["imgSrc"]//Virtual
	return output
}