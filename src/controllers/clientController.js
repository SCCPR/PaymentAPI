const clientes = [];

exports.getTodosClientes = (req, res) => {
  if (clientes.length === 0) {
    res.status(404).json({ mensagem: 'Nenhum cliente cadastrado' });
  } else {
    res.json(clientes);
  }
};

exports.criarCliente = (req, res) => {
  const { id, nome, email } = req.body;


  if (!id || !nome || !email) {
    return res.status(400).json({ mensagem: 'Os dados do cliente são obrigatórios' });
  }

  const clienteExistente = clientes.find(c => c.id === id);
  if (clienteExistente) {
    return res.status(400).json({ mensagem: 'Cliente com este ID já existe.' });
  }

  const novoCliente = { id, nome, email };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
};

exports.getClientePorId = (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const cliente = clientes.find(c => c.id === id);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};

exports.atualizarCliente = (req, res) => {
  const id = parseInt(req.params.id);


  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    const { nome, email } = req.body;

    if (!nome || !email) {
      return res.status(400).json({ mensagem: 'Os dados do cliente são obrigatórios' });
    }

    clientes[index] = { id, nome, email };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};

exports.deletarCliente = (req, res) => {
  const id = parseInt(req.params.id);


  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido.' });
  }

  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    clientes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};
