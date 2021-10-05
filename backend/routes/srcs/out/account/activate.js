const asyncHandler = require('express-async-handler')
const Pending = require('../../../Schemas/user_pending')
const Login = require('../../../Schemas/user_login')
const Visual = require('../../../Schemas/user_visual_new')
const { ErrorHandler, dbCatch } = require('../../../error')

/**
 * @api {get} /regact/:account/:active accountActivate
 * @apiName Register
 * @apiGroup Out/account
 * @apiDescription 註冊後用信箱寄這個連結，驗證。完成後自動導向
 * 
 * @apiHeaderExample {json} config
                 { "content-type": "multipart/form-data" }
 *
 * @apiparam {String} account 學號
 * @apiparam {String} active 驗證碼
 * 
 * @apiSuccess (201) {HTML} - - 
 * 
 * @apiError (400) {String} description 請添加照片
 * @apiError (403) {String} description 帳號已存在
 * 
 * @apiError (500) {String} description 資料庫錯誤
 */

template = (msg, link) => `<!DOCTYPE html>
<html>
   <body>
      <script>
         let count = 5
         setInterval(function(){
             if(count>1){
                 const counter = document.getElementById('counter');
                 console.log(counter)
                 count -= 1
                counter.innerHTML = (count)
            }else{
                window.location.href = "${link}";
            }
         }, 1000);
      </script>
      <h2>${msg}, redirecting to <a href='${link}'>${link}</a> after <strong id='counter'>5</strong> seconds</h2>
   </body>
</html>`

const main = async (req, res) => {
  try {
    const { account, active } = req.params
    if (!account || !active) throw new ErrorHandler(400, 'some params missing')
    //check user validation
    const doc = await Pending.findOneAndDelete({ account, active }).catch(dbCatch)
    if (!doc) return res.send(template('activation code expire', '/#/register_entry'))
    const userexist = await Login.exists({ account }).catch(dbCatch)
    if (userexist) return res.send(template('already registered', '/#/login'))
    //register
    const { username, userpsw, facebookID, email } = doc
    const { _id: visual } = await new Visual({
      username,
      account,
      publicEmail: email,
    })
      .save()
      .catch(dbCatch)
    await new Login({ username, account, facebookID, userpsw, visual }).save().catch(async (e) => {
      await Visual.findByIdAndRemove(visual).catch(dbCatch)
      console.log(e)
      throw new ErrorHandler(500, '資料庫錯誤')
    })
    res.send(template('account activate success', '/#/login'))
  } catch (e) {
    res.send(template(`error: ${e.message || e.description}`, '/#/login'))
  }
}

const valid = require('../../../middleware/validation')
const rules = [{ filename: 'account', checkAt: 'params' }]
module.exports = [valid(rules), asyncHandler(main)]
