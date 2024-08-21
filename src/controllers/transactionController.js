const transacoes = [];

exports.getTodasTransacoes = (req, res) => {
  if (transacoes.length === 0) {
    res.status(404).json({ mensagem: 'Nenhuma transacao econtrada.' });
    return;
  }
  res.json(transacoes);
};

exports.criarTransacao = (req, res) => {
  const transacao = req.body;
  if (transacao) {

    transacoes.push(transacao)
    res.status(201).json(transacao);
  }
  res.status(400).json({ mensagem: 'Os dados da transacao são obrigatórios' });
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
