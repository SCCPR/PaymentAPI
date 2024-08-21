const cards = require('../models/cardModel');

exports.getAllCards = (req, res) => {
  res.json(cards);
};

exports.createCard = (req, res) => {
  const card = req.body;
  cards.push(card);
  res.status(201).json(card);
};

exports.getCardById = (req, res) => {
  const card = cards.find(c => c.id === req.params.id);
  if (card) {
    res.json(card);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};

exports.updateCard = (req, res) => {
  const index = cards.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    cards[index] = { ...cards[index], ...req.body };
    res.json(cards[index]);
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};

exports.deleteCard = (req, res) => {
  const index = cards.findIndex(c => c.id === req.params.id);
  if (index !== -1) {
    cards.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Card not found' });
  }
};
