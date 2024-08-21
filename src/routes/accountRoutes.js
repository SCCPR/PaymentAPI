const express = require('express');
const router = express.Router();
const controladorContas = require('../controllers/accountController');

router.get('/contas', controladorContas.getTodasContas);
router.post('/contas', controladorContas.criarConta);
router.get('/contas/:id', controladorContas.getContaPorId);
router.put('/contas/:id', controladorContas.atualizarConta);
router.delete('/contas/:id', controladorContas.deletarConta);

module.exports = router;
