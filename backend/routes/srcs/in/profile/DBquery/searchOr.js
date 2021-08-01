const {D1,D2,D3} = require("./dataType");

module.exports = function(req){
	let query=[]
	D1.forEach(key=>{
		const val = req.body[key]
		if(val!==undefined){
			const Q1 = {};
			Q1[key+".data"] = val;
			Q1[key+".show"] = true;
			query.push(Q1);
			if(key==='account' && val.includes('x')){
				Q1[key+".data"]={$regex:new RegExp(val.replace(/x/g,'.'))} //regexp
			}
		}
	})
	Object.entries(D2).forEach(([key,element])=>{//[education,[major,...]]
		element.forEach(major=>{
			const Q2 = {};
			try{
				let data =  req.body[`${key}.${major}`];
				if(data===undefined) data = req.body[key][major];
				if(data!==undefined){
					Q2[`${key}.${major}.SD`] = data;
					Q2[`${key}.${major}.show`] = true;
					query.push(Q2)
				}
			}catch{
				console.log(`skip ${major}`)
			}
		})
	})
	Object.entries(D3).forEach(([key,element])=>{//[Occupation,[O,P,C]]
		const data = req.body[key]//{O,P,C}
		if(data!==undefined){
			data.show = true;
			const Q3 = {};
			Q3[key] = {$elemMatch:data};
			query.push(Q3)
		}
	})
	if(query.length === 0){
		return {}
	}
	else{
		return {$or:query}
	}
}