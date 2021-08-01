const express = require("express");
const router = express.Router();
// const Auth = require("../Auth");
const getImg = require('../../../middleware/fileProcess');
const valid = require('../../../middleware/validation')

router.post("/showVisual",
	require('./showVisual'));
router.post("/chVisual",
	getImg('userimage'),
	valid('chVisual')
	//require('./chVisual'));
)
router.post('/searchVisual',
	valid('searchVisual'),
	require('./searchVisual'));
    
module.exports = router