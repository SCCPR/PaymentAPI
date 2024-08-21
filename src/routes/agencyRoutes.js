const express = require('express');
const router = express.Router();
const controladorAgencias = require('../controllers/agencyController');

router.get('/agencias', controladorAgencias.getTodasAgencias);
router.post('/agencias', controladorAgencias.criarAgencia);
router.get('/agencias/:id', controladorAgencias.getAgenciaPorId);
router.put('/agencias/:id', controladorAgencias.atualizarAgencia);
router.delete('/agencias/:id', controladorAgencias.deletarAgencia);

module.exports = router;
