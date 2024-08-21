// src/controllers.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dados Iniciais
let clientes = [];
let contas = [];
let transacoes = [];
let categorias = [];

// Endpoints

// Adicionar Cliente
app.post('/clientes', (req, res) => {
    const { nome_cliente, data_nascimento, numero_conta, saldo } = req.body;
    const id_cliente = clientes.length + 1;
    const data_criacao_conta = new Date().toISOString().split('T')[0];
    clientes.push({ id_cliente, nome_cliente, data_nascimento, numero_conta, data_criacao_conta, saldo });
    res.status(201).json({ message: 'Cliente adicionado com sucesso!' });
});

// Listar Clientes
app.get('/clientes', (req, res) => {
    res.json(clientes);
});

// Adicionar Conta
app.post('/contas', (req, res) => {
    const { numero_conta, id_cliente } = req.body;
    const id_conta = contas.length + 1;
    const data_abertura = new Date().toISOString().split('T')[0];
    contas.push({ id_conta, numero_conta, data_abertura, id_cliente });
    res.status(201).json({ message: 'Conta adicionada com sucesso!' });
});

// Listar Contas
app.get('/contas', (req, res) => {
    res.json(contas);
});

// Realizar Transação
app.post('/transacoes', (req, res) => {
    const { id_cliente_envio, id_cliente_recebimento, valor, tipo_transacao } = req.body;
    const id_transacao = transacoes.length + 1;
    const data = new Date().toISOString().split('T')[0];

    const clienteEnvio = clientes.find(cliente => cliente.id_cliente === id_cliente_envio);
    const clienteRecebimento = clientes.find(cliente => cliente.id_cliente === id_cliente_recebimento);

    if (clienteEnvio && clienteRecebimento) {
        if (clienteEnvio.saldo >= valor) {
            clienteEnvio.saldo -= valor;
            clienteRecebimento.saldo += valor;
            transacoes.push({ id_transacao, id_cliente_envio, id_cliente_recebimento, valor, tipo_transacao, data });
            res.status(201).json({ message: 'Transação realizada com sucesso!' });
        } else {
            res.status(400).json({ message: 'Saldo insuficiente.' });
        }
    } else {
        res.status(404).json({ message: 'Clientes não encontrados.' });
    }
});

// Listar Transações
app.get('/transacoes', (req, res) => {
    res.json(transacoes);
});

// Adicionar Categoria
app.post('/categorias', (req, res) => {
    const { nome_categoria } = req.body;
    const id_categoria = categorias.length + 1;
    categorias.push({ id_categoria, nome_categoria });
    res.status(201).json({ message: 'Categoria adicionada com sucesso!' });
});

// Listar Categorias
app.get('/categorias', (req, res) => {
    res.json(categorias);
});

// Iniciar o Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
