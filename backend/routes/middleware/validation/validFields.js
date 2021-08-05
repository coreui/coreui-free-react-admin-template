//{key:url,value:files to import from Name folder}
module.exports = {
  register: ['username', 'account', 'password', 'ConfirmPassword'],
  registerFB: ['username', 'account', 'facebookID'],
  login: ['account', 'password'],
  loginFB: ['facebookID'],
  forget: ['account'], //,"question","Email","password","ConfirmPassword"],
  chLogin: ['question'],
  chPassword: ['chPassword/oldpassword', 'chPassword/newpassword'],
  activation: ['account', 'password'],
  searchVisual: ['account.data'],
  chVisual: [
    'chVisual/account',
    'chVisual/phone',
    'chVisual/homenumber',
    'chVisual/email',
    'chVisual/office',
  ],
  addColumn: ['column/detail_id', 'column/filename', 'column/outline_id'],
  getDetail: ['column/id'],
}
