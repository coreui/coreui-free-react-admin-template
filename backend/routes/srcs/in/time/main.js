const express = require('express')
const router = express.Router()
const router_auth = express.Router()

router.get('/getTime', require('./getTime'))
router.post('/setTime', require('./setTime'))
module.exports = { router, router_auth }
