const {bankAccounts} = require('../bancodedados');

/** Busca a lista com todas as contas
 * @return {object} lista de contas
 * Retorna a lista de contas, caso não existe retorna um msg de erro
 */
function checkAccounts() {
  const accountNumbers = bankAccounts.contas.length
  const accounts = bankAccounts.contas
  if (accountNumbers) {
    const mensagem = accountNumbers > 1 ?
    accountNumbers + ' contas encontradas: ' :
    accountNumbers + ' conta encontrada: '
    return ({mensagem: mensagem, accounts: accounts})
  }
  return ({mensagem: 'Não existem contas ativas', accounts: accounts})
}

/**
 * Verifica se a conta existe
 * @param {string} accountNumber numero da conta
 * @returns
 * Retorna a conta se não existir retorna erro
 */
function searchUserAccount(accountNumber) {
  console.log(accountNumber);
  if (!accountNumber) {
    return {erro: {erro: 'Informe um numero valido de conta'}}
  }
  const search = bankAccounts.contas.find((conta) => conta.numero == accountNumber)
  if (search) {
    return search
  }
  return {erro: {erro: 'Conta não existe'}}
}


module.exports = {checkAccounts, searchUserAccount}
