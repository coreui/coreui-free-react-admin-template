// const Job = require('../../../Schemas/job');

// /*新增一筆資料*/
// function insert(title,subtitle,description){
//       //格式
//     const job =  new Job({ 
// 		title: title,
//                 subtitle : subtitle,
// 		description: description
//             });
	
//     job.save(function(err,res){ //save to db
//         if(err){
//             console.log(err);
//         }
//         else{
// 		console.log('成功儲存：',job);
// 		console.log(res);
//         }
//     })
// }

// module.exports = function (req, res) {
//     const jobTitle = req.body.title;
//     const jobSubtitle = req.body.subtitle;
//     const jobDescription = req.body.description;

//     //var query = {ID: ID};
//     console.log("新增工作");
//     insert(jobTitle, jobSubtitle, jobDescription);
//     res.send({status:'success', message:true, data: jobTitle})
// }
