// src/app.js
const prompt = require('prompt-sync')({ sigint: true });
const axios = require('axios');

const apiUrl = 'http://localhost:3000'; // URL da sua API

function exibirMenu() {
  console.log(`
  ----------------------------------
  --- Menu de Gerenciamento Bancário ---
  ----------------------------------
  1. Adicionar Cliente
  2. Listar Clientes
  3. Adicionar Conta
  4. Listar Contas
  5. Realizar Transação
  6. Listar Transações
  7. Adicionar Categoria
  8. Listar Categorias
  9. Sair
  `);
}

async function adicionarCliente() {
  const nome_cliente = prompt('Nome do Cliente: ');
  const data_nascimento = prompt('Data de Nascimento (YYYY-MM-DD): ');
  const numero_conta = prompt('Número da Conta: ');
  const saldo = parseFloat(prompt('Saldo Inicial: '));

  try {
    await axios.post(`${apiUrl}/clientes`, { nome_cliente, data_nascimento, numero_conta, saldo });
    console.log('Cliente adicionado com sucesso!');
  } catch (error) {
    console.log('Erro ao adicionar cliente:', error.response.data.message);
  }
}

async function listarClientes() {
  try {
    const response = await axios.get(`${apiUrl}/clientes`);
    response.data.forEach((cliente, i) => {
      console.log(`${i + 1}. ${cliente.nome_cliente} - Conta: ${cliente.numero_conta} - Saldo: ${cliente.saldo}`);
    });
  } catch (error) {
    console.log('Erro ao listar clientes:', error.response.data.message);
  }
}

async function adicionarConta() {
  const numero_conta = prompt('Número da Conta: ');
  const id_cliente = parseInt(prompt('ID do Cliente Associado: '));

  try {
    await axios.post(`${apiUrl}/contas`, { numero_conta, id_cliente });
    console.log('Conta adicionada com sucesso!');
  } catch (error) {
    console.log('Erro ao adicionar conta:', error.response.data.message);
  }
}

async function listarContas() {
  try {
    const response = await axios.get(`${apiUrl}/contas`);
    response.data.forEach((conta, i) => {
      console.log(`${i + 1}. Conta: ${conta.numero_conta} - ID Cliente: ${conta.id_cliente}`);
    });
  } catch (error) {
    console.log('Erro ao listar contas:', error.response.data.message);
  }
}

async function realizarTransacao() {
  const id_cliente_envio = parseInt(prompt('ID do Cliente que está enviando: '));
  const id_cliente_recebimento = parseInt(prompt('ID do Cliente que está recebendo: '));
  const valor = parseFloat(prompt('Valor da Transação: '));
  const tipo_transacao = prompt('Tipo de Transação (pix, depósito bancário, etc.): ');

  try {
    await axios.post(`${apiUrl}/transacoes`, { id_cliente_envio, id_cliente_recebimento, valor, tipo_transacao });
    console.log('Transação realizada com sucesso!');
  } catch (error) {
    console.log('Erro ao realizar transação:', error.response.data.message);
  }
}

async function listarTransacoes() {
  try {
    const response = await axios.get(`${apiUrl}/transacoes`);
    response.data.forEach((transacao, i) => {
      console.log(`${i + 1}. ${transacao.tipo_transacao} - Valor: ${transacao.valor} - Data: ${transacao.data}`);
    });
  } catch (error) {
    console.log('Erro ao listar transações:', error.response.data.message);
  }
}

async function adicionarCategoria() {
  const nome_categoria = prompt('Nome da Categoria: ');

  try {
    await axios.post(`${apiUrl}/categorias`, { nome_categoria });
    console.log('Categoria adicionada com sucesso!');
  } catch (error) {
    console.log('Erro ao adicionar categoria:', error.response.data.message);
  }
}

async function listarCategorias() {
  try {
    const response = await axios.get(`${apiUrl}/categorias`);
    response.data.forEach((categoria, i) => {
      console.log(`${i + 1}. ${categoria.nome_categoria}`);
    });
  } catch (error) {
    console.log('Erro ao listar categorias:', error.response.data.message);
  }
}

async function mostrarMenu() {
  exibirMenu();
  const opcao = prompt('Escolha uma opção: ');

  switch (opcao) {
    case '1':
      await adicionarCliente();
      break;
    case '2':
      await listarClientes();
      break;
    case '3':
      await adicionarConta();
      break;
    case '4':
      await listarContas();
      break;
    case '5':
      await realizarTransacao();
      break;
    case '6':
      await listarTransacoes();
      break;
    case '7':
      await adicionarCategoria();
      break;
    case '8':
      await listarCategorias();
      break;
    case '9':
      console.log('Saindo do sistema. Até logo!');
      return;
    default:
      console.log('Opção inválida. Tente novamente.');
  }
  mostrarMenu();
}

mostrarMenu();
