const agencias = [];

exports.getTodasAgencias = (req, res) => {
  res.json(agencias);
};

exports.criarAgencia = (req, res) => {
  const agencia = req.body;
  agencias.push(agencia);
  res.status(201).json(agencia);
};

exports.getAgenciaPorId = (req, res) => {
  const agencia = agencias.find(a => a.id === parseInt(req.params.id));
  if (agencia) {
    res.json(agencia);
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};

exports.atualizarAgencia = (req, res) => {
  const id = parseInt(req.params.id);
  const index = agencias.findIndex(a => a.id === id);
  if (index !== -1) {
    agencias[index] = { id, ...req.body };
    res.json(agencias[index]);
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};

exports.deletarAgencia = (req, res) => {
  const id = parseInt(req.params.id);
  const index = agencias.findIndex(a => a.id === id);
  if (index !== -1) {
    agencias.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};
