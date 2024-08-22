const agencias = [];

exports.getTodasAgencias = (req, res) => {
  if (agencias.length === 0) {
    res.status(404).json({ message: "Nenhuma agencia encontrada." })
  }
  res.status(201).json(agencias);
};

exports.criarAgencia = (req, res) => {
  const { id, nome, endereco } = req.body;

  if (!id || !nome || !endereco) {
    return res.status(400).json({ mensagem: 'Dados obrigatórios não fornecidos.' });
  }

  const agenciaExistente = agencias.find(a => a.id === id);
  if (agenciaExistente) {
    return res.status(400).json({ mensagem: 'Agência com este ID já existe.' });
  }


  const novaAgencia = { id, nome, endereco };
  agencias.push(novaAgencia);
  res.status(201).json(novaAgencia);
};

exports.getAgenciaPorId = (req, res) => {
  const id = parseInt(req.params.id);


  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const agencia = agencias.find(a => a.id === id);
  if (agencia) {
    res.json(agencia);
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};

exports.atualizarAgencia = (req, res) => {
  const id = parseInt(req.params.id);


  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = agencias.findIndex(a => a.id === id);
  if (index !== -1) {
    const { nome, endereco } = req.body;


    if (!nome || !endereco) {
      return res.status(400).json({ mensagem: 'Dados obrigatórios não fornecidos.' });
    }

    agencias[index] = { id, nome, endereco };
    res.json(agencias[index]);
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};

exports.deletarAgencia = (req, res) => {
  const id = parseInt(req.params.id);


  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = agencias.findIndex(a => a.id === id);
  if (index !== -1) {
    agencias.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Agência não encontrada' });
  }
};
