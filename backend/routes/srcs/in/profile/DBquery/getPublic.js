const {D1,D2,D3} = require("./dataType");

module.exports = function(obj){
	const output = {}
	D1.forEach(key=>{//account,username,...
        try{
            const {show,data} = obj[key]
            if(show===true && data!==undefined) output[key] = data
        }catch(e){
            console.log(`skip ${key}`)
        }
    })
	Object.entries(D2).forEach(([key,element])=>{//[education,[major,...]]
        output[key]={}
        element.forEach(major=>{
            try{
                const {show,...data} = obj[key][major]  //data={SD,Note}
                if(show) output[key][major] = data
            }catch{
                console.log(`skip ${major}`)
            }
        })
	})
	Object.entries(D3).forEach(([key,element])=>{//[Occupation,[O,P,C]]
		output[key]=[]
        try{
            obj[key].forEach(({show,...data})=>{
                if(show===true) output[key].push(data)
            })
        }catch{
            console.log(`skip ${key}`)
        }
	})
	if(obj.userimage && obj.userimage.show) output.userimage = obj["imgSrc"]//Virtual
	return output
}