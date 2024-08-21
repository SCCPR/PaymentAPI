const express = require('express');
const app = express();

const clientRoutes = require('./routes/clientRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const cardRoutes = require('./routes/cardRoutes');

app.use(express.json());

app.use('/api', clientRoutes);
app.use('/api', accountRoutes);
app.use('/api', transactionRoutes);
app.use('/api', agencyRoutes);
app.use('/api', cardRoutes);

module.exports = app;
