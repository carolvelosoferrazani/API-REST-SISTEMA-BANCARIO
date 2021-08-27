/**
 * verifica se a senha está correta
 * @param {*} req
 * @param {*} res
 * @param {*} next segue para a prox req
 */
function checkPassword(req, res, next) {
  if (req.method === 'GET' && req.query.senha === '123456') {
    res.status(200)
    next()
  } else {
    res.status(401)
    res.send(`<h1>Denied Access<h1><h2 style="color: red">Wrong Password<h2>`)
  }
}

module.exports = {checkPassword}
