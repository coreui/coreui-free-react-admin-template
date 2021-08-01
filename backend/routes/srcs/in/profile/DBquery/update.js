const {D1,D2,D3} = require("./dataType");

module.exports = function(req){
    const output = {}
    const unset = {}
    console.log("body",req.body)
    D1.forEach(key=>{//account,username,...
        try{
            // let show,data;
            if(key in req.body) ({show,data} = JSON.parse(req.body[key]))
            else ([show,data] = [req.body[`${key}.show`],req.body[`${key}.data`]])
            // console.log(show,data)
            if(show!==undefined) output[`${key}.show`] = show
            if(data!==undefined) (data==="") ? (unset[`${key}.data`] = "" ) : (output[`${key}.data`] = data)
        }catch(e){
            console.log(e)
            console.log(`skip ${key}`)
        }
	})
	Object.entries(D2).forEach(([key,element])=>{//[education,[major,...]]
		element.forEach(major=>{
            try{
                if((key in req.body) && req.body[key].hasOwnProperty(major)) ({show,SD,Note} = req.body[key][major])
                else ([show,SD,Note] = [req.body[`${key}.${major}.show`], req.body[`${key}.${major}.SD`], req.body[`${key}.${major}.Note`]])
                if(show!==undefined) output[`${key}.${major}.show`] = show
                if(SD!==undefined) (SD==="") ? (unset[`${key}.${major}.SD`]="") : (output[`${key}.${major}.SD`]=SD)
                if(Note!==undefined) (Note==="") ? (unset[`${key}.${major}.Note`]="") : (output[`${key}.${major}.Note`]=Note)
            }catch(e){
                console.log(`skip ${major}`);
            }
        })
	})
	Object.entries(D3).forEach(([key,element])=>{//[Occupation,[O,P,C]]
        const data = req.body[key]
        // console.log("OCC=",data,Array.isArray(data))
        try{
            Occupation = []
            data.forEach(occupation=>{
                // console.log(Object.keys(occupation))
                const {O,P,C,show} = JSON.parse(occupation)//{O,P,C,show}
                console.log({O,P,C,show})
                Occupation.push({O,P,C,show})
            })
            output[key] = Occupation
        }catch(e){
            // console.log(e)
            // console.log(data)
            console.log("skip work")
        }
    })
    if(req.file){
		output["userimage.data"] = req.file.buffer
		output["userimage.contentType"] = req.file.mimetype
		console.log('get img',output["userimage.contentType"])
    }
    const query = {}
    if(!(Object.entries(unset).length === 0 && unset.constructor === Object)) query.$unset = unset
    if(!(Object.entries(output).length === 0 && output.constructor === Object)) query.$set = output
	return query
}