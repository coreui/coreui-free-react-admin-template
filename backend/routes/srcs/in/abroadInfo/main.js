const express = require('express')
const router = express.Router()
const router_auth = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router_auth.post('/addAbroadInfo', parseFile('file'), require('./addAbroadInfo'))

router.post('/getAbroadInfo', require('./getAbroadInfo'))

router_auth.post('/updateAbroadInfo', parseFile('file'), require('./updateAbroadInfo'))

router_auth.delete('/deleteAbroadInfo', require('./deleteAbroadInfo'))

module.exports = { router, router_auth }
