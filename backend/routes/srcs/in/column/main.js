const express = require('express')
const router = express.Router()
const router_auth = express.Router()
// const Auth = require("../Auth");
// const ValidSend = require("../../../validation/control");//若valid未通過則res.send false
const valid = require('../../../middleware/validation')
const ImgGet = require('../../../middleware/fileProcess')
//const getImg = require('./getImg')

// router_auth.post('/saveImg',
// 	ImgGet('file'),
// 	require('./saveImg'))

// router.post('/getImg',
// 	require('./getImg'))

router.get('/detail', valid('getDetail'), require('./getDetail'))

router.get('/outline', require('./getOutline'))

router_auth.post('/add', ImgGet('file'), valid('addColumn'), require('./addColumn'))

router.get('/search', require('./search'))

module.exports = { router, router_auth }
