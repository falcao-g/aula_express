// Toda regra relacionada a produtos fica nesse arquivo
//array produtos simboliza o BD
const Produtos = require("../model/produto");

listarProdutos = function (requisicao, resposta) {
  Produtos.find({}, (erro, dados) => {
    if (erro)
      return resposta.send({ mensagem: "[ERRO]: Na consulta de produtos!" });
    return resposta.send(dados);
  });
};

adicionarProduto = function (requisicao, resposta) {
  const novoProduto = requisicao.query;

  if (novoProduto.nome == undefined || novoProduto.preco == undefined) {
    resposta.send({ mensagem: "[ERRO]: Informar nome e preço!" });
  } else {
    Produtos.create(novoProduto, (erro, dados) => {
      if (erro) {
        return resposta.send({ mensagem: "[ERRO]: não foi possível inserir no BD!" });
      }
      return resposta.send({ mensagem: "[SUCESSO]: produto adicionado!" });
    });
  }
};

removerProduto = function (requisicao, resposta) {
  const produto = requisicao.query
  if (!produto.nome) {
    return resposta.send({mensagem: '[ERRO]: informar nome!'})
  }

  Produtos.findOneAndDelete({nome: produto.nome}, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "[ERRO]: não foi possível remover o produto!"})
    }
    if (dados != null) {
      return resposta.send({mensagem: "[SUCESSO]: produto removido!"})
    }
    return resposta.send({mensagem: "[AVISO]: produto não existe no BD!"})  
  })
}

buscarProduto = function(requisicao, resposta) {
  //https://www.mongodb.com/docs/manual/reference/operator/query/
  var { consulta } = requisicao.query
  consulta = JSON.parse(consulta)
  Produtos.find(consulta, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "[ERRO]: Na busca com filtros!"})
    }
    if (dados != null) {
      return resposta.send(dados)
    }
    return resposta.send({mensagem: "[AVISO]: produto não existe no BD!"})  
  })
}

module.exports = {
  listarProdutos, adicionarProduto, removerProduto,
  buscarProduto
}


/*
  Para rodar nodemon no Windows executar comando abaixo no 
  Windows powershell como admin
  Set-ExecutionPolicy RemoteSigned
  Ou instalar globalmente o nodemon
  Ou colocar na parte de scripts "dev:start: "nodemon index.js" e rodar com npm run dev:start"
*/