const {changeBankData, bankAccounts} = require('../bancodedados');

function createData() {
  const dataAtual = new Date();
  const d = dataAtual.getDate();
  const mes = (dataAtual.getMonth() + 1);
  const a = dataAtual.getFullYear();
  const h = dataAtual.getHours();
  const m = dataAtual.getMinutes();
  const s = dataAtual.getSeconds()
  const data = d + '-' + mes + '-' + a + '  ' + h + ':' + m + ':' + (s < 10 ? '0' + s : s)
  return data
}

function deposit(body, userAccount) {
  userAccount.saldo += body.value
  const registro = {
    data: createData(),
    numero_conta: body.numero,
    valor: body.value,
  }
  bankAccounts.depositos.push(registro)
  changeBankData()
  return {mensagem: 'Depósito realizado com sucesso!'}
}

function transfer(origem, destino, transferValue) {
  if (destino.numero == origem.numero) {
    return {erro: {erro: 'Conta de origem igual a de destino'}}
  }
  const registro = {
    data: createData(),
    numero_conta_origem: origem.numero,
    numero_conta_destino: destino.numero,
    valor: transferValue,
  }
  destino.saldo += transferValue
  origem.saldo -= transferValue
  bankAccounts.transferencias.push(registro)
  changeBankData()
  return {mensagem: 'Transferencia realizada com sucesso!'}
}

function saque(transactionValue, userAccount) {
  userAccount.saldo -= transactionValue
  const registro = {
    data: createData(),
    numero_conta: userAccount.numero,
    valor: transactionValue,
  }
  bankAccounts.saques.push(registro)
  changeBankData()
  return {mensagem: 'Saque realizado com sucesso!'}
}

function extractGenerator(accountNumber) {
  const extrato = {}
  const extratoTemplate = ['depositos', 'saques', 'trasnferencias_enviadas', 'trasnferencias_recebidas']
  for (const keys of extratoTemplate) {
    let accountProp = 'numero_conta'
    let extratokey = keys
    if (keys == 'trasnferencias_enviadas') {
      accountProp = 'numero_conta_origem'
      extratokey = 'transferencias'
    } else if (keys == 'trasnferencias_recebidas') {
      accountProp = 'numero_conta_destino'
      extratokey = 'transferencias'
    }
    extrato[keys] = bankAccounts[extratokey].filter((account) => account[accountProp] == accountNumber)
  }
  return extrato
}
module.exports = {deposit, transfer, extractGenerator, saque}
