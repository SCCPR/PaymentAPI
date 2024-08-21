const express = require('express');
const app = express();

const rotasClientes = require('./routes/clientRoutes');
const rotasContas = require('./routes/accountRoutes');
const rotasTransacoes = require('./routes/transactionRoutes');
const rotasAgencias = require('./routes/agencyRoutes');
const rotasCartoes = require('./routes/cardRoutes');

app.use(express.json());

app.use('/api', rotasClientes);
app.use('/api', rotasContas);
app.use('/api', rotasTransacoes);
app.use('/api', rotasAgencias);
app.use('/api', rotasCartoes);

module.exports = app;
