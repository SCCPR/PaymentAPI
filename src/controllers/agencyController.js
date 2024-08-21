const agencies = require('../models/agencyModel');

exports.getAllAgencies = (req, res) => {
  res.json(agencies);
};

exports.createAgency = (req, res) => {
  const agency = req.body;
  agencies.push(agency);
  res.status(201).json(agency);
};

exports.getAgencyById = (req, res) => {
  const agency = agencies.find(a => a.id === req.params.id);
  if (agency) {
    res.json(agency);
  } else {
    res.status(404).json({ message: 'Agency not found' });
  }
};

exports.updateAgency = (req, res) => {
  const index = agencies.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    agencies[index] = { ...agencies[index], ...req.body };
    res.json(agencies[index]);
  } else {
    res.status(404).json({ message: 'Agency not found' });
  }
};

exports.deleteAgency = (req, res) => {
  const index = agencies.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    agencies.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Agency not found' });
  }
};
