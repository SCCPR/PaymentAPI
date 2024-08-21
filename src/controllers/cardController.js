const cartoes = [];

exports.getTodosCartoes = (req, res) => {
  res.json(cartoes);
};

exports.criarCartao = (req, res) => {
  const cartao = req.body;
  cartoes.push(cartao);
  res.status(201).json(cartao);
};

exports.getCartaoPorId = (req, res) => {
  const cartao = cartoes.find(c => c.id === parseInt(req.params.id));
  if (cartao) {
    res.json(cartao);
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};

exports.atualizarCartao = (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartoes.findIndex(c => c.id === id);
  if (index !== -1) {
    cartoes[index] = { id, ...req.body };
    res.json(cartoes[index]);
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};

exports.deletarCartao = (req, res) => {
  const id = parseInt(req.params.id);
  const index = cartoes.findIndex(c => c.id === id);
  if (index !== -1) {
    cartoes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};
