const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produtosSchema = new Schema({
  nome: { type: String, required: true, unique: true },
  preco: { type: Number, required: true },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Produtos', produtosSchema);