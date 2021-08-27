const {checkAccounts, searchUserAccount} = require('./searchAccounts')
const {noRequiredParams, checkfields} = require('./bodyValidation')
const {changeAccounts} = require('./changeAccount')
const {deleteUserAccount} = require('./deleteAccount')
const {depositValidation, transactionValidation, viewBalance} = require('./transactionValidation')
const {deposit, transfer, saque} = require('./transactions')

/**
 * get lista de contas ativas
 * @param {requisição} req
 * @param {resposta} res retorna a lista de contas
 */
function listAccounts(req, res) {
  res.json(checkAccounts())
}

function newAccount(req, res) {
  const accountData = {
    data: req.body,
    method: req.method,
  }
  const accountDataError = noRequiredParams(accountData)
  if (accountDataError) {
    res.status(400)
    res.json(accountDataError)
    return;
  } else {
    res.json(checkfields(accountData))
    return;
  }
}

function patchAccount(req, res) {
  const accountData = {
    data: req.body,
    method: req.method,
    accountNumber: req.params.numeroConta,
  }
  const accountDataError = noRequiredParams(accountData)
  const userAccount = searchUserAccount(accountData.accountNumber)
  if (userAccount.erro || accountDataError) {
    res.status(400)
    res.json(userAccount.erro ? userAccount.erro: accountDataError)
    return;
  }
  const checkfieldsError = checkfields(accountData)
  if (checkfieldsError) {
    res.status(400)
    res.json(checkfieldsError)
    return;
  }
  return res.json(changeAccounts(accountData, userAccount))
}

function deleteAccount(req, res) {
  const userAccount = searchUserAccount(req.params.numeroConta)
  if (userAccount.erro) {
    res.status(400)
    res.json(userAccount.erro)
    return;
  } else {
    res.json(deleteUserAccount(userAccount))
  }
}

function depositAccount(req, res) {
  const transaction = depositValidation(req.body)
  if (transaction.erro) {
    res.status(401)
    res.json(transaction.erro)
    return;
  }
  const depositar = deposit(req.body, transaction)
  res.json(depositar)
}
function saqueAccout(req, res) {
  const saqueValue = req.body
  const userAccount = transactionValidation(saqueValue)
  console.log(userAccount.erro);
  if (userAccount.erro) {
    res.status(400)
    res.json(userAccount)
    return;
  }res.json(saque(saqueValue.value, userAccount))
}
function transferAccout(req, res) {
  const transferValue = req.body.origem
  const destino = searchUserAccount(req.body.destino.numero)
  const origem = transactionValidation(transferValue)
  if (origem.erro || destino.erro) {
    res.status(400)
    res.json(origem.erro? origem.erro: {erro: 'Conta de destino não existe'})
    return;
  }res.json(transfer(origem, destino, transferValue.value))
}

function balance(req, res) {
  const userBalance = viewBalance({
    numero: req.query.numero_conta,
    senha: req.query.senha,
  })
  if (userBalance.erro) {
    res.status(400)
    res.json(userBalance)
    return;
  }
  res.json(userBalance)
}

function extract(req, res) {
  const userData = {
    numero: req.query.numero_conta,
    senha: req.query.senha,
  }
  const userExtract = viewBalance(userData, true)
  if (userExtract.erro) {
    res.status(400)
    res.json(userExtract)
    return;
  }
  res.json(userExtract)
}
module.exports = {listAccounts, newAccount, patchAccount, deleteAccount, depositAccount, transferAccout, balance, saqueAccout, extract}
