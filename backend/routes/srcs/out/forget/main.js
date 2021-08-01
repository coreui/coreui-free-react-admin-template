const express = require("express");
const router = express.Router();
const valid = require("../../../middleware/validation");

router.post("/forget",
	valid('forget'),
	require("./forget"))

router.post("/activation",
	valid('activation'),
    require("./activation"))

module.exports = router;