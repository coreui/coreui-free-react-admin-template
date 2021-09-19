/**
 * @api {get} https://docs.google.com/forms/d/e/1FAIpQLSed-GXXBhqIRUBEX7-nMlwuQ3a22-Z51mtxVSlcyhWzG9TH2Q/formResponse get in touch
 * @apiName Contact
 * @apiGroup Out/contact
 * @apiDescription 用google表單蒐集站內信，統整在[google sheet](https://docs.google.com/spreadsheets/d/13ryrmVkQtOvHjr5I-h1atrqpBgkDOeixp1mFKwAK3U0/edit?resourcekey#gid=1383126660)
 *
 *
 * @apiParamExample {js} Input-Example:
 *  axios.get(url,{
 *    usp:'pp_url',
 *    'entry.1670134810':'your name',
 *    'entry.302205267':'your email',
 *    'entry.307115258':'your message'
 *  })
 */
