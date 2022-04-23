const Livros = require("../schemas/livro-schema");

listarLivros = function (requisicao, resposta)   {
  Livros.find({}, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "Ocorreu um erro na listagem dos livros"});
    }
    return resposta.send(dados);
  });
};

adicionarLivro = function (requisicao, resposta) {
  const novoLivro = requisicao.query;

  if (novoLivro.nome == undefined) {
    resposta.send({mensagem: "Você deve informar o nome do livro"});
  } else {
    Livros.create(novoLivro, (erro, dados) => {
      if (erro) {
        return resposta.send({mensagem: "Não foi possível inserir o livro no banco de dados!"});
      }
      return resposta.send({mensagem: "Livro inserido com sucesso!"});
    });
  }
};

removerLivro = function (requisicao, resposta) {
  const livro = requisicao.query
  if (!livro.nome) {
    return resposta.send({mensagem: 'Você deve informar o nome do livro'})
  }

  Livros.findOneAndDelete({nome: livro.nome}, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "Não foi possível remover o livro"})
    }
    if (dados != null) {
      return resposta.send({mensagem: "Livro removido com sucesso!"})
    }
    return resposta.send({mensagem: "Livro não existe no BD!"})  
  })
}

//passe por qual atributo você quer buscar e o valor
buscarLivro = function(requisicao, resposta) {
  //https://www.mongodb.com/docs/manual/reference/operator/query/
  var { atributo, valor } = requisicao.query
  Livros.find({
    [atributo]: valor
  }, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "Ocorreu um erro na busca do livro"});
    }
    if (dados != null) {
      return resposta.send(dados)
    }
    return resposta.send({mensagem: "Livro não existe no BD!"})  
  })
}

//passe o nome do livro para ser editado e o novo valor para o atributo
editarLivro = function(requisicao, resposta) {
  var {nome, atributo, valor} = requisicao.query
  Livros.findOneAndUpdate({
    nome
  }, {
    [atributo]: valor
  }, (erro, dados) => {
    if (erro) {
      return resposta.send({mensagem: "Ocorreu um erro na edição do livro"});
    }
    if (dados != null) {
      return resposta.send({mensagem: "Livro editado com sucesso!"})
    }
    return resposta.send({mensagem: "Livro não existe no BD!"})  
  })
}

module.exports = {
  listarLivros, adicionarLivro, removerLivro,
  buscarLivro, editarLivro
}


/*
  Para rodar nodemon no Windows executar comando abaixo no 
  Windows powershell como admin
  Set-ExecutionPolicy RemoteSigned
  Ou instalar globalmente o nodemon
  Ou colocar na parte de scripts "dev:start: "nodemon index.js" e rodar com npm run dev:start"
*/