const clientes = [];

exports.getTodosClientes = (req, res) => {
  if (clientes.length === 0) {
    res.status(404).json({ mensagem: 'Nenhum cliente cadastrado' });
    return;
  }
  res.status(404).json(clientes);
};

exports.criarCliente = (req, res) => {
  const cliente = req.body;
  if (cliente) {
    clientes.push(cliente);
    res.status(201).json(cliente);
  }
  res.status(400).json({ mensagem: 'Os dados do cliente são obrigatórios' });
};

exports.getClientePorId = (req, res) => {
  const cliente = clientes.find(c => c.id === parseInt(req.params.id));
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};

exports.atualizarCliente = (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    clientes[index] = { id, ...req.body };
    res.json(clientes[index]);
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};

exports.deletarCliente = (req, res) => {
  const id = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === id);
  if (index !== -1) {
    clientes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Cliente não encontrado' });
  }
};
