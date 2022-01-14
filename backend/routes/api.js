//routes/api.js 控管後端所有頁面部屬
const express = require('express')
const router = express.Router()
const env = require('dotenv')
env.config()

if (process.env.NODE_ENV === 'development') {
  //test
  console.log('running in dev mode')
}

//out
//login, loginFB, register, registerFB
router.use(require('./srcs/out/account/main'))
//forget, activation
router.use(require('./srcs/out/forget/main'))

//in
//check is user
router.use(require('./srcs/in/auth/isUser'))
//showVisual, chVisual, searchVisual
// router.use(require('./srcs/in/profile/main'))
//dashboard
router.use(require('./srcs/in/dashboard/main'))
//time
router.use('/time', require('./srcs/in/time/main').router)
//profile, searchProfile
router.use(require('./srcs/in/profile_new/main'))
//showPerson, chLogin, isLogin, logout
router.use(require('./srcs/in/account/main').router)
//column
router.use('/column', require('./srcs/in/column/main').router)
//searchJob, addJob, addRecruitment
router.use(require('./srcs/in/career/main'))
router.use(require('./srcs/in/recommendation/main'))
//study
router.use('/study', require('./srcs/in/study/main').router)
//abroadInfo
router.use(require('./srcs/in/abroadInfo/main').router)

//check is auth
router.use(require('./srcs/in/auth/isAuth'))
//column
router.use('/column', require('./srcs/in/column/main').router_auth)
//auth
// router.use(require('./srcs/in/auth/main'))
//account
router.use(require('./srcs/in/account/main').router_auth)
//study auth
router.use('/study', require('./srcs/in/study/main').router_auth)
//abroadInfo
router.use(require('./srcs/in/abroadInfo/main').router_auth)

//error handling, every error thrown by previous router will be catch by me
router.use(require('./error').handleError)

module.exports = router
