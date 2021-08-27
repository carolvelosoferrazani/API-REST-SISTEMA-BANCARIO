const {changeBankData, bankAccounts} = require('../bancodedados');

/**
 * Verifica o numero da ultima conta
 * @param {array} accounts array de contas
 * @return
 * Retorna um novo numero de conta
 */
function countNumberGenerator(accounts) {
  if (!accounts.length) {
    return '1'
  } else {
    return (Number(accounts[accounts.length-1].numero) + 1)
  }
}

/**
 * Gera uma nova conta
 * @param {object} countInformations body da requisição
 * @returns
 * Retorna a nova conta criada
 */
function createNewAccount(accountInformations) {
  const newAccountNumber = countNumberGenerator(bankAccounts.contas).toString()
  const createAccount = {
    numero: newAccountNumber,
    saldo: 0,
    usuario: {
      nome: accountInformations.nome,
      cpf: accountInformations.cpf,
      data_nascimento: accountInformations.data_nascimento,
      telefone: accountInformations.telefone,
      email: accountInformations.email,
      senha: accountInformations.senha,
    },
  }
  bankAccounts.contas.push(createAccount)
  changeBankData()
  return ({
    createAccount: createAccount,
  })
}


module.exports = {createNewAccount}

