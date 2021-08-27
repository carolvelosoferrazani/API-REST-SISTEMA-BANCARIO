const {changeBankData, bankAccounts} = require('../bancodedados');

function deleteUserAccount(userAccount) {
  const index = bankAccounts.contas.findIndex((conta) => conta.numero == userAccount.numero)
  if (!userAccount.saldo) {
    bankAccounts.contas.splice(index, 1)
    changeBankData()
    return {mensagem: 'Conta Removida com sucesso'}
  }
  return {erro: 'Não é possivel deletar contas com saldo positivo'}
}

module.exports = {deleteUserAccount}
