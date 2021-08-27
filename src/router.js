const express = require('express');
const {listAccounts, newAccount, patchAccount, deleteAccount, depositAccount, transferAccout, balance, saqueAccout, extract} = require('./controller/respMethods')
const {checkPassword} = require('./middleware');

const router = express()

router.get('/contas', checkPassword)

router.get('/contas', listAccounts)

router.post('/contas', newAccount)

router.patch('/contas/:numeroConta/usuario', patchAccount)

router.delete('/contas/:numeroConta', deleteAccount)

router.post('/transacoes/depositar', depositAccount)

router.post('/transacoes/transferir', transferAccout)

router.get('/contas/saldo', balance)

router.post('/transacoes/sacar', saqueAccout)

router.get('/contas/extrato', extract)

// router.post('/contas', )

module.exports = router

