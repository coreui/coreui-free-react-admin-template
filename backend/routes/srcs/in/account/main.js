const express = require('express')
const router = express.Router()
const router_auth = express.Router()

router.post('/showPersonal', require('./showPersonal'))
router.post('/chPassword', require('./chPassword'))

router_auth.post('/manageAuth', require('./auth/manageAuth'))
router_auth.post('/handlePending', require('./auth/handlePending'))
router_auth.post('/showPending', require('./auth/showPending'))
router_auth.post('/delUser', require('./auth/deleteUser'))

module.exports = { router, router_auth }
