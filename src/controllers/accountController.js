const User = require('PaymentAPI/user.js');
const contas = [];



exports.getTodasContas = (req, res) => {
  if (contas.length === 0) {
    res.status(404).json({ messagem: "Nenhuma conta disponivel." })
  }
  res.json(contas);
};


exports.criarConta = (req, res) => {
  const { name, idade } = req.body;
  if (name.length > 4 && idade >= 18) {
    const novaConta = new User(name, idade);
    contas.push(novaConta);
    res.status(201).json(novaConta);
  }
  res.status(400).json({ mensagem: 'Os dados da conta são obrigatórios' });
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
  const { name, idade } = req.body;

  if (index !== -1 && name.length > 4 && idade >= 18) {
    contas[index] = new User(name, idade);
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
