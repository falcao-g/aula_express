const express = require('express');
const api = express();
require('dotenv').config();
const porta = process.env.PORTA_API;
const enderecoBanco = process.env.URL_BD;
const mongoose = require('mongoose');

mongoose.connect(enderecoBanco);

mongoose.connection.on('connected', function() {
    console.log('[SUCESSO]: Aplicação conectada ao BD!');
});

api.listen(porta, function () {
    console.log('API rodando na porta ' + porta);
});


// GET -> pedir informação
// POST -> enviar informação (criar/cadastrar)
// PUT -> enviar informação (editar)
// DELETE -> deletar informação

// localhost:3000/status OU IP_API:PORTA_API/status
api.get('/status', function(requisicao, resposta) { 
    resposta.send({ mensagem: 'API online!' });
});

const produtosController = require('./controllers/produtos.js');
// localhost:3000/produtos OU IP_API:PORTA_API/produtos
api.get('/produtos', produtosController.listarProdutos);
api.post('/produto', produtosController.adicionarProduto);
api.delete('/produto', produtosController.removerProduto)