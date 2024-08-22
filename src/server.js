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


const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`Servidor está rodando na port ${port}`);
});
