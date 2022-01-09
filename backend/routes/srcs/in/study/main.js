const express = require('express')
const router = express.Router()
const router_auth = express.Router()

router_auth.post('/addLink', require('./addLink'))
router.get('/links', require('./getLinks'))
router.post('/fillForm', require('./runMatch/fillForm'))
router.get('/form', require('./runMatch/getForm'))
router_auth.post('/matching', require('./runMatch/main'))
router_auth.post('/sendmail', require('./storeMatch/main'))
router_auth.delete('/form', require('./runMatch/clearForm'))

module.exports = { router, router_auth }
