const express = require('express')
const router = express.Router()
const parseFile = require('../../../middleware/fileProcess')

router.post('/login', require('./login'))

router.post('/loginFB', require('./loginFB'))

router.post('/register', parseFile('file'), require('./register'))

router.post(
  '/registerFB',
  parseFile([
    { name: 'avatar', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  require('./registerFB'),
)

router.post('/logout', require('./logout'))

router.post('/isLogin', require('./isLogin'))

module.exports = router
