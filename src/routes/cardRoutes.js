const express = require('express');
const router = express.Router();
const controladorCartoes = require('../controllers/cardController');

router.get('/cartoes', controladorCartoes.getTodosCartoes);
router.post('/cartoes', controladorCartoes.criarCartao);
router.get('/cartoes/:id', controladorCartoes.getCartaoPorId);
router.put('/cartoes/:id', controladorCartoes.atualizarCartao);
router.delete('/cartoes/:id', controladorCartoes.deletarCartao);

module.exports = router;
