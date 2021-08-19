const { dbCatch } = require('../../../error')
const Recruitment = require('../../../Schemas/recruitment')
const asyncHandler = require('express-async-handler')

async function deleteRecruitment(req, res, next) {
  console.log(req.body)
  const deletedRecruitment = await Recruitment.findById(req.body._id).catch(dbCatch)
  if (!deletedRecruitment) {
    console.log('_id not exists')
    res.status(200).send({ data: '_id not exists' })
    return
  }

  console.log(req.session)

  if (deletedRecruitment.account) {
    if (
      req.session !== undefined &&
      (req.session.loginAccount === deletedRecruitment.account || req.session.isAuth)
    ) {
      await Recruitment.findByIdAndDelete(req.body._id).catch(dbCatch)
      let deletedtitle = deletedRecruitment.title.title
      console.log('delete:', deletedtitle)
      res.status(200).send({ data: deletedtitle })
    } else {
      console.log('unauthorized')
      res.status(403).send({ data: 'unauthorized' })
    }
  } else {
    await Recruitment.findByIdAndDelete(req.body._id).catch(dbCatch)
    let deletedtitle = deletedRecruitment.title.title
    console.log('delete:', deletedtitle)
    res.status(200).send({ data: deletedtitle })
  }
}

/**
 * @api {delete} /deleteRecruitment delete
 * @apiName DeleteRecruitment
 * @apiGroup In/career
 * @apiDescription 用_id刪除職缺
 *
 * @apiparam {String} _id 要刪除職缺的mongodb _id
 *
 * @apiSuccess (200) data 刪除職缺標題
 *
 * @apiError (500) {String} description 資料庫錯誤
 * @apiError (403) {String} description 沒有權限(僅建立者與管理員可以刪除)
 */

module.exports = asyncHandler(deleteRecruitment)
