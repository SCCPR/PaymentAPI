const transacoes = [];

exports.getTodasTransacoes = (req, res) => {
  if (transacoes.length === 0) {
    res.status(404).json({ mensagem: 'Nenhuma transação encontrada.' });
  } else {
    res.json(transacoes);
  }
};

exports.criarTransacao = (req, res) => {
  const { id, valor, descricao } = req.body;

  if (!id || valor === undefined || !descricao) {
    return res.status(400).json({ mensagem: 'Os dados da transação são obrigatórios' });
  }

  const transacaoExistente = transacoes.find(t => t.id === id);
  if (transacaoExistente) {
    return res.status(400).json({ mensagem: 'Transação com este ID já existe.' });
  }

  const novaTransacao = { id, valor, descricao };
  transacoes.push(novaTransacao);
  res.status(201).json(novaTransacao);
};

exports.getTransacaoPorId = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const transacao = transacoes.find(t => t.id === id);
  if (transacao) {
    res.json(transacao);
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};

exports.atualizarTransacao = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = transacoes.findIndex(t => t.id === id);
  if (index !== -1) {
    const { valor, descricao } = req.body;

    if (valor === undefined || !descricao) {
      return res.status(400).json({ mensagem: 'Os dados da transação são obrigatórios' });
    }

    transacoes[index] = { id, valor, descricao };
    res.json(transacoes[index]);
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};

exports.deletarTransacao = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = transacoes.findIndex(t => t.id === id);
  if (index !== -1) {
    transacoes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Transação não encontrada' });
  }
};
