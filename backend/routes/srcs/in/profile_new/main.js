const express = require('express')
const router = express.Router()
const getImg = require('../../../middleware/fileProcess')
const valid = require('../../../middleware/validation')

router.get('/profile', require('./getProfile'))

router.patch(
  '/profile',
  getImg('userimage'),
  // valid('chVisual'),
  require('./updateProfile'),
)
router.post(
  '/searchProfile',
  // valid('searchVisual'),
  require('./searchProfile'),
)
router.post('/smartsearchProfile', require('./smartSearch'))

module.exports = router
