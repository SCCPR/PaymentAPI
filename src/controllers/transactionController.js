const transacoes = [];

exports.getTodasTransacoes = (req, res) => {
  res.json(transacoes);
};

exports.criarTransacao = (req, res) => {
  const transacao = req.body;
  transacoes.push(transacao);
  res.status(201).json(transacao);
};

exports.getTransacaoPorId = (req, res) => {
  const transacao = transacoes.find(t => t.id === parseInt(req.params.id));
  if (transacao) {
    res.json(transacao);
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};

exports.atualizarTransacao = (req, res) => {
  const id = parseInt(req.params.id);
  const index = transacoes.findIndex(t => t.id === id);
  if (index !== -1) {
    transacoes[index] = { id, ...req.body };
    res.json(transacoes[index]);
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};

exports.deletarTransacao = (req, res) => {
  const id = parseInt(req.params.id);
  const index = transacoes.findIndex(t => t.id === id);
  if (index !== -1) {
    transacoes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};
