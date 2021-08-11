const express = require('express')
const router = express.Router()
const ImgGet = require('../../../middleware/fileProcess')

router.post('/recommendation', ImgGet('file'), require('./addRec'))
router.patch('/recommendation', ImgGet('file'), require('./updateRec'))

router.get('/recommendation/mine', require('./showMyRec'))
router.get('/recommendation', require('./showRec'))
router.post('/smartsearchrecommendation', require('./smartSearch'))
router.delete('/recommendation', require('./delRec'))

module.exports = router
