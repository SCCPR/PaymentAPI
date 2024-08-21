const contas = [];


exports.getTodasContas = (req, res) => {
  if (contas.length === 0) {
    res.status(404).json({ messagem: "Nenhuma conta disponivel." })
  }
  res.json(contas);
};


exports.criarConta = (req, res) => {
  const conta = req.body;
  if (conta) {
    contas.push(conta);
    res.status(201).json(conta);
  }
  res.status(400).json({ messagem: 'Os dados da conta são obrigatórios' });
};



exports.getContaPorId = (req, res) => {
  const conta = contas.find(c => c.id === parseInt(req.params.id));
  if (conta) {
    res.json(conta);
  } else {
    res.status(404).json({ mensagem: 'Conta não encontrada' });
  }
};


exports.atualizarConta = (req, res) => {
  const id = parseInt(req.params.id);
  const index = contas.findIndex(c => c.id === id);
  if (index !== -1) {
    contas[index] = { id, ...req.body };
    res.json(contas[index]);
  } else {
    res.status(404).json({ mensagem: 'Conta não encontrada' });
  }
};


exports.deletarConta = (req, res) => {
  const id = parseInt(req.params.id);
  const index = contas.findIndex(c => c.id === id);
  if (index !== -1) {
    contas.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Conta não encontrada' });
  }
};
