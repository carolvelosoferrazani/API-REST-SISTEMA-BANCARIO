const {bankAccounts, accountKeys, requiredFields} = require('../bancodedados');
const {createNewAccount} = require('./createAccount');

let isCpf = false
let isEmail = false
let isFilledFields = true
let cpfError;
let emailError

/**
 * Verifica a quantidade de parametros
 * @param {object} body body da requisição
 * @returns
 * Mensagem de erro ou false
 */
function noRequiredParams(body) {
  const params = Object.keys(body.data).length
  if (body.method == 'POST' && params !== 6) {
    return {erro: 'É necessario informar todos os campos',
      exemple: requiredFields}
  } else if (!params) {
    return {erro: 'É necessario informar pelo menos um dos campos',
      exemple: requiredFields}
  }
  return false
}

/**
 * Valida os parametros
 * @param {object} object recebe o body da requisição
 * @returns
 * Uma nova chamada pra outra validação ou uma msg de erro
 */
function checkfields(body) {
  for (const field in body.data) {
    if (!accountKeys.includes(field)) {
      isFilledFields = false
      return {erro: field.toUpperCase() + ' não é um campo valido',
        exemple: requiredFields}
    }
  } if (isFilledFields) {
    return fieldValidation(body)
  }
}

/**
 * Verifica se os campos foram preenchidos e se existe cpf e email
 * @param {object} userData recebe o body da requisição
 * @returns
 */
function fieldValidation(body) {
  for (const key in body.data) {
    if (key == 'cpf') {
      isCpf = true
    } else if (key == 'email') {
      isEmail = true
    } else if (!body.data[key]) {
      isFilledFields = false
      return {erro: `O campo '${key.toUpperCase()}' está vazio.`}
    }
  } if (body.method == 'POST') {
    return dataValidationPost(body.data)
  } else {
    return dataValidationPatch(body.data)
  }
}

/**
 * Valida os dados para a criação da conta
 * @param {object} body body da requisição
 * @returns
 * Retorna uma chamada para a função de criar nova conta ou erro
 */
function dataValidationPost(body) {
  if (bankAccounts.contas.length) {
    cpfError = cpfValidator(body.cpf)
    emailError = emailValidator(body.email)
    if (!cpfError && !emailError) {
      return createNewAccount(body)
    } else {
      return cpfError ? cpfError : emailError
    }
  } else {
    return createNewAccount(body)
  }
}
/**
 * Valida CPF/EMAIL do PATCH
 * @param {object} body body da requisição
 * @returns
 * Mensagem de erro ou nada
 */
function dataValidationPatch(body) {
  if (isCpf && isEmail) {
    cpfError = cpfValidator(body.cpf)
    emailError = emailValidator(body.email)
    if (cpfError && emailError) {
      return cpfError ? cpfError : emailError
    }
  } else if (isCpf) {
    cpfError = cpfValidator(body.cpf)
    if (cpfError) {
      return cpfError
    }
  } else if (isEmail) {
    emailError = emailValidator(body.email)
    if (isEmail) {
      return emailError
    }
  }
}
/**
   * Verifica se o cpf é unico
   * @param {string} cpf
   * @return {object}
   * Retorna um objeto contendo resp:200 para ok ou 400 e uma msg de erro
   */
function cpfValidator(cpf) {
  for (const count of bankAccounts.contas) {
    if (count.usuario.cpf == cpf) {
      return {erro: 'CPF já existe'}
    }
  }
}

/**
   * Verifica se o email é unico
   * @param {string} email
   * @return {object}
   * Retorna um objeto contendo resp:200 para ok ou 400 e uma msg de erro
   */
function emailValidator(email) {
  for (const count of bankAccounts.contas) {
    if (count.usuario.email == email) {
      return {erro: 'Email já existe'}
    }
  }
}

module.exports = {checkfields, noRequiredParams}
