const { JSDOM } = require('jsdom')
const jquery = require('jquery')
const path = require('path')
const { ErrorHandler } = require('../../../../error')
/**
 * generate email with beautiful button
 * @return  {String} html text
 */
module.exports = async (link) => {
  const DOM = await JSDOM.fromFile(path.join(__dirname, './accountActivate.html'), {
    contentType: 'text/html',
  }).catch((e) => {
    console.log(e.message)
    throw new ErrorHandler(500, '信件範本讀取失敗')
  })
  const { window } = DOM
  const $ = jquery(window)
  $('#start').attr('href', link)
  return window.document.documentElement.outerHTML
}
