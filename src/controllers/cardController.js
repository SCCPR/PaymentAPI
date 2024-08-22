const cartoes = [];

const validarDadosCartao = (cartao) => {
  if (!cartao || typeof cartao !== 'object') {
    return false;
  }
  const { id, nome, validade } = cartao;
  return typeof id === 'number' && typeof nome === 'string' && nome.trim() !== '' && typeof validade === 'string' && validade.trim() !== '';
};

exports.getTodosCartoes = (req, res) => {
  if (cartoes.length === 0) {
    res.status(200).json({ mensagem: 'Nenhum cartão cadastrado' });
    return;
  }
  res.json(cartoes);
};

exports.criarCartao = (req, res) => {
  const cartao = req.body;

  // Validação dos dados do cartão
  if (validarDadosCartao(cartao)) {
    cartoes.push(cartao);
    res.status(201).json(cartao);
  } else {
    res.status(400).json({ mensagem: 'Os dados do cartão são obrigatórios e devem ser válidos' });
  }
};

exports.getCartaoPorId = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido' });
  }

  const cartao = cartoes.find(c => c.id === id);

  if (cartao) {
    res.json(cartao);
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};

exports.atualizarCartao = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido' });
  }

  const index = cartoes.findIndex(c => c.id === id);

  if (index !== -1) {
    const novoCartao = { id, ...req.body };

    // Validação dos dados do cartão
    if (validarDadosCartao(novoCartao)) {
      cartoes[index] = novoCartao;
      res.json(cartoes[index]);
    } else {
      res.status(400).json({ mensagem: 'Os dados do cartão são obrigatórios e devem ser válidos' });
    }
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};

exports.deletarCartao = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ mensagem: 'ID inválido' });
  }

  const index = cartoes.findIndex(c => c.id === id);

  if (index !== -1) {
    cartoes.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ mensagem: 'Cartão não encontrado' });
  }
};
