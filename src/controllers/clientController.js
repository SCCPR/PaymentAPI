const clientes = [];

exports.getTodosClientes = (req, res) => {
  res.json(clientes);
};

exports.criarCliente = (req, res) => {
  const cliente = req.body;
  clientes.push(cliente);
  res.status(201).json(cliente);
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
