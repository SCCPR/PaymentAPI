const accounts = require('../models/accountModel');

exports.getAllAccounts = (req, res) => {
  res.json(accounts);
};

exports.createAccount = (req, res) => {
  const account = req.body;
  accounts.push(account);
  res.status(201).json(account);
};

exports.getAccountById = (req, res) => {
  const account = accounts.find(a => a.id === req.params.id);
  if (account) {
    res.json(account);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

exports.updateAccount = (req, res) => {
  const index = accounts.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    accounts[index] = { ...accounts[index], ...req.body };
    res.json(accounts[index]);
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};

exports.deleteAccount = (req, res) => {
  const index = accounts.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    accounts.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Account not found' });
  }
};
