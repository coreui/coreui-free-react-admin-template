const express = require('express')
const router = express.Router()

router.post('/forget', require('./forget'))

router.post('/activation', require('./activation'))

module.exports = router
