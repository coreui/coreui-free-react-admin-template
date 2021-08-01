/**
 * @api {post} /testRoute testRoute
 * @apiName TestRoute
 * @apiGroup Test
 * @apiDescription 給定post，回傳一樣的內容
 *
 * @apiparam {any} - 任何東西
 * 
 * @apiSuccess {any} - 回傳一樣的內容
 */

module.exports = function (req, res, next)
{
    console.log("test Route recieve",req.body);
    return res.send(req.body);
}