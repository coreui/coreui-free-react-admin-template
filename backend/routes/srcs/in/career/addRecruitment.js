const { dbCatch } = require('../../../error');
const Recruitment = require('../../../Schemas/recruitment');
const asyncHandler = require('express-async-handler')

/*新增一筆資料*/
async function insert(account,title,company_name,work_type,salary,experience,diploma,requirement,description,img){
  let recruitmentObj = {
    account: account,
    title:{
      title: title,
		  company_name: company_name,
		  work_type: work_type
	  },
	  info:{
		  salary: salary,
		  experience: experience,
		  diploma: diploma
	  },
	  spec:{
		  requirement: requirement,
		  description: description
    },
  };
  if(img){
    recruitmentObj.img = img;
  }
  const recruitment =  await new Recruitment(recruitmentObj).save().catch(dbCatch)
  console.log(recruitment.title.title)
  return recruitment.title.title
  // recruitment.save(function(err,res){ //save to db
  //     if(err){
  //         console.log(err);
  //     }
  //     else{
  //     console.log('成功儲存：',recruitment);
  //     console.log(res);
  //     }
  // })
}


/**
 * @api {post} /addRecruitment 新增職缺
 * @apiName AddRecruitment
 * @apiGroup In/career
 * 
 * 
 * @apiHeaderExample {json} header-config
				 { "content-type": "multipart/form-data" }
 * 
 * @apiparam {String} title 職缺標題
 * @apiparam {String} company_name 公司名稱
 * @apiparam {String} work_type 職位(ex.前端工程師)
 * @apiparam {String} salary 薪資
 * @apiparam {String[]} experience 經驗要求
 * @apiparam {String} diploma 學系要求
 * @apiparam {String[]} requirement 技能要求
 * @apiparam {String[]} description 其他描述
 * @apiparam {File} file 照片
 * 
 * @apiSuccess (201) data 職缺標題
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */
module.exports = asyncHandler(async (req, res)=>{
  let recruitmentAccount = 'none';
  if(req.session){
    recruitmentAccount = req.session.loginAccount;
    console.log(req.session);
  }

  const recruitmentTitle = req.body.title;
  const recruitmentCompany_name = req.body.company_name;
  const recruitmentWork_type = req.body.work_type;
  const recruitmentSalary = req.body.salary;
  const recruitmentExperience = req.body.experience;
  const recruitmentDiploma = req.body.diploma;
  const recruitmentRequirement = req.body.requirement;
  const recruitmentDescription = req.body.description;

  const recruitmentFile = req.file;
  let recruitmentImg;
  if(recruitmentFile){
    recruitmentImg = {data:recruitmentFile.buffer, contentType:recruitmentFile.mimetype}
    console.log(recruitmentImg)
  }

  //var query = {ID: ID};
  console.log("新增recruitment")
  await insert(recruitmentAccount,recruitmentTitle,recruitmentCompany_name,recruitmentWork_type,recruitmentSalary,recruitmentExperience,recruitmentDiploma,recruitmentRequirement,recruitmentDescription, recruitmentFile?recruitmentImg:undefined)

  res.status(201).send({data: recruitmentTitle})
})
