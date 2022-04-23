const api = require('express')()
require('dotenv').config()
const porta = process.env.PORTA_API
const enderecoBanco = process.env.URL_BD
const mongoose = require('mongoose')

mongoose.connect(enderecoBanco)

mongoose.connection.on('connected', function() {
    console.log('Conexão ao banco de dados feita com sucesso!')
})

api.listen(porta, function () {
    console.log('API rodando na porta ' + porta)
})


// GET -> pedir informação
// POST -> enviar informação (criar/cadastrar)
// PUT -> enviar informação (editar)
// DELETE -> deletar informação

// localhost:3000/status OU IP_API:PORTA_API/status
api.get('/status', function(requisicao, resposta) { 
    resposta.send({ mensagem: 'API online!' })
})

const livrosController = require('./controllers/livros.js')
// localhost:3000/produtos OU IP_API:PORTA_API/produtos
api.get('/listar-livros', livrosController.listarLivros)
api.post('/livro', livrosController.adicionarLivro)
api.post('/editar-livro', livrosController.editarLivro)
api.delete('/livro', livrosController.removerLivro)
api.get('/buscar-livros', livrosController.buscarLivro)