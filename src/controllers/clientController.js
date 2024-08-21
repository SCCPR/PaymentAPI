const clients = require('../models/clientModel');

exports.getAllClients = (req, res) => {
  res.json(clients);
};

exports.createClient = (req, res) => {
  const client = req.body;
  clients.push(client);
  res.status(201).json(client);
};

exports.getClientById = (req, res) => {
  const client = clients.find(c => c.id === req.params.id);
  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

exports.updateClient = (req, res) => {
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    clients[index] = { ...clients[index], ...req.body };
    res.json(clients[index]);
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};

exports.deleteClient = (req, res) => {
  const index = clients.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    clients.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Client not found' });
  }
};
