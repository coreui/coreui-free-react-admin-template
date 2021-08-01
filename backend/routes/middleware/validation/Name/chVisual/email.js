const {body} = require('express-validator');

module.exports=body('Email')
            .optional({nullable: true, checkFalsy: true})
            .normalizeEmail()
            .isEmail().withMessage('郵件格式錯誤')