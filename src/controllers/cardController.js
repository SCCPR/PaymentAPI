const cartoes = [];

exports.getTodosCartoes = (req, res) => {
  if (cartoes.length === 0) {
    res.status(200).json({ mensagem: 'Nenhum cartão cadastrado' });
    return;
  }
  res.json(cartoes);
};

exports.criarCartao = (req, res) => {
  const cartao = req.body;
  if (cartao) {
    cartoes.push(cartao);
    res.status(201).json(cartao);
  }
  res.status(400).json({ mensagem: 'Os dados do cartão são obrigatórios' });
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
