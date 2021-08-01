const {body} = require('express-validator');

module.exports=body('phone')
            .optional({nullable: true, checkFalsy: true})
            .isLength({min:10,max:10}).withMessage("號碼長度錯誤")
            .matches(/^0+9\d{8}$/).withMessage('號碼格式錯誤')