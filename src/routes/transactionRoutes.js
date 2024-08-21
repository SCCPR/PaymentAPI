const express = require('express');
const router = express.Router();
const controladorTransacoes = require('../controllers/transactionController');

router.get('/transacoes', controladorTransacoes.getTodasTransacoes);
router.post('/transacoes', controladorTransacoes.criarTransacao);
router.get('/transacoes/:id', controladorTransacoes.getTransacaoPorId);
router.put('/transacoes/:id', controladorTransacoes.atualizarTransacao);
router.delete('/transacoes/:id', controladorTransacoes.deletarTransacao);

module.exports = router;
