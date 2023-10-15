const db = require("../model");
const Produto = db.produtos;
const Op = db.Sequelize.Op;

// Create and Save a new Cachorro
exports.create = (req, res) => {
  // Validate request 
  if (!req.body.titulo) {
    res.status(400).send({
      message: "O conteúdo nao pode ser vazio",
    });
    return;
  }

  // Create a Cachorro
  const produto = {
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    preco: req.body.preco,
    foto: req.body.foto,
  };

  Produto.create(produto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na criacao da Loja",
      });
    });
};

// Retrieve all Cachorros from the database.
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.iLike]: `%${nome}%` } } : null;

  Produto.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na procura das lojas.",
      });
    });
};

// Find a single Cachorro with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Produto.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Nao foi possivel achar a loja com o id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro ao tentar retirar a loja com o id=" + id,
      });
    });
};
// Update a Cachorro by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Produto.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loja foi atualizada com sucesso.",
        });
      } else {
        res.send({
          message: `Nao foi possivel fazer update na loja com o id=${id}. Talvez a loja nao foi encontrada ou req.body esta vazio!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erro em atualizar a loja com o id=" + id,
      });
    });
};

// Delete a Cachorro with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Produto.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Loja foi deletada com sucesso!",
        });
      } else {
        res.send({
          message: `Nao foi possivel deletar loja com o id=${id}. Talvez loja nao foi encontrada!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Nao foi possivel deletar loja com o id=" + id,
      });
    });
};

// Delete all Cachorros from the database.
exports.deleteAll = (req, res) => {
  Produto.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Lojas foram deletadas com sucessos!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Um erro ocorreu na remoção das lojas.",
      });
    });
};
