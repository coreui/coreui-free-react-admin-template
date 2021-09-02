const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/addRecruitment', parseFile('file'), require('./addRecruitment'))
router.post('/showRecruitment', require('./showRecruitment'))
router.post('/searchRecruitment', require('./searchRecruitment'))
router.post('/smartsearchRecruitment', require('./smartSearch'))
router.delete('/deleteRecruitment', require('./deleteRecruitment'))
router.get('/recruitment', require('./showMyRecruitment'))
router.patch('/recruitment', parseFile('file'), require('./updateRecruitment'))

module.exports = router
