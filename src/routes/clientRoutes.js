const express = require('express');
const router = express.Router();
const controladorClientes = require('../controllers/clientController');

router.get('/clientes', controladorClientes.getTodosClientes);
router.post('/clientes', controladorClientes.criarCliente);
router.get('/clientes/:id', controladorClientes.getClientePorId);
router.put('/clientes/:id', controladorClientes.atualizarCliente);
router.delete('/clientes/:id', controladorClientes.deletarCliente);

module.exports = router;
