const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.get('/profile', require('./getProfile'))
router.patch('/profile', parseFile('userimage'), require('./updateProfile'))
router.post('/searchProfile', require('./searchProfile'))
router.post('/smartsearchProfile', require('./smartSearch'))

module.exports = router
