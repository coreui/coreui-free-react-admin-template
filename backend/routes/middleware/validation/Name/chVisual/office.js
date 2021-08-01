const {body} = require('express-validator');

module.exports=body('officenumber')
            .optional({nullable: true, checkFalsy: true})
            .isLength({min:7,max:8}).withMessage("號碼長度錯誤")
            .matches(/^2\d{7||8}$/).withMessage('號碼格式錯誤')