const transactions = require('../models/transactionModel');

exports.getAllTransactions = (req, res) => {
  res.json(transactions);
};

exports.createTransaction = (req, res) => {
  const transaction = req.body;
  transactions.push(transaction);
  res.status(201).json(transaction);
};

exports.getTransactionById = (req, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);
  if (transaction) {
    res.json(transaction);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
};

exports.updateTransaction = (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    transactions[index] = { ...transactions[index], ...req.body };
    res.json(transactions[index]);
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
};

exports.deleteTransaction = (req, res) => {
  const index = transactions.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    transactions.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
};
