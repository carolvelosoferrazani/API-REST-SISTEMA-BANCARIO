const {changeBankData} = require('../bancodedados');

/**
 * Modifica a conta do usuario
 * @param {object} body body da requisição
 * @param {object} userAccount conta que sera modificada
 * @returns
 * Mensagem de sucesso ou erro
 */
function changeAccounts(body, userAccount) {
  const userAccountKeys = Object.keys(userAccount.usuario)
  for (const key in body.data) {
    if (userAccountKeys.includes(key)) {
      userAccount.usuario[key] = body.data[key]
    }
  }changeBankData()
  return {mensagem: 'Conta atualizada com sucesso!'}
}
module.exports = {changeAccounts}
