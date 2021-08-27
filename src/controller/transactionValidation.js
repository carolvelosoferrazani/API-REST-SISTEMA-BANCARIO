const {searchUserAccount} = require('./searchAccounts')
const {extractGenerator} = require('./transactions')

function passwordValidation(bodyPassword, userPassword) {
  if (!bodyPassword) {
    return {erro:'É preciso informar a senha'}
  }
  if (bodyPassword !== userPassword) {
    return {erro: 'Senha invalida'}
  }
}

function saldoValidation(saldo, transactionValue) {
  if (!saldo|| saldo < transactionValue) {
    return {erro: 'saldo insuficiente', saldo_atual: saldo}
  }
}

function transactionValidation(body) {
  const userAccount = searchUserAccount(body.numero)
  if (userAccount.erro) {
    return userAccount.erro
  } const password = passwordValidation(body.senha, userAccount.usuario.senha)
  if (password) {
    return password
  } if (body.value) {
    const transactioValidation = saldoValidation(userAccount.saldo, body.value)
    if (transactioValidation) {
      return transactioValidation
    }
  } else {
    return {erro:{erro: 'Informe um valor valido para a transação'}}
  }
  return userAccount
}

function depositValidation(body) {
  if (body.value) {
    return searchUserAccount(body.numero)
  }
  return {mesagem: 'Informe um valor valido para deposito'}
}

function viewBalance(body, extract = false) {
  const userAccount = searchUserAccount(body.numero)
  if (userAccount.erro) {
    return userAccount.erro
  } const password = passwordValidation(body.senha, userAccount.usuario.senha)
  if (password) {
    return password
  }
  if (extract) {
    return extractGenerator(body.numero)
  }
  return {conta: userAccount.numero, saldo: userAccount.saldo}
}
module.exports = {depositValidation, viewBalance, transactionValidation}
