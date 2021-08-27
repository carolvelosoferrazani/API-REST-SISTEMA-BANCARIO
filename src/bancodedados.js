const fs = require('fs')

const requiredFields = {
  nome: '',
  cpf: '',
  data_nascimento: '',
  telefone: '',
  email: '',
  senha: '',
}

const accountKeys = Object.keys(requiredFields)

function changeBankData() {
  const json = JSON.stringify(bankAccounts, null, 2)
  fs.writeFileSync('accounts.json', json)
}

let bankAccounts;
try {
  bankAccounts = JSON.parse(fs.readFileSync('accounts.json').toString())
} catch {
  bankAccounts = {
    banco: {
      nome: 'Cubos Bank',
      numero: '123',
      agencia: '0001',
      senha: 'Cubos123Bank',
    },
    contas: [],
    saques: [],
    depositos: [],
    transferencias: [],
  }
}

module.exports = {
  changeBankData,
  bankAccounts,
  requiredFields,
  accountKeys,
}
