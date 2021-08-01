const express = require("express");
const router = express.Router();
const router_auth = express.Router()

router_auth.post('/addLink',require('./addLink'))
router.get('/links',require('./getLinks'))
router_auth.post('/matching',require('./runMatch/main'))
router_auth.post('/sendmail',require('./storeMatch/main'))

module.exports = {router,router_auth}