const express = require('express')
const router = express.Router()
const router_auth = express.Router()
const parseFile = require('../../../middleware/fileProcess')

// router_auth.post('/saveImg',
// 	ImgGet('file'),
// 	require('./saveImg'))

// router.post('/getImg',
// 	require('./getImg'))

router.get('/detail', require('./getDetail'))

router.get('/outline', require('./getOutline'))

router_auth.post('/add', parseFile('file'), require('./addColumn'))

router.get('/search', require('./search'))

module.exports = { router, router_auth }
