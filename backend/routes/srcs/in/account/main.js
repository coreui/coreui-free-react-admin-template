const express = require("express");
const router = express.Router();
const router_auth = express.Router()
// const Auth = require("../Auth");
const valid = require("../../../middleware/validation");
// const ImgGet = require('../../../middleware/multer');

router.post("/showPersonal",
	require("./showPersonal"))

router.post("/chPassword",
	valid('chPassword'),
	require("./chPassword"))

router_auth.post('/manageAuth',require('./auth/manageAuth'))
router_auth.post('/handlePending',require('./auth/handlePending'))
router_auth.post('/showPending',require('./auth/showPending'))
router_auth.post('/showUser',require('./auth/showUser'))
router_auth.post('/delUser',require('./auth/deleteUser'))

module.exports = {router,router_auth}
