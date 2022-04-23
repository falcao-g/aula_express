const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//nome, author, editora, data de publicação, idioma, número de páginas

const livros = new Schema({
  nome: {type: String, required: true, unique: true},
  author: {type: String},
  editora: {type: String},
  ano: {type: Number},
  idioma: {type: String},
  numero_paginas: {type: Number}
});

module.exports = mongoose.model('Livros', livros);